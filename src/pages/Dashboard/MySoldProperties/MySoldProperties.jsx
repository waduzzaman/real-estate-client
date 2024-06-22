// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const MySoldProperties = ({ agentEmail }) => {
//   const [soldProperties, setSoldProperties] = useState([]);
//   const [totalSoldAmount, setTotalSoldAmount] = useState(0);

//   useEffect(() => {
//     const fetchSoldProperties = async () => {
//       try {
//         const response = await axios.get(`/sold-properties/${agentEmail}`);
//         setSoldProperties(response.data);

//         // Calculate the total sold amount
//         const totalAmount = response.data.reduce((acc, property) => acc + property.soldPrice, 0);
//         setTotalSoldAmount(totalAmount);
//       } catch (error) {
//         console.error('Error fetching sold properties:', error);
//       }
//     };

//     fetchSoldProperties();
//   }, [agentEmail]);

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">My Sold Properties</h2>

//       {/* Total Sold Amount Section */}
//       <div className="mb-8">
//         <h3 className="text-xl font-semibold">Total Sold Amount: ${totalSoldAmount.toFixed(2)}</h3>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full border-collapse border border-gray-200">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border border-gray-300 px-4 py-2">Property Title</th>
//               <th className="border border-gray-300 px-4 py-2">Property Location</th>
//               <th className="border border-gray-300 px-4 py-2">Buyer Email</th>
//               <th className="border border-gray-300 px-4 py-2">Buyer Name</th>
//               <th className="border border-gray-300 px-4 py-2">Sold Price</th>
//             </tr>
//           </thead>
//           <tbody>
//             {soldProperties.map((property) => (
//               <tr key={property._id} className="hover:bg-gray-50">
//                 <td className="border border-gray-300 px-4 py-2">{property.title}</td>
//                 <td className="border border-gray-300 px-4 py-2">{property.location}</td>
//                 <td className="border border-gray-300 px-4 py-2">{property.buyerEmail}</td>
//                 <td className="border border-gray-300 px-4 py-2">{property.buyerName}</td>
//                 <td className="border border-gray-300 px-4 py-2">${property.soldPrice.toFixed(2)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default MySoldProperties;


const MySoldProperties = () => {
  return (
    <div>

      <h2 className='text-center font-semibold text-3xl underline'>My Sold Properties</h2>
      
    </div>
  );
};

export default MySoldProperties;
