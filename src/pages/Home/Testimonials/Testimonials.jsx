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
                const response = await fetch('https://bistro-boss-server-seven-sage.vercel.app/reviews');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setReviews(data);
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
                subHeading="User Reviews"
                heading="Testimonials"
            />
            <div className="relative overflow-hidden">
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 h-12 w-12 flex items-center justify-center text-white bg-gray-900 bg-opacity-75 hover:bg-opacity-90 rounded-full focus:outline-none shadow-lg"
                >
                    {"<"}
                </button>
                <div ref={containerRef} className="flex overflow-x-auto space-x-8 mx-4 md:mx-24 my-16 scrollbar-hide">
                    {reviews.map(review => (
                        <div key={review._id} className="flex-shrink-0 w-72 p-6 bg-white shadow-lg rounded-lg transform transition-transform duration-300 hover:scale-105">
                            <div className="flex flex-col items-center">
                                <Rating
                                    style={{ maxWidth: 180 }}
                                    value={review.rating}
                                    readOnly
                                />
                                <p className="py-8 text-center text-gray-700">{review.details}</p>
                                <h3 className="text-2xl font-semibold text-orange-500">{review.name}</h3>
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
