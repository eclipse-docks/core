import { registerAll } from "../core/commandregistry";
import { File, FileContentType, workspaceService } from "../core/filesys";
import { taskService } from "../core/taskservice";
import { toastError, toastInfo } from "../core/toast";
import { filebrowserDialog } from "../dialogs/filebrowser-dialog";

function fallbackFileName(): string {
    return `downloaded-file-${new Date().toISOString().replace(/[:.]/g, "-").replace("T", "_").slice(0, -5)}`;
}

function fileNameFromUrl(url: string): string {
    if (url.startsWith("data:")) {
        return fallbackFileName();
    }
    try {
        const segs = new URL(url).pathname.split("/").filter((s) => s.length > 0);
        const last = segs[segs.length - 1];
        if (last?.includes(".") && !last.includes(";")) return last;
    } catch {
        // ignore invalid URL parsing details
    }
    return fallbackFileName();
}

registerAll({
    command: {
        id: "wget",
        name: "wget",
        description: "Download a file from a URL to the workspace",
        parameters: [
            { name: "url", description: "the URL of the file to download", required: true },
            { name: "filename", description: "optional filename to save as (will be auto-detected if not provided)", required: false },
            {
                name: "targetPath",
                description: "workspace path where to save; if not provided, a file browser dialog is shown to pick a directory",
                required: false
            }
        ]
    },
    handler: {
        canExecute: (context: any) => {
            const url = context.params?.url;
            return Boolean(url && (url.startsWith("http://") || url.startsWith("https://")));
        },
        execute: async (context: any) => {
            const url = context.params?.url;
            if (!url) {
                toastError("No URL provided.");
                return;
            }

            const workspaceDir = await workspaceService.getWorkspace();
            if (!workspaceDir) {
                toastError("No workspace selected.");
                return;
            }

            const defaultFileName = fileNameFromUrl(url);
            let savePath: string;
            const targetPath = context.params?.targetPath;

            if (targetPath) {
                const folders = await workspaceService.getFolders();
                const firstFolder = folders.length > 0 ? folders[0].name : null;
                const resolved = targetPath.includes("/") ? targetPath : (firstFolder ? `${firstFolder}/${targetPath}` : targetPath);
                const lastSegment = resolved.split("/").pop() ?? "";
                savePath = lastSegment.includes(".") && lastSegment !== resolved
                    ? resolved
                    : `${resolved.replace(/\/$/, "")}/${defaultFileName}`;
            } else {
                const chosenDir = await filebrowserDialog("directory");
                if (chosenDir == null) return;
                savePath = `${chosenDir}/${defaultFileName}`;
            }

            await taskService.runAsync("Downloading file", async (progress: any) => {
                progress.message = "Starting download...";
                progress.progress = 0;

                try {
                    const response = await fetch(url, { mode: "cors", credentials: "omit" });
                    if (!response.ok) {
                        toastError("Failed to download file: " + response.statusText);
                        return;
                    }

                    let fileName = context.params?.filename;
                    if (!fileName) {
                        const contentDisposition = response.headers.get("content-disposition");
                        if (contentDisposition) {
                            const match = contentDisposition.match(/filename="?([^";\n]+)"?/);
                            if (match?.[1]) fileName = match[1].trim();
                        }
                    }
                    if (!fileName) fileName = defaultFileName;

                    const pathToUse = savePath.includes("/") ? savePath.replace(/\/[^/]+$/, `/${fileName}`) : fileName;
                    progress.message = `Downloading ${fileName}...`;
                    progress.progress = 50;

                    const downloadedFile = await workspaceDir.getResource(pathToUse, { create: true }) as File;
                    await downloadedFile.saveContents(response.body, { contentType: FileContentType.BINARY });

                    progress.progress = 100;
                    toastInfo(`File downloaded: ${fileName}`);
                } catch (err) {
                    toastError("Failed to download file: " + String(err));
                    throw err;
                }
            });
        }
    }
});
