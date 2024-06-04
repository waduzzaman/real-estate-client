import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Testimonials = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []); 

    const testimonials = [
        {
            id: 1,
            quote: "I found my dream home with the help of Dream Home Real Estate. The entire process was smooth and hassle-free. Highly recommended!",
            author: "John Doe",
            ratings:"",
        },
        {
            id: 2,
            quote: "Dream Home Real Estate made buying my first home a breeze. Their team was professional and knowledgeable, and they helped me every step of the way.",
            author: "Jane Smith",
            ratings:"",
        },
        {
            id: 3,
            quote: "Dream Home Real Estate made buying my first home a breeze. Their team was professional and knowledgeable, and they helped me every step of the way.",
            author: "Ayaana",
            ratings:"",
        },
      
    ];

    return (
        <section className="bg-gray-100 py-12">
            <div className="container mx-auto px-2">
                <h2 className="text-3xl font-semibold mb-6">Client Testimonials</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 p-2">
                    {testimonials.map(testimonial => (
                        <div
                            key={testimonial.id}
                            className="bg-white shadow-md rounded-lg overflow-hidden p-5"
                            data-aos="fade-up" // AOS animation attribute
                        >
                            <p className="text-gray-700">{testimonial.quote}</p>
                            <div className="flex items-center mt-4">
                                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-500 text-white mr-4">
                                    <FontAwesomeIcon icon={faUser} size="lg" />
                                </div>
                                <div>
                                    <p className="font-semibold">{testimonial.author}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
