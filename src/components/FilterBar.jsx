import React from 'react';
import { Search, Plus, Filter } from 'lucide-react';

const FilterBar = ({ onSearch, onFilter, onAddTask, searchQuery, statusFilter }) => {
    return (
        <div className="glass p-4 mb-6 flex flex-wrap gap-4 items-center justify-between animate-fade-in">
            <div className="flex gap-4 items-center flex-1">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search by title..."
                        className="w-full pl-10"
                        value={searchQuery}
                        onChange={(e) => onSearch(e.target.value)}
                    />
                </div>

                <div className="relative">
                    <select
                        className="appearance-none pr-10 pl-4"
                        value={statusFilter}
                        onChange={(e) => onFilter(e.target.value)}
                    >
                        <option value="ALL">All Status</option>
                        <option value="TODO">To Do</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="DONE">Done</option>
                    </select>
                    <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none" />
                </div>
            </div>

            <button onClick={onAddTask} className="btn-primary flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Task
            </button>
        </div>
    );
};

export default FilterBar;
