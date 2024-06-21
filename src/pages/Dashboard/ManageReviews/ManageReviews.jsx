import { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';
import useAdmin from '../../../hooks/useAdmin';

const ManageReviews = () => {
  const { currentUser } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('/reviews'); // Adjust the endpoint according to your backend
        setReviews(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setLoading(false);
      }
    };

    if (currentUser && isAdmin) {
      fetchReviews();
    }
  }, [currentUser, isAdmin]);

  const handleDeleteReview = async (reviewId) => {
    try {
      await axios.delete(`/reviews/${reviewId}`);
      setReviews(reviews.filter(review => review._id !== reviewId));
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  if (!currentUser || !isAdmin || isAdminLoading) {
    return null;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Manage Reviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.map(review => (
          <div key={review._id} className="bg-white p-4 rounded shadow">
            <div className="flex items-center mb-4">
              <img
                // src={review.reviewerImage || defaultUserImage}
                src={review.reviewerImage}
                alt="Reviewer"
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div>
                <p className="font-bold">{review.reviewerName}</p>
                <p className="text-gray-600">{review.reviewerEmail}</p>
              </div>
            </div>
            <p className="mb-4">{review.review}</p>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => handleDeleteReview(review._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageReviews;
