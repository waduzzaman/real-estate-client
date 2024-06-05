import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const AllProperties = () => {
    const { isAuthenticated } = useAuth();
    const [properties, setProperties] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            fetch('/properties.json')
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => console.log(data))
                .catch(error => console.error('Error fetching properties:', error));
        }
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return <div>Please log in to view properties.</div>;
    }

    return (
        <div className="min-h-screen bg-base-200 p-8">
            <h1 className="text-4xl font-bold mb-8">All Properties</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {properties.map(property => (
                    <div key={property.id} className="card shadow-lg">
                        <img src={property.image} alt={property.title} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h2 className="text-2xl font-bold">{property.title}</h2>
                            <p className="text-gray-600">{property.location}</p>
                            <div className="flex items-center mt-2">
                                <img src={property.agentImage} alt={property.agentName} className="w-12 h-12 rounded-full mr-4" />
                                <p className="text-gray-600">{property.agentName}</p>
                            </div>
                            <p className="text-gray-600">{property.priceRange}</p>
                            <p className={`text-gray-600 ${property.verificationStatus ? 'text-green-500' : 'text-red-500'}`}>
                                {property.verificationStatus ? 'Verified' : 'Not Verified'}
                            </p>
                            <p className="text-gray-600">{property.featured === "Yes" ? "Featured Property" : ""}</p>
                            <button
                                className="btn btn-primary mt-4"
                                onClick={() => navigate(`/property/${property.id}`)}
                            >
                                Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllProperties;
