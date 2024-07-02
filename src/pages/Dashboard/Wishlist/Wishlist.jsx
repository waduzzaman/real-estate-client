import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // For navigation
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const UserWishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    // Fetch wishlist items from backend (replace with your API endpoint)
    axiosPublic.get('/wishlist')
      .then(response => {
        setWishlist(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching wishlist:', error);
      });
  }, [axiosPublic]);

  const removeFromWishlist = async (propertyId) => {
    try {
      const response = await axiosPublic.delete(`/wishlist/${propertyId}`);
      console.log(response.data); // 
      // Update wishlist state after deletion
      setWishlist(wishlist.filter(item => item._id !== propertyId));
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Wishlist</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {wishlist.map(property => (
          <div key={property._id} className="border rounded-lg p-4 shadow-lg">
            <img src={property.image} alt={property.title} className="w-full h-48 object-cover rounded-lg" />
            <div className="mt-4">
              <h3 className="text-xl font-semibold">{property.title}</h3>
              <p className="text-gray-600">Location: {property.location}</p>
              <p className="text-gray-600">Agent: {property.agentName}</p>
              <img src={property.agentImage} alt={property.agentName} className="w-12 h-12 rounded-full mt-2" />
              <p className={`mt-2 ${property.verificationStatus === 'pending' ? 'text-yellow-500' : property.verificationStatus === 'verified' ? 'text-green-500' : 'text-red-500'}`}>
                Status: {property.verificationStatus}
              </p>
              <p className="text-gray-600">Price Range: {property.priceRange}</p>
              <button
                onClick={() => removeFromWishlist(property._id)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Remove
              </button>
              <Link
                // to={`/makeAnOffer/${property._id}`}
                to={`/makeAnOffer`}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg ml-2"
              >
                Make an Offer
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserWishlist;
