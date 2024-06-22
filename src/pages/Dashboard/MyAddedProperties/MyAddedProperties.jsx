// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import useAgent from '../../../hooks/useAgent';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';

// const MyAddedProperties = () => {
//   const [properties, setProperties] = useState([]);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const axiosSecure = useAxiosSecure();
//   const [isAgent, isAgentLoading, agentEmail] = useAgent();

//   useEffect(() => {
//     const fetchProperties = async () => {
//       if (!isAgent || !agentEmail) return; 
//       try {
//         const response = await axiosSecure.get(`/properties/agent/${agentEmail}`);
//         if (Array.isArray(response.data)) {
//           setProperties(response.data);
//           console.log(response.data)
//         } else {
//           throw new Error('Unexpected response format');
//         }
//       } catch (error) {
//         console.error('Error fetching properties:', error);
//         setError('Failed to fetch properties');
//       }
//     };

//     fetchProperties();
//   }, [isAgent, agentEmail, axiosSecure]);

//   const handleDelete = async (id) => {
//     try {
//       await axiosSecure.delete(`/properties/${id}`);
//       setProperties(properties.filter((property) => property._id !== id));
//     } catch (error) {
//       console.error('Error deleting property:', error);
//       setError('Failed to delete property');
//     }
//   };

//   const handleUpdate = (id) => {
//     navigate(`/update-property/${id}`);
//   };

//   if (isAgentLoading) {
//     return <div className="p-4 text-center text-gray-600">Loading...</div>;
//   }

//   if (!isAgent) {
//     return (
//       <div className="p-4 text-center text-red-500">
//         You are not authorized to view this page.
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-4 text-center text-red-500">
//         {error}
//       </div>
//     );
//   }

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">My Added Properties</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {properties.map((property) => (
//           <div key={property._id} className="border rounded-lg p-4 shadow-lg">
//             <img src={property.image} alt={property.title} className="w-full h-48 object-cover rounded-lg" />
//             <div className="mt-4">
//               <h3 className="text-xl font-semibold">{property.title}</h3>
//               <p className="text-gray-600">{property.location}</p>
//               <p className="text-gray-600">Agent: {property.agentName}</p>
//               <p className={`mt-2 ${property.verificationStatus === 'pending' ? 'text-yellow-500' : property.verificationStatus === 'verified' ? 'text-green-500' : 'text-red-500'}`}>
//                 Status: {property.verificationStatus}
//               </p>
//               <p className="text-gray-600">Price: ${property.price}</p>
//               <div className="mt-2 flex justify-between">
//                 {property.verificationStatus !== 'rejected' && (
//                   <button
//                     onClick={() => handleUpdate(property._id)}
//                     className="bg-blue-500 text-white px-4 py-2 rounded-lg"
//                   >
//                     Update
//                   </button>
//                 )}
//                 <button
//                   onClick={() => handleDelete(property._id)}
//                   className="bg-red-500 text-white px-4 py-2 rounded-lg ml-2"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MyAddedProperties;
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from 'sweetalert2';
import useAuth from "../../../hooks/useAuth";
import useProperties from "../../../hooks/useProperties";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyAddedProperties = () => {
  const { user } = useAuth();
  const { properties, error, isLoading, refetch } = useProperties();
  const [searchLocation, setSearchLocation] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [filteredProperties, setFilteredProperties] = useState([]);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [user, refetch]);

  useEffect(() => {
    if (properties) {
      let updatedProperties = [...properties];

      // Filter by location
      if (searchLocation) {
        updatedProperties = updatedProperties.filter((property) =>
          property.location.toLowerCase().includes(searchLocation.toLowerCase())
        );
      }

      // Sort by price
      if (sortOrder === "ascending") {
        updatedProperties.sort((a, b) => a.price - b.price);
      } else if (sortOrder === "descending") {
        updatedProperties.sort((a, b) => b.price - a.price);
      }

      setFilteredProperties(updatedProperties);
    }
  }, [properties, searchLocation, sortOrder]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/properties/${id}`);
        setFilteredProperties(filteredProperties.filter((property) => property._id !== id));
        Swal.fire(
          'Deleted!',
          'Your property has been deleted.',
          'success'
        );
      } catch (error) {
        console.error('Error deleting property:', error);
        Swal.fire(
          'Error!',
          'There was an error deleting the property.',
          'error'
        );
      }
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update-property/${id}`);
  };

  if (!user) {
    return <div>Please log in to view properties.</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    Swal.fire(
      'Error!',
      'Error loading properties: ' + error.message,
      'error'
    );
    return null;
  }

  return (
    <div className="min-h-screen bg-base-200 p-8">
      <Helmet>
        <title>RealEstate | My Added Properties</title>
      </Helmet>
      <h1 className="text-4xl font-bold mb-8 text-center pb-5">My Added Properties</h1>

      {/* Search and Sort Controls */}
      <div className="mb-8 flex justify-center gap-4">
        <input
          type="text"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          placeholder="Search by location"
          className="input input-bordered w-full max-w-xs"
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="select select-bordered w-full max-w-xs"
        >
          <option value="default">Sort by price</option>
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProperties.map((property, index) => (
          <div key={index} className="card shadow-lg">
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-2xl font-bold">{property.title}</h2>
              <p className="text-gray-600">{property.location}</p>
              <div className="flex items-center mt-2">
                {property.agentImage && (
                  <img
                    src={property.agentImage}
                    alt={property.agentName}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                )}
                <p className="text-gray-600">{property.agentName || "No agent assigned"}</p>
              </div>
              <div className="mt-2">
                <p className="text-gray-600">Price: ${property.price}</p>
              </div>
              <p className="text-gray-600">{property.bedNumber} Bed(s), {property.bathNumber} Bath(s)</p>
              <p className={`text-gray-600 ${property.verificationStatus ? "text-green-500" : "text-red-500"}`}>
                {property.verificationStatus ? "Verified" : "Not Verified"}
              </p>
              <div className="mt-2 flex">
                {property.verificationStatus !== 'rejected' && (
                  <button 
                    onClick={() => handleUpdate(property._id)}
                    className={`bg-blue-500 text-white px-4 py-2 rounded-lg ${property.verificationStatus ? '' : 'disabled:opacity-50 cursor-not-allowed'}`}
                    disabled={!property.verificationStatus}
                  >
                    Update
                  </button>
                )}
                <button
                  onClick={() => handleDelete(property._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg ml-2"
                >
                  Delete
                </button>
              </div>
             
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAddedProperties;
