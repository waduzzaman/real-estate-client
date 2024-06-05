import React, { useState, useEffect } from "react";

const Advertisement = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/properties.json");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="container mx-auto py-12">
      <h2 className="text-3xl font-semibold mb-6">Advertisement Section</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {properties.slice(0, 4).map((property) => (
          <div key={property.id} className="border rounded-lg overflow-hidden shadow-md">
            <img src={property.image} alt={property.location} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{property.location}</h3>
              <p className="text-gray-600 mb-2">Price Range: {property.priceRange}</p>
              <p className="text-gray-600 mb-2">Verification Status: {property.verificationStatus}</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Advertisement;
