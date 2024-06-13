

// import { useState, useEffect } from "react";
// import useAxiosPublic from "../../hooks/useAxiosPublic";
// import useAuth from "../../hooks/useAuth";
// // import SectionTitle from "../../components/SectionTitle/SectionTitle";
// import Swal from "sweetalert2";

// const Reviews = () => {
//   const { user } = useAuth();
//   const axiosPublic = useAxiosPublic();
//   const [loading, setLoading] = useState(true);
//   const [reviews, setReviews] = useState([]);
//   const [properties, setProperties] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchReviews = async () => {
//       if (!user) return;

//       try {
//         const response = await axiosPublic.get("/reviews", {
//           headers: {
//             Authorization: `Bearer ${user.token}`,
//           },
//         });
//         const reviewData = response.data;
//         setReviews(reviewData);

//         const propertyIds = reviewData.map((review) => review.propertyId);
//         const propertyResponses = await Promise.all(
//           propertyIds.map((id) => axiosPublic.get(`/properties/${id}`))
//         );
//         const propertyData = propertyResponses.map((res) => res.data);
//         setProperties(propertyData);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReviews();
//   }, [user, axiosPublic]);

//   const handleDelete = async (reviewId) => {
//     // Show confirmation dialog
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You will not be able to recover this review!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axiosPublic.delete(`/reviews/${reviewId}`, {
//             headers: {
//               Authorization: `Bearer ${user.token}`,
//             },
//           });
//           // Update the state after successful deletion
//           setReviews(reviews.filter((review) => review._id !== reviewId));
//           Swal.fire("Deleted!", "Your review has been deleted.", "success");
//         } catch (error) {
//           console.error("Error deleting review:", error);
//           Swal.fire("Error!", "Failed to delete the review.", "error");
//         }
//       }
//     });
//   };

//   const isReviewAlreadyDone = (propertyId) => {
//     return reviews.some((review) => review.propertyId === propertyId);
//   };

//   if (!user) {
//     return (
//       <div className="text-center mt-8 text-gray-600">
//         Please log in to view your reviews.
//       </div>
//     );
//   }

//   if (loading) {
//     return <div className="text-center mt-8 text-gray-600">Loading...</div>;
//   }

//   if (error) {
//     return (
//       <div className="text-center mt-8 text-gray-600">
//         Error fetching reviews: {error}
//       </div>
//     );
//   }

//   if (!reviews || reviews.length === 0) {
//     return (
//       <div className="text-center mt-8 text-gray-600">You have no reviews.</div>
//     );
//   }

//   return (
//     <div className="container mx-auto py-12 px-4 md:px-8 lg:px-16 mb-36 ">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto">
//         {reviews.map((review) => {
//           const property = properties.find(
//             (property) => property._id === review.propertyId
//           );
//           return (
//             <div key={review._id} className="bg-white shadow-md rounded-lg p-4">
//               {property && (
//                 <>
//                   <p className="text-gray-700">{property.image}</p>
//                   <p className="text-gray-700">{property.title}</p>
//                 </>
//               )}
//               <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-md">
//                 <p className="text-gray-700 mb-2">{review.text}</p>
//                 <button
//                   onClick={() => handleDelete(review._id)}
//                   className="mt-4 bg-red-500 text-white py-2 px-4 w-full"
//                 >
//                   Delete Review
//                 </button>
//               </div>
//               {!isReviewAlreadyDone(property._id) && (
//                 <button
//                   className="mt-4 bg-blue-500 text-white py-2 px-4 w-full disabled:opacity-50"
//                   disabled
//                 >
//                   Add Review (Already Reviewed)
//                 </button>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Reviews;

import { useState, useEffect } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import Swal from "sweetalert2";

const Reviews = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!user) return;

      try {
        const response = await axiosPublic.get("/reviews", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const reviewData = response.data;
        setReviews(reviewData);

        const propertyIds = reviewData.map((review) => review.propertyId);
        const propertyResponses = await Promise.all(
          propertyIds.map((id) => axiosPublic.get(`/properties/${id}`))
        );
        const propertyData = propertyResponses.map((res) => res.data);
        setProperties(propertyData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [user, axiosPublic]);

  const handleDelete = async (reviewId) => {
    // Show confirmation dialog
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
          // Update the state after successful deletion
          setReviews(reviews.filter((review) => review._id !== reviewId));
          Swal.fire("Deleted!", "Your review has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting review:", error);
          Swal.fire("Error!", "Failed to delete the review.", "error");
        }
      }
    });
  };

  const isReviewAlreadyDone = (propertyId) => {
    return reviews.some((review) => review.propertyId === propertyId);
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((review) => {
          const property = properties.find(
            (property) => property._id === review.propertyId
          );
          return (
            <div key={review._id} className="bg-white shadow-md rounded-lg p-4">
              {property && (
                <>
                <img src={property.image} alt="" />
                  <p className="text-gray-700">{property.title}</p>
                </>
              )}
              <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-md">
                <p className="text-gray-700 mb-2">{review.text}</p>
                <button
                  onClick={() => handleDelete(review._id)}
                  className="mt-4 bg-red-500 text-white py-2 px-4 w-full"
                >
                  Delete Review
                </button>
              </div>
              {!isReviewAlreadyDone(property._id) && (
                <button
                  className="mt-4 bg-blue-500 text-white py-2 px-4 w-full disabled:opacity-50"
                  disabled
                >
                  
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Reviews;


