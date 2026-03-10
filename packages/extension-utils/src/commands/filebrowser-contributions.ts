import {
  contributionRegistry,
  activeSelectionSignal,
  File,
  Directory,
  i18n,
} from "@eclipse-lyra/core";

const t = await i18n(import.meta.glob("../i18n*.json"), true);

function isResource(obj: unknown): obj is File | Directory {
  return obj instanceof File || obj instanceof Directory;
}

const disabled = () => !isResource(activeSelectionSignal.get());

contributionRegistry.registerContribution("toolbar:filebrowser", {
  name: "toolbar.filebrowser.rename",
  command: "mv",
  icon: "pen",
  label: t.RENAME,
  disabled,
});
contributionRegistry.registerContribution("toolbar:filebrowser", {
  name: "toolbar.filebrowser.delete",
  command: "rm",
  icon: "trash",
  label: t.DELETE,
  disabled,
});
contributionRegistry.registerContribution("contextmenu:filebrowser", {
  name: "contextmenu.filebrowser.rename",
  command: "mv",
  icon: "pen",
  label: t.RENAME,
  disabled,
});
contributionRegistry.registerContribution("contextmenu:filebrowser", {
  name: "contextmenu.filebrowser.delete",
  command: "rm",
  icon: "trash",
  label: t.DELETE,
  disabled,
});
