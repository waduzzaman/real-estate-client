import { useEffect, useState, useRef } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css';

const Testimonials = () => {
    const [reviews, setReviews] = useState([]);
    const containerRef = useRef(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch('http://localhost:5000/testimonials');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                // Sort reviews by date and take the latest 3
                const latestReviews = data.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);
                setReviews(latestReviews);
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        fetchReviews();
    }, []);

    const scroll = (direction) => {
        const { current } = containerRef;
        if (direction === 'left') {
            current.scrollBy({ left: -300, behavior: 'smooth' });
        } else {
            current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    return (
        <section className="my-20">
            <SectionTitle
                subHeading="Latest Testimonials"
                heading="Testimonials"
            />
            <div className="relative overflow-hidden">
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 h-12 w-12 flex items-center justify-center text-white bg-gray-900 bg-opacity-75 hover:bg-opacity-90 rounded-full focus:outline-none shadow-lg"
                >
                    {"<"}
                </button>
                <div ref={containerRef} className="flex overflow-x-auto space-x-8 px-4 md:px-24 py-16 scrollbar-hide">
                    {reviews.map(review => (
                        <div key={review._id} className="flex-shrink-0 w-80 p-6 bg-white shadow-lg rounded-lg transform transition-transform duration-300 hover:scale-105">
                            <div className="flex flex-col items-center">
                                <h3 className="text-xl font-semibold text-gray-900">{review.name}</h3>
                                <img
                                    src={review.reviewerImage}
                                    alt={review.name}
                                    className="w-16 h-16 rounded-full object-cover mb-4"
                                />
                                <Rating
                                    style={{ maxWidth: 180 }}
                                    value={review.rating}
                                    readOnly
                                />
                                <p className="py-4 text-center text-gray-700">{review.details}</p>
                                <p className="text-sm text-gray-500">{review.property}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 h-12 w-12 flex items-center justify-center text-white bg-gray-900 bg-opacity-75 hover:bg-opacity-90 rounded-full focus:outline-none shadow-lg"
                >
                    {">"}
                </button>
            </div>
        </section>
    );
};

export default Testimonials;
