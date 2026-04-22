import { useState, useEffect } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { Trash2, Users } from 'lucide-react';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/admin/users');
      setUsers(response.data);
    } catch (error) {
      toast.error('Failed to fetch users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await api.delete(`/admin/users/${id}`);
        toast.success('User deleted successfully');
        fetchUsers();
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete user');
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex items-center">
        <Users className="w-8 h-8 text-indigo-600 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md border border-gray-200">
        <ul role="list" className="divide-y divide-gray-200">
          {users.map((u) => (
            <li key={u._id}>
              <div className="px-4 py-4 flex items-center sm:px-6 justify-between hover:bg-gray-50 transition">
                <div className="flex flex-col">
                  <p className="text-sm font-medium text-indigo-600 truncate">{u.name}</p>
                  <p className="text-sm text-gray-500">{u.email}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Role: <span className={`font-semibold ${u.role === 'admin' ? 'text-red-500' : 'text-gray-600'}`}>{u.role}</span>
                  </p>
                </div>
                <div className="flex-shrink-0">
                  {u.role !== 'admin' && (
                    <button
                      onClick={() => handleDeleteUser(u._id)}
                      className="text-red-600 hover:bg-red-50 p-2 rounded-full transition"
                      title="Delete User"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
        {users.length === 0 && (
          <div className="text-center py-8 text-gray-500">No users found.</div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
