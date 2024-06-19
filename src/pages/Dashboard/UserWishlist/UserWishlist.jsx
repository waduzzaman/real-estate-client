import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you use axios for HTTP requests
import { Link } from 'react-router-dom'; // For navigation

const UserWishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    // Fetch wishlist items from backend (replace with your API endpoint)
    axios.get('http://localhost:5000/wishlist')
      .then(response => {
        setWishlist(response.data);
      })
      .catch(error => {
        console.error('Error fetching wishlist:', error);
      });
  }, []);

  const removeFromWishlist = async (propertyId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/wishlist/${propertyId}`);
      console.log(response.data); // Assuming backend returns success message
      // Update wishlist state after deletion
      setWishlist(wishlist.filter(item => item._id !== propertyId));
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  return (
    <div>
      <h2>Wishlist</h2>
      {wishlist.map(property => (
        <div key={property._id} className="wishlist-card">
          <img src={property.image} alt="Property" />
          <h3>{property.title}</h3>
          <p>Location: {property.location}</p>
          <p>Agent: {property.agentName}</p>
          <img src={property.agentImage} alt="Agent" />
          <p>Verification Status: {property.verificationStatus}</p>
          <p>Price Range: {property.priceRange}</p>
          <button onClick={() => removeFromWishlist(property._id)}>Remove</button>
          <Link to={`/make-offer/${property._id}`}>Make an Offer</Link>
        </div>
      ))}
    </div>
  );
};

export default UserWishlist;
