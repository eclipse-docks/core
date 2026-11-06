/** Sidebar contribution / tab panel name for the AI chat view. */
export const AI_VIEW_NAME = 'cognitiveview';

/** EditorInput.key for the AI settings editor. */
export const AI_SETTINGS_KEY = '.system.cognitive-ai-settings';

/** editorRegistry editorId for the AI settings editor. */
export const AI_SETTINGS_EDITOR_ID = 'system.cognitive-ai-settings-editor';

/** Command that opens AI settings. */
export const OPEN_AI_SETTINGS_COMMAND = 'open_cognitive_ai_settings';

/** Command id for the plan editor's Build button. */
export const BUILD_PLAN_COMMAND = 'build_plan';

/** Tool that writes `plan-<description>.plan.md` during plan mode. */
export const CREATE_PLAN_TOOL = 'create_plan';

/** Core event-bus topics for the cognitive runtime. */
export const TOPIC = {
  sessionChanged: 'cognitive/session/changed',
  messagePart: 'cognitive/message/part',
  messageDone: 'cognitive/message/done',
  permissionAsked: 'cognitive/permission/asked',
  modelRouted: 'cognitive/model/routed',
  coreTick: 'cognitive/core/tick',
  checkpoint: 'cognitive/checkpoint',
  providersChanged: 'cognitive/providers/changed',
  approvalModeChanged: 'cognitive/approval-mode/changed',
} as const;
