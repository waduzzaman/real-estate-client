

// import  { useState, useEffect } from 'react';
// import axios from 'axios';
// import { formatCurrency } from '../components/utils';


// const RequestedProperties = ({ agentEmail }) => {
//   const [properties, setProperties] = useState([]);

//   useEffect(() => {
//     const fetchRequestedOfferedProperties = async () => {
//       try {
//         const response = await axios.get(`/requested-offered-properties/${agentEmail}`);
//         setProperties(response.data);
//       } catch (error) {
//         console.error('Error fetching requested/offered properties:', error);
//       }
//     };

//     fetchRequestedOfferedProperties();
//   }, [agentEmail]);

//   const handleAccept = async (propertyId) => {
//     try {
//       const response = await axios.patch(`/requested-offered-properties/${propertyId}/accept`);
//       if (response.status === 200) {
//         const updatedProperties = properties.map(prop => {
//           if (prop._id === propertyId) {
//             return { ...prop, status: 'accepted' };
//           }
//           return prop;
//         });
//         setProperties(updatedProperties);
//       }
//     } catch (error) {
//       console.error('Error accepting offer:', error);
//     }
//   };

//   const handleReject = async (propertyId) => {
//     try {
//       const response = await axios.patch(`/requested-offered-properties/${propertyId}/reject`);
//       if (response.status === 200) {
//         const updatedProperties = properties.map(prop => {
//           if (prop._id === propertyId) {
//             return { ...prop, status: 'rejected' };
//           }
//           return prop;
//         });
//         setProperties(updatedProperties);
//       }
//     } catch (error) {
//       console.error('Error rejecting offer:', error);
//     }
//   };

//   return (
//     <div className="container mx-auto py-8">
//       <h2 className="text-2xl font-bold mb-4">Requested/Offered Properties</h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-200">
//           <thead className="bg-gray-100 border-b border-gray-200">
//             <tr>
//               <th className="py-2 px-4 border-r border-gray-200">Property Title</th>
//               <th className="py-2 px-4 border-r border-gray-200">Property Location</th>
//               <th className="py-2 px-4 border-r border-gray-200">Buyer Email</th>
//               <th className="py-2 px-4 border-r border-gray-200">Buyer Name</th>
//               <th className="py-2 px-4 border-r border-gray-200">Offered Price</th>
//               <th className="py-2 px-4 border-r border-gray-200">Status</th>
//               <th className="py-2 px-4">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {properties.map(property => (
//               <tr key={property._id} className="border-b border-gray-200">
//                 <td className="py-2 px-4 border-r border-gray-200">{property.title}</td>
//                 <td className="py-2 px-4 border-r border-gray-200">{property.location}</td>
//                 <td className="py-2 px-4 border-r border-gray-200">{property.buyerEmail}</td>
//                 <td className="py-2 px-4 border-r border-gray-200">{property.buyerName}</td>
//                 <td className="py-2 px-4 border-r border-gray-200">{formatCurrency(property.offeredPrice)}</td>
//                 <td className="py-2 px-4 border-r border-gray-200">{property.status}</td>
//                 <td className="py-2 px-4">
//                   {property.status === 'pending' && (
//                     <>
//                       <button className="bg-green-500 text-white px-3 py-1 rounded mr-2"
//                         onClick={() => handleAccept(property._id)}>
//                         Accept
//                       </button>
//                       <button className="bg-red-500 text-white px-3 py-1 rounded"
//                         onClick={() => handleReject(property._id)}>
//                         Reject
//                       </button>
//                     </>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default RequestedProperties;



const RequestedProperties = () => {
  return (
    <div>

<h2 className='text-center font-semibold text-3xl underline'> Requested Properties</h2>

      
      
    </div>
  );
};

export default RequestedProperties;
