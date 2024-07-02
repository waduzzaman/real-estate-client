
import { useState, useEffect } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';


const PropertyBought = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axiosPublic.get('/offers');
        const offersData = response.data;

        // Fetch property details for each offer
        const propertyDetailsPromises = offersData.map(async (offer) => {
          if (offer.propertyId) {
            const propertyResponse = await axiosPublic.get(`/properties/${offer.propertyId}`);
            return { ...offer, property: propertyResponse.data };
          }
          return offer;
        });

        const offersWithProperties = await Promise.all(propertyDetailsPromises);
        setOffers(offersWithProperties);
      } catch (error) {
        setError('Failed to fetch offers');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, [axiosPublic]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!offers || offers.length === 0) {
    return <div>No offers found.</div>;
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-8 lg:px-16 mb-36">
      <h2 className="text-2xl font-bold mb-4">Properties Bought</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {offers.map((offer) => (
          <div key={offer._id} className="border rounded-lg p-4 shadow-lg">
            {offer.property && (
              <>
                <h3 className="text-xl font-semibold">{offer.property.title}</h3>
                <img src={offer.property.image} alt={offer.property.title} className="w-full h-40 object-cover rounded-md mb-2" />
                <p className="text-gray-600">Location: {offer.property.location}</p>
                <p className="text-gray-600">Price: ${offer.property.price}</p>
                <p className="text-gray-600">Bedrooms: {offer.property.bedNumber}</p>
                <p className="text-gray-600">Bathrooms: {offer.property.bathNumber}</p>
              </>
            )}
            <p className="text-gray-600 mt-2">Buyer: {offer.buyerName}</p>
            <p className="text-gray-600">Email: {offer.buyerEmail}</p>
            <p className="text-gray-600">Officer Amount: ${offer.offeredAmount}</p>
            <p className="text-gray-600">Date: {new Date(offer.buyingDate).toLocaleDateString()}</p>
            <p className="text-gray-600">Status: {offer.status}</p>
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyBought;

