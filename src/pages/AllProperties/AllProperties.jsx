


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useProperties from "../../hooks/useProperties";
import { Helmet } from "react-helmet-async";

const AllProperties = () => {
  const { user } = useAuth();
  const { properties, error, isLoading, refetch } = useProperties();
  const [searchLocation, setSearchLocation] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [filteredProperties, setFilteredProperties] = useState([]);

  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [user, refetch]);

  useEffect(() => {
    if (properties) {
      let updatedProperties = [...properties];

      // Filter by location
      if (searchLocation) {
        updatedProperties = updatedProperties.filter((property) =>
          property.location.toLowerCase().includes(searchLocation.toLowerCase())
        );
      }

      // Sort by price
      if (sortOrder === "ascending") {
        updatedProperties.sort((a, b) => a.price - b.price);
      } else if (sortOrder === "descending") {
        updatedProperties.sort((a, b) => b.price - a.price);
      }

      setFilteredProperties(updatedProperties);
    }
  }, [properties, searchLocation, sortOrder]);

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
    <div className="min-h-screen bg-base-200 p-8">
      <Helmet>
        <title>RealEstate | All Properties</title>
      </Helmet>
      <h1 className="text-4xl font-bold mb-8 mt-32 text-center pb-5">All Properties</h1>

      {/* Search and Sort Controls */}
      <div className="mb-8 flex justify-center gap-4">
        <input
          type="text"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          placeholder="Search by location"
          className="input input-bordered w-full max-w-xs"
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="select select-bordered w-full max-w-xs"
        >
          <option value="default">Sort by price</option>
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProperties.map((property, index) => (
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
                {property.agentImage && (
                  <img
                    src={property.agentImage}
                    alt={property.agentName}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                )}
                <p className="text-gray-600">{property.agentName || "No agent assigned"}</p>
              </div>
              <div className="mt-2">
                <p className="text-gray-600">Price: ${property.price}</p>
              </div>
              <p className="text-gray-600">{property.bedNumber} Bed(s), {property.bathNumber} Bath(s)</p>
              <p className={`text-gray-600 ${property.verificationStatus ? "text-green-500" : "text-red-500"}`}>
                {property.verificationStatus ? "Verified" : "Not Verified"}
              </p>
              <Link className="btn btn-primary mt-4" to={`/details/${property._id}`}>
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


