import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useProperties from "../../hooks/useProperties";
import { Helmet } from "react-helmet-async";

const AllProperties = () => {
  const { user } = useAuth();
  const { properties, error, isLoading, refetch } = useProperties();
  const navigate = useNavigate();
  // console.log(properties.property._id);

  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [user, refetch, navigate]);

  if (!user) {
    return <div>Please log in to view properties.</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading properties: {error.message}</div>;
  }

  return (
    <div className="min-h-screen bg-base-200 p-8 ">
      <Helmet>
        <title> RealEstate | Sign Up</title>
      </Helmet>
      <h1 className="text-4xl font-bold mb-8 mt-32 text-center pb-5">All Properties</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {properties.map((property, index) => (
          <div key={index} className="card shadow-lg">
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-2xl font-bold">{property.title}</h2>
              <p className="text-gray-600">{property.location}</p>
              <div className="flex items-center mt-2">
                <img
                  src={property.agentImage}
                  alt={property.agentName}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <p className="text-gray-600">{property.agentName}</p>
              </div>
              <p className="text-gray-600">{property.priceRange}</p>
              <p
                className={`text-gray-600 ${
                  property.verificationStatus
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {property.verificationStatus ? "Verified" : "Not Verified"}
              </p>
              <p className="text-gray-600">
                {property.featured === "Yes" ? "Featured Property" : ""}
              </p>
              <Link
                className="btn btn-primary mt-4"
                to={`/details/${property._id}`}
              >
                Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProperties;
