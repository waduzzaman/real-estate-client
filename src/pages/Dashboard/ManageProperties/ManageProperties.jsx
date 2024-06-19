import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';
import useAdmin from '../../../hooks/useAdmin';

const ManageProperties = () => {
  const { currentUser } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('/properties'); // Adjust the endpoint according to your backend
        setProperties(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching properties:', error);
        setLoading(false);
      }
    };

    if (currentUser && isAdmin) {
      fetchProperties();
    }
  }, [currentUser, isAdmin]);

  const handleVerify = async (propertyId) => {
    try {
      await axios.patch(`/properties/${propertyId}/verify`);
      setProperties(properties.map(property => 
        property._id === propertyId ? { ...property, status: 'verified' } : property
      ));
    } catch (error) {
      console.error('Error verifying property:', error);
    }
  };

  const handleReject = async (propertyId) => {
    try {
      await axios.patch(`/properties/${propertyId}/reject`);
      setProperties(properties.map(property => 
        property._id === propertyId ? { ...property, status: 'rejected' } : property
      ));
    } catch (error) {
      console.error('Error rejecting property:', error);
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
      <h2 className="text-2xl font-bold mb-4">Manage Properties</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Property Title</th>
            <th className="py-2">Location</th>
            <th className="py-2">Agent Name</th>
            <th className="py-2">Agent Email</th>
            <th className="py-2">Price Range</th>
            <th className="py-2">Actions</th>
            <th className="py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {properties.map(property => (
            <tr key={property._id} className="border-t">
              <td className="py-2">{property.title}</td>
              <td className="py-2">{property.location}</td>
              <td className="py-2">{property.agentName}</td>
              <td className="py-2">{property.agentEmail}</td>
              <td className="py-2">{property.priceRange}</td>
              <td className="py-2">
                {property.status === 'pending' && (
                  <>
                    <button 
                      className="bg-green-500 text-white px-4 py-1 rounded mr-2"
                      onClick={() => handleVerify(property._id)}
                    >
                      Verify
                    </button>
                    <button 
                      className="bg-red-500 text-white px-4 py-1 rounded"
                      onClick={() => handleReject(property._id)}
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
              <td className="py-2">
                {property.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProperties;
