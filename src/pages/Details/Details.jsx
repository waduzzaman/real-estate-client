

import { useState } from "react";
import { useParams } from "react-router-dom";
import { AiOutlineHeart} from "react-icons/ai";
import { FiEdit3 } from "react-icons/fi";
import useDetails from "../../hooks/useDetails";
import useAuth from "../../hooks/useAuth";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import AllReviews from "../Dashboard/Reviews/Reviews";



const Details = () => {
  const { id } = useParams();
  const [details] = useDetails(id);
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviewDate, setReviewDate] = useState(new Date().toISOString().slice(0, 10));
  const [starRating, setStarRating] = useState(0);

  const handleAddToWishlist = async () => {
    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please log in to add to wishlist.",
      });
      return;
    }

    try {
      const response = await fetch("https://real-estate-server-mu.vercel.app/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${user.token}`, // Include token in headers
        },
        body: JSON.stringify({ propertyId: id }), // Convert body to JSON string
      });



      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Added to wishlist!",
        });
      } else {
        throw new Error("Failed to add to wishlist");
      }
    } catch (err) {
      console.error("Failed to add to wishlist", err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to add to wishlist.",
      });
    }
  };

  const handleAddReview = async () => {
    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please log in to add a review.",
      });
      return;
    }

    try {
      const review = {
        userEmail: user.email,
        propertyId: id,
        text: reviewText,
        reviewDate,
        starRating,
      };

      const response = await axiosPublic.post("/reviews", review);

      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Review added!",
        });
        setReviewText("");
        setReviewDate(new Date().toISOString().slice(0, 10));
        setStarRating(0);
        setShowReviewModal(false);
      } else {
        throw new Error("Failed to add review");
      }
    } catch (err) {
      console.error("Failed to add review", err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to add review.",
      });
    }
  };

  if (!user) {
    return (
      <div className="text-center mt-8 text-gray-600">
        Please log in to view properties.
      </div>
    );
  }

  if (!details) {
    return <div className="text-center mt-8 text-gray-600">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-8 lg:px-16 mb-36">
      <div className="mb-4 mt-20 text-center font-bold">
        <SectionTitle subHeading="Property Details" heading="Details" />
      </div>

      <h1 className="text-4xl font-bold mb-4 mt-10 text-center">
        {details.title}
      </h1>
      <div className="mb-8 flex justify-center">
        <img
          src={details.image}
          alt={details.title}
          className="max-w-full h-auto rounded-lg shadow-md"
        />
      </div>
      <div className="text-lg mb-8 text-gray-700">
        <p className="mb-4">{details.description}</p>
        <p className="mb-4">
          <strong>Location:</strong> {details.location}
        </p>
        <p className="mb-4">
          <strong>Price:</strong> ${details.price}
        </p>
        <p className="mb-4 flex items-center">
          <img
            src={details.agentImage}
            alt={details.agentName}
            className="w-10 h-10 rounded-full mr-2"
          />
          <span>
            <strong>Agent:</strong> {details.agentName}
          </span>
        </p>
        <p className="mb-4">
          <strong>Bedrooms:</strong> {details.bedNumber}
        </p>
        <p className="mb-4">
          <strong>Bathrooms:</strong> {details.bathNumber}
        </p>
      </div>
      <div className="text-center mb-8">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 flex items-center justify-center shadow-lg"
          onClick={handleAddToWishlist}
        >
          <AiOutlineHeart className="mr-2" /> Add to Wishlist
        </button>
      </div>

      <div className="reviews-section mb-12">
        {/* <h2 className="text-2xl font-bold mb-4 text-center">Reviews</h2> */}
        {details.reviews && details.reviews.length > 0 ? (
          details.reviews.map((review, index) => (
            <div
              key={index}
              className="mb-4 bg-gray-100 p-4 rounded-lg shadow-md"
            >
              <p className="font-semibold">{review.user}</p>
              <p className="text-gray-700">{review.text}</p>
              <p className="text-gray-500">{new Date(review.date).toLocaleString()}</p>
              <p className="text-yellow-500">Rating: {review.starRating} ★</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600"><AllReviews></AllReviews></p>
        )}
      </div>
      <div className="text-center">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200 flex items-center justify-center shadow-lg"
          onClick={() => setShowReviewModal(true)}
        >
          <FiEdit3 className="mr-2" /> Add a Review
        </button>
      </div>

      {showReviewModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg mx-4 shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Add a Review</h2>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-2 mb-4"
              placeholder="Your review"
              rows="4"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            ></textarea>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg p-2 mb-4"
              value={reviewDate}
              onChange={(e) => setReviewDate(e.target.value)}
            />
            <div className="mb-4">
              <label className="block mb-2">Rating:</label>
              <select
                className="w-full border border-gray-300 rounded-lg p-2"
                value={starRating}
                onChange={(e) => setStarRating(Number(e.target.value))}
              >
                <option value="0">Select Rating</option>
                <option value="1">1 Star</option>
                <option value="2">2 Stars</option>
                <option value="3">3 Stars</option>
                <option value="4">4 Stars</option>
                <option value="5">5 Stars</option>
              </select>
            </div>
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 mr-2"
                onClick={handleAddReview}
              >
                Submit
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-200"
                onClick={() => setShowReviewModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;