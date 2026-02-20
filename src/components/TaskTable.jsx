import React from 'react';
import { Edit2, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

const TaskTable = ({ tasks, onEdit, onDelete, onPageChange, totalPages, currentPage }) => {
    const getStatusBadge = (status) => {
        const statusMap = {
            'TODO': 'badge-todo',
            'IN_PROGRESS': 'badge-in-progress',
            'DONE': 'badge-done'
        };
        return <span className={`badge ${statusMap[status] || 'badge-todo'}`}>{status}</span>;
    };

    return (
        <div className="glass overflow-hidden animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <table className="w-full">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.length > 0 ? (
                        tasks.map((task) => (
                            <tr key={task.id} className="hover:bg-white/[0.02]">
                                <td className="text-muted-foreground font-mono text-sm">#{task.id}</td>
                                <td className="font-medium">{task.title}</td>
                                <td className="text-muted-foreground max-w-xs truncate">{task.description}</td>
                                <td>{getStatusBadge(task.status)}</td>
                                <td>
                                    <div className="flex gap-2">
                                        <button onClick={() => onEdit(task)} className="p-2 hover:text-primary transition-colors">
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => onDelete(task.id)} className="p-2 hover:text-red-500 transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center py-10 text-muted-foreground">No tasks found.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="p-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                    Page {currentPage + 1} of {Math.max(1, totalPages)}
                </span>
                <div className="flex gap-2">
                    <button
                        disabled={currentPage === 0}
                        onClick={() => onPageChange(currentPage - 1)}
                        className="btn-ghost disabled:opacity-30 p-2"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                        disabled={currentPage >= totalPages - 1}
                        onClick={() => onPageChange(currentPage + 1)}
                        className="btn-ghost disabled:opacity-30 p-2"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskTable;
