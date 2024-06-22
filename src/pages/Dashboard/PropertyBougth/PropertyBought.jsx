
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PropertyBought = () => {
  const [offers, setOffers] = useState([]);
  const [properties, setProperties] = useState({});

  useEffect(() => {
    const fetchOffersAndProperties = async () => {
      try {
        const offersResponse = await axios.get('https://real-estate-server-mu.vercel.app/offers');
        const offersData = offersResponse.data;

        // Fetch property details for each offer
        const propertyPromises = offersData.map((offer) =>
          axios.get(`https://real-estate-server-mu.vercel.app/properties/${offer.propertyId}`)
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

  return (
    <div>
      <h2>Properties You have Offered For</h2>
      <div className="property-list">
        {offers.map((offer) => {
          const property = properties[offer.propertyId];
          console.log('Offer Status:', offer.status); 
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
                <Link to={`dashboard/payment/${offer._id}`} className="btn btn-secondary bg-blue-600">
                  Pay
                </Link>
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

