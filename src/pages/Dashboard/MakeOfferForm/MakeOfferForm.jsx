import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you use axios for HTTP requests
import { useParams } from 'react-router-dom'; // For getting propertyId from URL params

const MakeOfferForm = () => {
  const { propertyId } = useParams(); // Get propertyId from URL params
  const [property, setProperty] = useState({});
  const [offeredAmount, setOfferedAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch property details by propertyId from backend (replace with your API endpoint)
    axios.get(`http://localhost:5000/properties/${propertyId}`)
      .then(response => {
        setProperty(response.data);
      })
      .catch(error => {
        console.error('Error fetching property details:', error);
      });
  }, [propertyId]);

  const handleOfferSubmit = async (e) => {
    e.preventDefault();
    // Validate offered amount against property price range
    if (offeredAmount < property.minPrice || offeredAmount > property.maxPrice) {
      setErrorMessage('Offered amount must be within the property price range.');
      return;
    }
    // Prepare offer data to send to backend
    const offerData = {
      propertyId,
      offeredAmount,
      buyerEmail: 'user@example.com', // Replace with actual buyer email
      buyerName: 'John Doe', // Replace with actual buyer name
      buyingDate: new Date().toISOString(),
      status: 'pending'
    };
    try {
      // Send offer data to backend (replace with your API endpoint)
      const response = await axios.post('http://localhost:5000/offers', offerData);
      console.log(response.data); // Assuming backend returns success message
      // Redirect or show success message
    } catch (error) {
      console.error('Error making offer:', error);
    }
  };

  return (
    <div>
      <h2>Make an Offer</h2>
      <form onSubmit={handleOfferSubmit}>
        <label>Property Title:</label>
        <input type="text" value={property.title} readOnly />

        <label>Property Location:</label>
        <input type="text" value={property.location} readOnly />

        <label>Agent Name:</label>
        <input type="text" value={property.agentName} readOnly />

        <label>Offered Amount:</label>
        <input type="number" value={offeredAmount} onChange={(e) => setOfferedAmount(e.target.value)} required />

        <input type="submit" value="Make Offer" />
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default MakeOfferForm;
