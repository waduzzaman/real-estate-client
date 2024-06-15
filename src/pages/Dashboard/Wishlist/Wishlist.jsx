import { useState, useEffect } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import Swal from "sweetalert2";

const Wishlist = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(true);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWishlistItems = async () => {
      if (!user) return;

      try {
        const response = await axiosPublic.get('/wishlist', {
          headers: {
            'Authorization': `Bearer ${user.token}` 
          }
        });
        const wishlistData = response.data;
        setWishlistItems(wishlistData);

        const propertyIds = wishlistData.map(item => item.propertyId);
        const propertyResponses = await Promise.all(
          propertyIds.map(id => axiosPublic.get(`/properties/${id}`))
        );
        const propertyData = propertyResponses.map(res => res.data);
        setProperties(propertyData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistItems();
  }, [user, axiosPublic]);


  const handleDelete = async (propertyId) => {
    // Show confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this wishlist item!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosPublic.delete(`/wishlist/${propertyId}`, {
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
          });
          // Update the state after successful deletion
          setProperties(properties.filter(property => property._id !== propertyId));
          setWishlistItems(wishlistItems.filter(item => item.propertyId !== propertyId));
          Swal.fire('Deleted!', 'Your wishlist item has been deleted.', 'success');
        } catch (error) {
          console.error('Error deleting wishlist item:', error);
          Swal.fire('Error!', 'Failed to delete the wishlist item.', 'error');
        }
      }
    });
  };
  
  if (!user) {
    return (
      <div className="text-center mt-8 text-gray-600">
        Please log in to view your wishlist.
      </div>
    );
  }

  if (loading) {
    return <div className="text-center mt-8 text-gray-600">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-8 text-gray-600">
        Error fetching wishlist items: {error}
      </div>
    );
  }

  if (!wishlistItems || wishlistItems.length === 0) {
    return (
      <div className="text-center mt-8 text-gray-600">Your wishlist is empty.</div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-8 lg:px-16 mb-36">
      <div className="mb-4 mt-20 text-center font-bold">
        <SectionTitle subHeading="Your Favorite Properties" heading="Wishlist" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => (
          <div key={property._id} className="bg-white shadow-md rounded-lg p-4">
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-bold mb-2">{property.title}</h3>
            <p className="text-gray-700 mb-4">{property.description}</p>
            <p className="text-gray-700 mb-2">
              <strong>Location:</strong> {property.location}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Price Range:</strong> {property.priceRange}
            </p>
            <p className="text-gray-700">
              <strong>Agent:</strong> {property.agentName}
            </p>
            <button 
              onClick={() => handleDelete(property._id)} 
              className="mt-4 bg-red-500 text-white py-2 px-4 w-full">
              Remove from Wishlist
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
