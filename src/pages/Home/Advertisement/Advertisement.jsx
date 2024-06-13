

import { useEffect } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import useAd from '../../../hooks/useAd';

const Advertisement = () => {
    const { adProperties, error, isLoading, refetch } = useAd();

    useEffect(() => {
        refetch();
    }, [refetch]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading properties: {error.message}</div>;
    }

    return (
        <section className="container mx-auto py-12">
            <SectionTitle
                subHeading="Advertisement"
                heading="Advertisement Properties"
            ></SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {adProperties.map((property, index) => (
                    <div key={index} className="border rounded-lg overflow-hidden shadow-md">
                        <img src={property.image} alt={property.location} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                            <p className="text-gray-600 mb-2">{property.location}</p>
                            <p className="text-gray-600 mb-2">{property.shortDescription}</p>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Advertisement;

