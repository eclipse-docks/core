// Re-export framework types for app usage
export type { AppDefinition, AppContributions, ReleaseEntry, ReleaseHistory, RenderDescriptor } from '../core/apploader';
export type { 
    Command, 
    Parameter, 
    Variable, 
    LLMOptions,
    ExecutionContext,
    ExecuteParams,
    Handler,
    Commands,
    CommandStack,
    CommandRegistry
} from '../core/commandregistry';
export type { Extension } from '../core/extensionregistry';
export type {
    Contribution,
    IconContribution,
    CommandContribution,
    HTMLContribution,
    TabContribution,
    ContributionChangeEvent
} from '../core/contributionregistry';
export type {
    Resource,
    WorkspaceService
} from '../core/filesys';
export type {
    EditorInput,
    EditorContentProvider
} from '../core/editorregistry';
export type {
    LogLevel
} from '../core/logger';
export type {
    NavigableDialogAction
} from '../dialogs';
export type {
    TreeNode,
    TreeContribution
} from '../core/tree-utils';
export type {
    ProgressMonitor
} from '../core/taskservice';

