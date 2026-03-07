import { documentIndexService } from './document-index-service';
import { registerAll } from '@eclipse-lyra/core';
import { workspaceService, File } from '@eclipse-lyra/core';
import { toastError, toastInfo } from '@eclipse-lyra/core';
import { taskService } from '@eclipse-lyra/core';
import { activeSelectionSignal } from '@eclipse-lyra/core';
import { createLogger } from '@eclipse-lyra/core';
import { contributionRegistry } from '@eclipse-lyra/core';
import { editorRegistry, EditorInput } from '@eclipse-lyra/core';
import { html } from 'lit';
import { TOOLBAR_MAIN_RIGHT } from '@eclipse-lyra/core';
// Import the component to ensure it's registered
import './rag-system-manager';

const logger = createLogger('RAGSystemExtension');

export default function ragSystemExtension(context: any) {
    documentIndexService.initialize().catch(err => {
        logger.error(`Failed to initialize document index service: ${err}`);
    });

    registerAll({
        command: {
            id: 'rag-system.index-file',
            name: 'Index Document',
            description: 'Index the currently selected file for search and retrieval',
            parameters: [
                {
                    name: 'includeContent',
                    description: 'Whether to include full content in index (default: true)',
                    required: false
                }
            ]
        },
        handler: {
            canExecute: context => {
                const selection = activeSelectionSignal.get();
                return selection instanceof File;
            },
            execute: async context => {
                const selection = activeSelectionSignal.get();
                
                if (!(selection instanceof File)) {
                    toastError('Please select a file to index');
                    return;
                }

                const includeContent = context.params?.includeContent !== false;

                await taskService.runAsync('Indexing document', async progress => {
                    progress.message = `Indexing ${selection.getName()}...`;
                    
                    try {
                        const document = await documentIndexService.indexDocument(selection, {
                            includeContent
                        });
                        
                        progress.progress = 100;
                        toastInfo(`Document indexed: ${document.fileName}`);
                    } catch (error) {
                        toastError(`Failed to index document: ${error}`);
                        throw error;
                    }
                });
            }
        }
    });

    registerAll({
        command: {
            id: 'rag-system.index-workspace',
            name: 'Index Workspace',
            description: 'Index all indexable files in the current workspace',
            parameters: [
                {
                    name: 'includeContent',
                    description: 'Whether to include full content in index (default: true)',
                    required: false
                },
                {
                    name: 'maxFileSize',
                    description: 'Maximum file size in bytes to index (default: 5MB)',
                    required: false
                }
            ]
        },
        handler: {
            canExecute: context => {
                return true;
            },
            execute: async context => {
                const workspace = await workspaceService.getWorkspace();
                
                if (!workspace) {
                    toastError('No workspace selected');
                    return;
                }

                const includeContent = context.params?.includeContent !== false;
                const maxFileSize = context.params?.maxFileSize 
                    ? parseInt(context.params.maxFileSize) 
                    : undefined;

                await taskService.runAsync('Indexing workspace', async progress => {
                    progress.message = 'Collecting files...';
                    progress.progress = 0;

                    try {
                        const result = await documentIndexService.indexWorkspace(workspace, {
                            includeContent,
                            maxFileSize
                        });

                        progress.progress = 100;
                        
                        if (result.failed > 0) {
                            toastError(
                                `Indexing complete: ${result.indexed} indexed, ${result.failed} failed. ` +
                                `Check console for details.`
                            );
                        } else {
                            toastInfo(`Workspace indexed: ${result.indexed} documents`);
                        }
                    } catch (error) {
                        toastError(`Failed to index workspace: ${error}`);
                        throw error;
                    }
                });
            }
        }
    });

    registerAll({
        command: {
            id: 'rag-system.list-documents',
            name: 'List Indexed Documents',
            description: 'List all indexed documents in the current workspace',
            parameters: []
        },
        handler: {
            canExecute: context => {
                return true;
            },
            execute: async context => {
                const workspace = await workspaceService.getWorkspace();
                const workspacePath = workspace?.getName();

                await taskService.runAsync('Loading indexed documents', async progress => {
                    try {
                        const documents = await documentIndexService.listDocuments(workspacePath);
                        
                        progress.progress = 100;
                        
                        if (documents.length === 0) {
                            toastInfo('No documents indexed in this workspace');
                        } else {
                            logger.info(`Found ${documents.length} indexed documents`);
                            toastInfo(`Found ${documents.length} indexed documents (check console for details)`);
                        }
                    } catch (error) {
                        toastError(`Failed to list documents: ${error}`);
                        throw error;
                    }
                });
            }
        }
    });

    registerAll({
        command: {
            id: 'rag-system.delete-document',
            name: 'Delete Document from Index',
            description: 'Remove the selected file from the document index',
            parameters: []
        },
        handler: {
            canExecute: context => {
                const selection = activeSelectionSignal.get();
                return selection instanceof File;
            },
            execute: async context => {
                const selection = activeSelectionSignal.get();
                
                if (!(selection instanceof File)) {
                    toastError('Please select a file to remove from index');
                    return;
                }

                const workspace = selection.getWorkspace();
                const workspacePath = workspace.getName();
                const filePath = selection.getWorkspacePath();

                await taskService.runAsync('Deleting document from index', async progress => {
                    try {
                        const deleted = await documentIndexService.deleteDocumentByPath(
                            workspacePath,
                            filePath
                        );

                        progress.progress = 100;

                        if (deleted) {
                            toastInfo(`Document removed from index: ${selection.getName()}`);
                        } else {
                            toastInfo(`Document not found in index: ${selection.getName()}`);
                        }
                    } catch (error) {
                        toastError(`Failed to delete document from index: ${error}`);
                        throw error;
                    }
                });
            }
        }
    });

    registerAll({
        command: {
            id: 'rag-system.clear-workspace',
            name: 'Clear Workspace Index',
            description: 'Remove all indexed documents from the current workspace',
            parameters: []
        },
        handler: {
            canExecute: context => {
                return true;
            },
            execute: async context => {
                const workspace = await workspaceService.getWorkspace();
                
                if (!workspace) {
                    toastError('No workspace selected');
                    return;
                }

                const workspacePath = workspace.getName();

                await taskService.runAsync('Clearing workspace index', async progress => {
                    try {
                        const deleted = await documentIndexService.deleteWorkspace(workspacePath);

                        progress.progress = 100;
                        toastInfo(`Removed ${deleted} documents from index`);
                    } catch (error) {
                        toastError(`Failed to clear workspace index: ${error}`);
                        throw error;
                    }
                });
            }
        }
    });

    registerAll({
        command: {
            id: 'rag-system.get-stats',
            name: 'Document Index Statistics',
            description: 'Get statistics about the document index',
            parameters: []
        },
        handler: {
            canExecute: context => {
                return true;
            },
            execute: async context => {
                await taskService.runAsync('Loading statistics', async progress => {
                    try {
                        const stats = await documentIndexService.getStats();
                        
                        progress.progress = 100;
                        
                        logger.info(`Document index statistics: ${JSON.stringify(stats)}`);
                        toastInfo(
                            `Index statistics: ${stats.totalDocuments} total documents. ` +
                            `Check console for details.`
                        );
                    } catch (error) {
                        toastError(`Failed to get statistics: ${error}`);
                        throw error;
                    }
                });
            }
        }
    });

    registerAll({
        command: {
            id: 'rag-system.reindex-file',
            name: 'Reindex Document',
            description: 'Reindex the selected file (useful after file changes)',
            parameters: []
        },
        handler: {
            canExecute: context => {
                const selection = activeSelectionSignal.get();
                return selection instanceof File;
            },
            execute: async context => {
                const selection = activeSelectionSignal.get();
                
                if (!(selection instanceof File)) {
                    toastError('Please select a file to reindex');
                    return;
                }

                await taskService.runAsync('Reindexing document', async progress => {
                    progress.message = `Reindexing ${selection.getName()}...`;
                    
                    try {
                        const document = await documentIndexService.reindexDocument(selection);
                        
                        progress.progress = 100;
                        toastInfo(`Document reindexed: ${document.fileName}`);
                    } catch (error) {
                        toastError(`Failed to reindex document: ${error}`);
                        throw error;
                    }
                });
            }
        }
    });

    logger.info('RAG system extension loaded');

    // Register editor for document index manager
    editorRegistry.registerEditorInputHandler({
        editorId: 'system.rag-system-manager',
        label: 'RAG System Manager',
        ranking: 1000,
        canHandle: (input: EditorInput) => {
                    return input.key === '.system.rag-system';
        },
        handle: async (input: EditorInput) => {
            input.component = () => html`
                <lyra-rag-system-manager .input=${input}></lyra-rag-system-manager>
            `;
            return input;
        }
    });

    // Register command and toolbar button to open document index manager
    registerAll({
        command: {
            id: 'open-rag-system-manager',
            name: 'Open RAG System Manager',
            description: 'Opens the RAG system manager to view and manage indexed documents',
            parameters: []
        },
        handler: {
            execute: _context => {
                const editorInput: Partial<EditorInput> = {
                    title: 'RAG System Manager',
                    data: {},
                    key: '.system.rag-system',
                    icon: 'database',
                    state: {},
                };
                editorRegistry.loadEditor(editorInput as EditorInput).catch(err => {
                    logger.error(`Failed to open document index manager: ${err}`);
                });
            }
        },
        contribution: {
            target: TOOLBAR_MAIN_RIGHT,
            icon: 'database',
            label: 'RAG System',
        }
    });

    // Register context menu entry for indexing documents
    contributionRegistry.registerContribution('contextmenu:filebrowser', {
        command: 'rag-system.index-file',
        icon: 'database',
        label: 'Index Document',
        disabled: () => {
            const selection = activeSelectionSignal.get();
            return !(selection instanceof File);
        }
    });

    // Integrate RAG with AI system
    import('./rag-integration').then(rag => {
        rag.integrateRAGWithAI();
        logger.info('RAG integration enabled');
    }).catch(err => {
        logger.warn(`Failed to load RAG integration: ${err}`);
    });
}

