
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const MakeOfferForm = () => {
  const { propertyId } = useParams(); // Retrieve propertyId from URL
  const [property, setProperty] = useState({});
  const [offeredAmount, setOfferedAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    console.log("Property ID from URL:", propertyId); // Log propertyId

    const fetchProperty = async () => {
      try {
        const response = await axios.get(`https://real-estate-server-mu.vercel.app/properties/${propertyId}`);
        console.log("Property Data:", response.data); // Log response data
        setProperty(response.data);
      } catch (error) {
        console.error('Error fetching property details:', error);
      }
    };
    
    if (propertyId) {
      fetchProperty();
    }
  }, [propertyId]);

  const handleOfferSubmit = async (e) => {
    e.preventDefault();
    
    if (offeredAmount < property.minPrice || offeredAmount > property.maxPrice) {
      setErrorMessage('Offered amount must be within the property price range.');
      return;
    }
    
    const offerData = {
      propertyId,
      offeredAmount,
      buyerEmail: 'user@example.com', // Replace with actual buyer email
      buyerName: 'John Doe', // Replace with actual buyer name
      buyingDate: new Date().toISOString(),
      status: 'pending'
    };

    try {
      const response = await axios.post('https://real-estate-server-mu.vercel.app/offers', offerData);
      console.log('Offer Response:', response.data); // Log offer response
      // Handle success: redirect or show success message
    } catch (error) {
      console.error('Error making offer:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Make an Offer</h2>
      <div className="bg-white shadow-md rounded-lg p-6">
        <form onSubmit={handleOfferSubmit} className="space-y-4">
          <div>
            <label htmlFor="propertyTitle" className="block text-sm font-medium text-gray-700">Property Title</label>
            <input id="propertyTitle" type="text" value={property.title || ''} readOnly className="form-input mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500" />
          </div>
          <div>
            <label htmlFor="propertyLocation" className="block text-sm font-medium text-gray-700">Property Location</label>
            <input id="propertyLocation" type="text" value={property.location || ''} readOnly className="form-input mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500" />
          </div>
          <div>
            <label htmlFor="agentName" className="block text-sm font-medium text-gray-700">Agent Name</label>
            <input id="agentName" type="text" value={property.agentName || ''} readOnly className="form-input mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500" />
          </div>
          <div>
            <label htmlFor="offeredAmount" className="block text-sm font-medium text-gray-700">Offered Amount</label>
            <input id="offeredAmount" type="number" value={offeredAmount} onChange={(e) => setOfferedAmount(e.target.value)} required className="form-input mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500" />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Make Offer
          </button>
        </form>
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default MakeOfferForm;

