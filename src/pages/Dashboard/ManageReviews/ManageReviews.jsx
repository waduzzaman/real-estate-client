import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { AiFillStar } from "react-icons/ai";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const ManageReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!user) return;

      try {
        const response = await axiosSecure.get("/reviews", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const reviewData = response.data;
        setReviews(reviewData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [user, axiosSecure]);

  const handleDelete = async (reviewId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this review!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/reviews/${reviewId}`, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          setReviews(reviews.filter((review) => review._id !== reviewId));
          Swal.fire("Deleted!", "Your review has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting review:", error);
          Swal.fire("Error!", "Failed to delete the review.", "error");
        }
      }
    });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <AiFillStar
        key={index}
        className={`inline-block ${index < rating ? "text-yellow-500" : "text-gray-300"}`}
      />
    ));
  };

  if (!user) {
    return (
      <div className="text-center mt-8 text-gray-600">
        Please log in to view your reviews.
      </div>
    );
  }

  if (loading) {
    return <div className="text-center mt-8 text-gray-600">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-8 text-gray-600">
        Error fetching reviews: {error}
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center mt-8 text-gray-600">You have no reviews.</div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-8 lg:px-16 mb-36">
      <div className="mb-4 mt-20 text-center font-bold">
        <SectionTitle subHeading="All User Reviews" heading="Reviews" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((review) => (
          <div key={review._id} className="bg-white shadow-md rounded-lg p-4">
            <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-md">
              <p className="text-gray-700 mb-2">{review.text}</p>
              <div className="mb-2">{renderStars(review.starRating || 0)}</div>
              <p className="text-gray-500 mt-10 text-end">
                {new Date(review.reviewDate || review.date).toLocaleString()}
              </p>
              <button
                onClick={() => handleDelete(review._id)}
                className="mt-4 bg-red-500 text-white py-2 px-4 w-full rounded"
              >
                Delete Review
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageReviews;
