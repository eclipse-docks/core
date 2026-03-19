import { activeSelectionSignal } from "../core/appstate";
import { contributionRegistry } from "../core/contributionregistry";
import { Directory, File } from "../core/filesys";

function isResource(obj: unknown): obj is File | Directory {
    return obj instanceof File || obj instanceof Directory;
}

const disabled = () => !isResource(activeSelectionSignal.get());
const deleteDisabled = () => {
    const selection = activeSelectionSignal.get();
    if (!isResource(selection)) return true;
    if (selection instanceof Directory && selection.getParent() === undefined) return true;
    return false;
};

contributionRegistry.registerContribution("filebrowser.create", {
    name: "filebrowser.create.file",
    command: "touch",
    icon: "file-plus",
    label: "Create File...",
    params: { ask: true }
});

contributionRegistry.registerContribution("filebrowser.create", {
    name: "filebrowser.create.folder",
    command: "mkdir",
    icon: "folder-plus",
    label: "Create Folder...",
    params: { ask: true }
});

contributionRegistry.registerContribution("toolbar:view.filebrowser", {
    name: "toolbar.filebrowser.rename",
    command: "mv",
    icon: "pen",
    label: "Rename",
    disabled
});

contributionRegistry.registerContribution("toolbar:view.filebrowser", {
    name: "toolbar.filebrowser.delete",
    command: "rm",
    icon: "trash",
    label: "Delete",
    disabled: deleteDisabled
});

contributionRegistry.registerContribution("contextmenu:view.filebrowser", {
    name: "contextmenu.filebrowser.create-folder",
    command: "mkdir",
    icon: "folder-plus",
    label: "Create Folder...",
    params: { ask: true }
});

contributionRegistry.registerContribution("contextmenu:view.filebrowser", {
    name: "contextmenu.filebrowser.rename",
    command: "mv",
    icon: "pen",
    label: "Rename",
    disabled
});

contributionRegistry.registerContribution("contextmenu:view.filebrowser", {
    name: "contextmenu.filebrowser.delete",
    command: "rm",
    icon: "trash",
    label: "Delete",
    disabled: deleteDisabled
});
