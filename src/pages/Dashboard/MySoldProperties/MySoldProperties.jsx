import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MySoldProperties = ({ agentEmail }) => {
  const [soldProperties, setSoldProperties] = useState([]);

  useEffect(() => {
    const fetchSoldProperties = async () => {
      try {
        const response = await axios.get(`/sold-properties/${agentEmail}`);
        setSoldProperties(response.data);
      } catch (error) {
        console.error('Error fetching sold properties:', error);
      }
    };

    fetchSoldProperties();
  }, [agentEmail]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Sold Properties</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Property Title</th>
              <th className="border border-gray-300 px-4 py-2">Property Location</th>
              <th className="border border-gray-300 px-4 py-2">Buyer Email</th>
              <th className="border border-gray-300 px-4 py-2">Buyer Name</th>
              <th className="border border-gray-300 px-4 py-2">Sold Price</th>
            </tr>
          </thead>
          <tbody>
            {soldProperties.map((property) => (
              <tr key={property._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{property.title}</td>
                <td className="border border-gray-300 px-4 py-2">{property.location}</td>
                <td className="border border-gray-300 px-4 py-2">{property.buyerEmail}</td>
                <td className="border border-gray-300 px-4 py-2">{property.buyerName}</td>
                <td className="border border-gray-300 px-4 py-2">{property.soldPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MySoldProperties;
