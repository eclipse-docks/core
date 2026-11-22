/** Sidebar contribution / tab panel name for the AI chat view. */
export const AI_VIEW_NAME = 'aiview';

/** EditorInput.key for the AI settings editor. */
export const AI_SETTINGS_KEY = '.system.ai-settings';

/** editorRegistry editorId for the AI settings editor. */
export const AI_SETTINGS_EDITOR_ID = 'system.ai-settings-editor';

/** Command that opens AI settings. */
export const OPEN_AI_SETTINGS_COMMAND = 'open_ai_settings';

/** Command id for the plan editor's Build button. */
export const BUILD_PLAN_COMMAND = 'build_plan';

/** Tool that writes `plan-<description>.plan.md` during plan mode. */
export const CREATE_PLAN_TOOL = 'create_plan';

/** Event-bus topics for the AI runtime. */
export const TOPIC = {
  sessionChanged: 'ai/session/changed',
  messagePart: 'ai/message/part',
  messageDone: 'ai/message/done',
  permissionAsked: 'ai/permission/asked',
  questionAsked: 'ai/question/asked',
  modelRouted: 'ai/model/routed',
  modelProgress: 'ai/model/progress',
  checkpoint: 'ai/checkpoint',
  providersChanged: 'ai/providers/changed',
  approvalModeChanged: 'ai/approval-mode/changed',
} as const;
