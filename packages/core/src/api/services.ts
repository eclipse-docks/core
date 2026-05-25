// Re-export framework services for app usage
export { appLoaderService } from '../core/apploader';
export { commandRegistry, CommandStack, registerAll, CommandRegistry, TOPIC_COMMAND_REGISTERED } from '../core/commandregistry';
export { contributionRegistry, TOPIC_CONTRIBUTEIONS_CHANGED } from '../core/contributionregistry';
export { extensionRegistry } from '../core/extensionregistry';
export { workspaceService, File, StringFile, Directory, FileContentType, WorkspaceService, TOPIC_WORKSPACE_CHANGED, TOPIC_WORKSPACE_CONNECTED, CompositeDirectory, FileSysDirHandleResource } from '../core/filesys';
export type { FileContentsOptions, GetResourceOptions } from '../core/filesys';
export { editorRegistry, type EditorInput } from '../core/editorregistry';
export { 
    activePartSignal,
    activeEditorSignal,
    partDirtySignal,
    activeTasksSignal,
    activeSelectionSignal,
    perspectiveSwitchedSignal,
    EMPTY_SIGNALPORT
} from '../core/appstate';
export { 
    createLogger,
    setLogLevel,
    type LogLevel,
    type Logger,
    default as logger
} from '../core/logger';
export { rootContext, uiContext, type DependencyContext } from '../core/di';
export {
    appSettings,
    TOPIC_SETTINGS_CHANGED,
    type SettingsJsonSchema,
    type SettingsCategoryInfo,
} from '../core/settingsservice';
export { dialogService } from '../core/dialogservice';
export { 
    infoDialog,
    navigableInfoDialog,
    confirmDialog,
    promptDialog,
    formDialog,
    formDialogRequired,
    validateFormDialogFields,
    filebrowserDialog,
    type NavigableDialogAction,
    type FormDialogField,
    type FormDialogFieldType,
    type FormDialogOptions,
} from '../dialogs';
export { 
    toastInfo,
    toastError,
    toastWarning
} from '../core/toast';
export { taskService } from '../core/taskservice';
export { runJavaScriptCode } from '../commands/js';
export { createJsRuntime, type JsRuntime } from '../core/js-runtime';
export { publish, subscribe, unsubscribe } from '../core/events';
export { configureFramework, getFrameworkConfig } from '../core/config';
export { treeNodeComparator } from '../core/tree-utils';
export type { TreeContribution, TreeNode } from '../core/tree-utils';
export { watchSignal } from '../core/signals';
export { persistenceService } from '../core/persistenceservice';
export { esmShService } from '../core/esmsh-service';
export type { EsmShSource, EsmShOptions } from '../core/esmsh-service';
export { i18n, createLazyLabel } from '../core/i18n';
export {
    contributionTargetMappingRegistry,
    overrideContributionTargets,
    applyConfigNameRemaps,
    listContributionNameRemaps
} from '../core/contribution-mapping';
export { parseIconSpec, icon } from '../core/icon-utils';
export type { ParsedIconSpec, IconOptions } from '../core/icon-utils';

