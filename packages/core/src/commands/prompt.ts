import type { ExecutionContext } from "../core/commandregistry";
import { confirmDialog, promptDialog } from "../dialogs";

/** Ask the host UI, then the shell session, then a dialog. */
export async function askText(
    context: ExecutionContext | undefined,
    message: string,
    defaultValue = ""
): Promise<string | undefined> {
    if (context?.ask) {
        const entered = await context.ask({ kind: "text", message, defaultValue });
        if (!entered) return undefined;
        return entered;
    }
    if (context?.readLine) {
        const entered = await context.readLine(message);
        if (!entered) return undefined;
        return entered;
    }
    const value = await promptDialog(message, defaultValue);
    if (!value) return undefined;
    return value;
}

const YES_NO = ["Yes", "No"];

function isYes(answer: string | undefined): boolean {
    const value = answer?.trim().toLowerCase();
    return value === "yes" || value === "y";
}

/** Yes and No as a choice. A button with no session still uses the confirm dialog. */
export async function askYes(context: ExecutionContext | undefined, message: string): Promise<boolean> {
    if (!context?.ask && !context?.readLine) return confirmDialog(message);
    const entered = await askChoice(context, message, YES_NO, "No", false);
    return isYes(entered);
}

function listedChoices(choices: string[]): string[] {
    return [...new Set(choices.map((choice) => choice.trim()).filter(Boolean))];
}

function choiceFromLine(entered: string, choices: string[]): string {
    const exact = choices.find((choice) => choice === entered);
    if (exact) return exact;
    const index = Number(entered);
    if (Number.isInteger(index) && index >= 1 && index <= choices.length) return choices[index - 1]!;
    return entered;
}

/** Ask the user to pick one of the choices, or to type a different value. */
export async function askChoice(
    context: ExecutionContext | undefined,
    message: string,
    choices: string[],
    defaultValue = "",
    custom = true
): Promise<string | undefined> {
    const options = listedChoices(choices);
    if (!options.length) return askText(context, message, defaultValue);
    if (context?.ask) {
        const entered = await context.ask({
            kind: "choice",
            message,
            choices: options,
            ...(defaultValue ? { defaultValue } : {}),
            ...(custom ? {} : { custom: false }),
        });
        if (!entered) return undefined;
        return entered;
    }
    const menu = options.map((choice, index) => `${index + 1}. ${choice}`).join("\n");
    if (context?.readLine) {
        const entered = await context.readLine(`${message}\n${menu}`.replace(/\n/g, "\r\n"));
        if (!entered) return undefined;
        return choiceFromLine(entered.trim(), options);
    }
    const value = await promptDialog(`${message}\n${menu}`, defaultValue || options[0] || "");
    if (!value) return undefined;
    return choiceFromLine(value.trim(), options);
}
