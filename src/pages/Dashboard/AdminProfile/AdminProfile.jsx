import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAuth from '../../../hooks/useAuth';
import useAdmin from '../../../hooks/useAdmin';

const AdminProfile = () => {
  const { currentUser } = useAuth(); 
  const axiosInstance = useAxiosPublic();
  const [adminInfo, setAdminInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, isAdminLoading] = useAdmin();

  useEffect(() => {
    const fetchAdminInfo = async () => {
      try {
        const response = await axiosInstance.get(`/users/${currentUser.email}`);
        setAdminInfo(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching admin profile:', error);
        setLoading(false);
      }
    };

    if (currentUser && isAdmin) {
      fetchAdminInfo();
    }
  }, [axiosInstance, currentUser, isAdmin]);

  if (!currentUser || !isAdmin) {
    return null;
  }

  if (loading || isAdminLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Admin Profile</h2>
      {adminInfo ? (
        <div className="flex items-center space-x-4">
          <img
            src={adminInfo.userImage || defaultUserImage}
            alt="User"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <p className="font-bold">{adminInfo.userName}</p>
            <p className="text-gray-600">Role: {adminInfo.role}</p>
            {/* Add other relevant information */}
          </div>
        </div>
      ) : (
        <p>No profile information available.</p>
      )}
    </div>
  );
};

export default AdminProfile;
