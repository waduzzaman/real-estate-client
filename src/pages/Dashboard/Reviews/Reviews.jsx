import { useState, useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import Swal from "sweetalert2";

const AllReviews = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axiosPublic.get('/reviews', {
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
  }, [user, axiosPublic]);

  const fetchPropertyDetails = async (review) => {
    try {
      const response = await axiosPublic.get(`/properties/${review.propertyId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching property details:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchReviewDetails = async () => {
      if (reviews.length === 0) return;

      const propertyDetails = await Promise.all(
        reviews.map(async (review) => {
          const property = await fetchPropertyDetails(review);
          return property;
        })
      );

      const filteredProperties = propertyDetails.filter(property => property !== null);
      setReviews(reviews.map((review, index) => ({
        ...review,
        property: filteredProperties[index]
      })));
    };

    fetchReviewDetails();
  }, [reviews, axiosPublic, ]);


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
          await axiosPublic.delete(`/reviews/${reviewId}`, {
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
        Please log in to view the reviews.
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
      <div className="text-center mt-8 text-gray-600">No reviews found.</div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-8 lg:px-16 mb-36">
      <div className="mb-4 mt-20 text-center font-bold">
        <SectionTitle subHeading="All Reviews" heading="Reviews" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((review) => (
          <div key={review._id} className="bg-white shadow-md rounded-lg p-4">
            {review.property && (
              <>
                <p className="text-gray-700 text-2xl font-bold my-2">{review.property.title}</p>
                <p className="text-gray-700"><span className="font-bold">Agent:</span> {review.property.agentName}</p>
              </>
            )}
            <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-md">
              <p className="text-gray-700 mb-2">{review.text}</p>
              <div className="mb-2">{renderStars(review.starRating || 0)}</div>
              <p className="text-gray-500 mt-10 text-end">
                {new Date(review.reviewDate || review.date).toLocaleString()}
              </p>
            </div>
            <button
                onClick={() => handleDelete(review._id)}
                className="mt-4 bg-red-500 text-white py-2 px-4 w-full rounded"
              >
                Delete Review
              </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllReviews;
