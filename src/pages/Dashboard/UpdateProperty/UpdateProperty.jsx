import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UpdateProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Replace useHistory with useNavigate
  const axiosSecure = useAxiosSecure();
  const [property, setProperty] = useState({
    title: "",
    location: "",
    price: 0,
    bedNumber: 0,
    bathNumber: 0,
    agentName: "",
    agentImage: "",
    verificationStatus: false,
    // Add more fields as per your property data structure
  });

  useEffect(() => {
    fetchPropertyDetails(); // Fetch initial property details on component mount
  }, []);

  const fetchPropertyDetails = async () => {
    try {
      const response = await axiosSecure.get(`/properties/${id}`);
      setProperty(response.data); // Set property details fetched from backend
    } catch (error) {
      console.error('Error fetching property details:', error);
      // Handle error fetching property details
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosSecure.patch(`/properties/${id}`, property);
      navigate("/myAddedProperties"); // Use navigate to redirect to property list after successful update
    } catch (error) {
      console.error('Error updating property:', error);
      // Handle error updating property
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-base-200 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center pb-5">Update Property</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" value={property.title} onChange={handleChange} required />
          
          {/* Add more input fields for other property details */}
          
        </div>
        <button type="submit" className="btn btn-primary mt-4">Update Property</button>
      </form>
    </div>
  );
};

export default UpdateProperty;
