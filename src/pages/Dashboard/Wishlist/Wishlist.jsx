import React, { useState, useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const Wishlist = ({ propertyId }) => {
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(true);
  const [wishlistItem, setWishlistItem] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWishlistItem = async () => {
      if (!propertyId) return;

      try {
        const response = await axiosPublic.get(`/wishlist/${propertyId}`);
        const wishlistData = response.data;
        setWishlistItem(wishlistData);
        console.log('wishlist', wishlistData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistItem();
  }, [propertyId, axiosPublic]);



  if (loading) {
    return <div className="text-center mt-8 text-gray-600">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-8 text-gray-600">
        Error fetching wishlist item: {error}
      </div>
    );
  }

  if (!wishlistItem) {
    return (
      <div className="text-center mt-8 text-gray-600">Wishlist item not found.</div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-8 lg:px-16 mb-36">
      <div className="mb-4 mt-20 text-center font-bold">
        <SectionTitle subHeading="Wishlist Item Details" heading="Wishlist Item" />
      </div>
      <div className="bg-white shadow-md rounded-lg p-4">
        <p className="text-gray-700 text-2xl font-bold my-2">{wishlistItem.property.title}</p>
        <p className="text-gray-700"><span className="font-bold">Agent:</span> {wishlistItem.property.agentName}</p>
        <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-md">
          <p className="text-gray-700 mb-2">{wishlistItem.description}</p>
         
          <p className="text-gray-500 mt-10 text-end">
            {new Date(wishlistItem.reviewDate || wishlistItem.date).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
