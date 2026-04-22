import { useState, useEffect, useContext } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { Edit2, Trash2, CheckCircle, Clock } from 'lucide-react';

const TaskCard = ({ task, fetchTasks }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);

  const handleUpdate = async () => {
    try {
      await api.put(`/tasks/${task._id}`, { title, description, status });
      toast.success('Task updated');
      setIsEditing(false);
      fetchTasks();
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await api.delete(`/tasks/${task._id}`);
        toast.success('Task deleted');
        fetchTasks();
      } catch (error) {
        toast.error('Failed to delete task');
      }
    }
  };

  if (isEditing) {
    return (
      <div className="bg-white p-5 rounded-xl shadow-md border border-gray-200 transition-all">
        <input
          type="text"
          className="w-full mb-3 p-2 border border-gray-300 rounded text-sm focus:ring-indigo-500 focus:border-indigo-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full mb-3 p-2 border border-gray-300 rounded text-sm focus:ring-indigo-500 focus:border-indigo-500"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="w-full mb-3 p-2 border border-gray-300 rounded text-sm focus:ring-indigo-500 focus:border-indigo-500"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => setIsEditing(false)}
            className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition text-sm"
          >
            Save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md border border-gray-200 transition-all group">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
          {task.title}
        </h3>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            task.status === 'completed'
              ? 'bg-green-100 text-green-800'
              : task.status === 'in-progress'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {task.status === 'completed' ? (
            <CheckCircle className="w-3 h-3 mr-1" />
          ) : (
            <Clock className="w-3 h-3 mr-1" />
          )}
          {task.status}
        </span>
      </div>
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{task.description}</p>
      <div className="flex justify-end space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => setIsEditing(true)}
          className="text-gray-400 hover:text-indigo-600 transition"
          title="Edit"
        >
          <Edit2 className="w-4 h-4" />
        </button>
        <button
          onClick={handleDelete}
          className="text-gray-400 hover:text-red-600 transition"
          title="Delete"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
