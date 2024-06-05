import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';

const FeaturedProperties = () => {

    const [featuredProperties, setFeaturedProperties] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("/featured-properties.json");
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const data = await response.json();
          setFeaturedProperties(data);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchData();
    }, []);
  
    return (
        <section className="container mx-auto py-12">
             <SectionTitle
                subHeading="Featured "
                heading="Featured Properties"
            ></SectionTitle>
            
        {/* <h2 className="text-3xl font-semibold mb-6">Featured Properties</h2> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProperties.map((property) => (
            <div key={property.id} className="border rounded-lg overflow-hidden shadow-md">
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

export default FeaturedProperties;