import React, { useState, useEffect, useCallback } from 'react';
import FilterBar from './components/FilterBar';
import TaskTable from './components/TaskTable';
import TaskForm from './components/TaskForm';
import taskService from './services/taskService';
import { Loader2, AlertCircle } from 'lucide-react';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Filtering & Pagination State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await taskService.getAllTasks(currentPage, 5, searchQuery, statusFilter);
      // Backend response expected format: { content: [], totalPages: 0 }
      setTasks(response.data.content || []);
      setTotalPages(response.data.totalPages || 0);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError("Failed to fetch tasks. Please check if the backend is running.");
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchQuery, statusFilter]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTasks();
    }, 300); // Debounce search
    return () => clearTimeout(timer);
  }, [fetchTasks]);

  const handleAddTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await taskService.deleteTask(id);
        fetchTasks();
      } catch (err) {
        setError("Failed to delete task.");
      }
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingTask) {
        await taskService.updateTask(editingTask.id, formData);
      } else {
        await taskService.createTask(formData);
      }
      setIsModalOpen(false);
      fetchTasks();
    } catch (err) {
      setError(editingTask ? "Failed to update task." : "Failed to create task.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <header className="mb-10 text-center">
        <h1 className="mb-2">Task Manager</h1>
        <p className="text-muted-foreground">Manage your team's workflow with ease.</p>
      </header>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg flex gap-3 items-center">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      <FilterBar
        searchQuery={searchQuery}
        statusFilter={statusFilter}
        onSearch={(val) => { setSearchQuery(val); setCurrentPage(0); }}
        onFilter={(val) => { setStatusFilter(val); setCurrentPage(0); }}
        onAddTask={handleAddTask}
      />

      {loading && tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="w-8 h-8 animate-spin mb-4" />
          <p>Loading tasks...</p>
        </div>
      ) : (
        <TaskTable
          tasks={tasks}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      <TaskForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        editingTask={editingTask}
      />
    </div>
  );
};

export default App;
