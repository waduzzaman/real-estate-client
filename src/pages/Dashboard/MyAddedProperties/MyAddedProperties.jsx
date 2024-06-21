import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAgent from '../../../hooks/useAgent';
// Adjust the import path as necessary

const MyAddedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [isAgent, isAgentLoading] = useAgent();

  useEffect(() => {
    const fetchProperties = async () => {
      if (!isAgent) return;

      try {
        const response = await axios.get(`/properties/agent/${agentEmail}`);
        if (Array.isArray(response.data)) {
          setProperties(response.data);
        } else {
          throw new Error('Unexpected response format');
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
        setError('Failed to fetch properties');
      }
    };

    fetchProperties();
  }, [isAgent]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/properties/${id}`);
      setProperties(properties.filter((property) => property._id !== id));
    } catch (error) {
      console.error('Error deleting property:', error);
      setError('Failed to delete property');
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update-property/${id}`);
  };

  if (isAgentLoading) {
    return <div className="p-4 text-center text-gray-600">Loading...</div>;
  }

  if (!isAgent) {
    return (
      <div className="p-4 text-center text-red-500">
        You are not authorized to view this page.
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Added Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {properties.map((property) => (
          <div key={property._id} className="border rounded-lg p-4 shadow-lg">
            <img src={property.image} alt={property.title} className="w-full h-48 object-cover rounded-lg" />
            <div className="mt-4">
              <h3 className="text-xl font-semibold">{property.title}</h3>
              <p className="text-gray-600">{property.location}</p>
              <p className="text-gray-600">Agent: {property.agentName}</p>
              <img src={property.agentImage} alt={property.agentName} className="w-12 h-12 rounded-full mt-2" />
              <p className={`mt-2 ${property.verificationStatus === 'pending' ? 'text-yellow-500' : property.verificationStatus === 'verified' ? 'text-green-500' : 'text-red-500'}`}>
                Status: {property.verificationStatus}
              </p>
              <p className="text-gray-600">Price Range: {property.priceRange}</p>
              {property.verificationStatus !== 'rejected' && (
                <button
                  onClick={() => handleUpdate(property._id)}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Update
                </button>
              )}
              <button
                onClick={() => handleDelete(property._id)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg ml-2"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAddedProperties;
