import { useEffect } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import useFeaturedProperties from '../../../hooks/useFeaturedProperties';
import { Link } from 'react-router-dom';


const FeaturedProperties = () => {
    const { featuredProperties, error, isLoading, refetch } = useFeaturedProperties();

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
                subHeading="Featured"
                heading="Featured Properties"
            ></SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {featuredProperties.map((property, index) => (
                    <div key={index} className="border rounded-lg overflow-hidden shadow-md">
                        <img src={property.image} alt={property.location} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                            <p className="text-gray-600 mb-2">{property.location}</p>
                            <p className="text-gray-600 mb-2">{property.shortDescription}</p>
                            <Link className="btn btn-primary mt-4" to={`/details/${property._id}`}>
                Details
              </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FeaturedProperties;
