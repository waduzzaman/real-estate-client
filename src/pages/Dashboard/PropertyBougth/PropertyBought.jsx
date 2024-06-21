import { useEffect, useState } from 'react';
import axios from 'axios';



const PropertyBought = () => {
  const [offers, setOffers] = useState([]);
  const [properties, setProperties] = useState({});

  useEffect(() => {
    const fetchOffersAndProperties = async () => {
      try {
        const offersResponse = await axios.get('http://localhost:5000/offers');
        const offersData = offersResponse.data;

        // Fetch property details for each offer
        const propertyPromises = offersData.map((offers) =>
          axios.get(`http://localhost:5000/properties/${offers.propertyId}`)
        );

        const propertyResponses = await Promise.all(propertyPromises);
        const propertiesData = propertyResponses.reduce((acc, response) => {
          acc[response.data._id] = response.data;
          return acc;
        }, {});

        setOffers(offersData);
        setProperties(propertiesData);
      } catch (error) {
        console.error('Error fetching offers or properties:', error);
      }
    };

    fetchOffersAndProperties();
  }, []);

  const handlePay = (offerId) => {
    // Navigate to payment page with offer details via URL parameters
    window.location.href = `/payment/${offerId}`;
  };

  return (
    <div>
      <h2>Properties You have Offered For</h2>
      <div className="property-list">
        {offers.map((offer) => {
          const property = properties[offer.propertyId];
          return (
            <div key={offer._id} className="property-card">
              {property && (
                <>
                  <img src={property.image} alt={property.title} />
                  <h3>{property.title}</h3>
                  <p>Location: {property.location}</p>
                  <p>Agent Name: {property.agentName}</p>
                </>
              )}
              <p>Offered Amount: ${offer.offeredAmount}</p>
              <p>Status: {offer.status}</p>
              {offer.status === 'accepted' && (
                <button onClick={() => handlePay(offer._id)}>Pay</button>
              )}
              {offer.status === 'bought' && (
                <p>Transaction ID: {offer.transactionId}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PropertyBought;
