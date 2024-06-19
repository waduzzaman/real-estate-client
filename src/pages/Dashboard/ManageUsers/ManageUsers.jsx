import { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';
import useAdmin from '../../../hooks/useAdmin';

const ManageUsers = () => {
  const { currentUser } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/users'); // Adjust the endpoint according to your backend
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    if (currentUser && isAdmin) {
      fetchUsers();
    }
  }, [currentUser, isAdmin]);

  const handleMakeAdmin = async (userId) => {
    try {
      await axios.patch(`/users/${userId}/role`, { role: 'admin' });
      setUsers(users.map(user =>
        user._id === userId ? { ...user, role: 'admin' } : user
      ));
    } catch (error) {
      console.error('Error making admin:', error);
    }
  };

  const handleMakeAgent = async (userId) => {
    try {
      await axios.patch(`/users/${userId}/role`, { role: 'agent' });
      setUsers(users.map(user =>
        user._id === userId ? { ...user, role: 'agent' } : user
      ));
    } catch (error) {
      console.error('Error making agent:', error);
    }
  };

  const handleMarkAsFraud = async (userId) => {
    try {
      await axios.patch(`/users/${userId}/role`, { role: 'fraud' });
      setUsers(users.map(user =>
        user._id === userId ? { ...user, role: 'fraud' } : user
      ));
      await axios.delete(`/properties/agent/${userId}`); // Adjust the endpoint to delete properties by agent
    } catch (error) {
      console.error('Error marking as fraud:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`/users/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  if (!currentUser || !isAdmin || isAdminLoading) {
    return null;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">User Name</th>
            <th className="py-2">User Email</th>
            <th className="py-2">Actions</th>
            <th className="py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id} className="border-t">
              <td className="py-2">{user.name}</td>
              <td className="py-2">{user.email}</td>
              <td className="py-2">
                {user.role !== 'fraud' && (
                  <>
                    <button 
                      className="bg-blue-500 text-white px-4 py-1 rounded mr-2"
                      onClick={() => handleMakeAdmin(user._id)}
                      disabled={user.role === 'admin'}
                    >
                      Make Admin
                    </button>
                    <button 
                      className="bg-green-500 text-white px-4 py-1 rounded mr-2"
                      onClick={() => handleMakeAgent(user._id)}
                      disabled={user.role === 'agent'}
                    >
                      Make Agent
                    </button>
                    {user.role === 'agent' && (
                      <button 
                        className="bg-red-500 text-white px-4 py-1 rounded mr-2"
                        onClick={() => handleMarkAsFraud(user._id)}
                      >
                        Mark as Fraud
                      </button>
                    )}
                  </>
                )}
                <button 
                  className="bg-red-500 text-white px-4 py-1 rounded"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  Delete User
                </button>
              </td>
              <td className="py-2">
                {user.role}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
