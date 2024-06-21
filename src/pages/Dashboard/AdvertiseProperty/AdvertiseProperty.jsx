import{ useState, useEffect } from 'react';
import axios from 'axios';

const AdvertiseProperty = () => {
  const [verifiedProperties, setVerifiedProperties] = useState([]);
  const [advertising, setAdvertising] = useState(false);

  useEffect(() => {
    const fetchVerifiedProperties = async () => {
      try {
        const response = await axios.get('/properties/verified');
        setVerifiedProperties(response.data);
      } catch (error) {
        console.error('Error fetching verified properties:', error);
      }
    };

    fetchVerifiedProperties();
  }, []);

  const handleAdvertise = async (propertyId) => {
    setAdvertising(true);
    try {
      await axios.post(`/properties/advertise/${propertyId}`);
      setVerifiedProperties(verifiedProperties.map(property =>
        property._id === propertyId ? { ...property, advertised: true } : property
      ));
    } catch (error) {
      console.error('Error advertising property:', error);
    } finally {
      setAdvertising(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Advertise Properties</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Property Image</th>
              <th className="border border-gray-300 px-4 py-2">Property Title</th>
              <th className="border border-gray-300 px-4 py-2">Price Range</th>
              <th className="border border-gray-300 px-4 py-2">Agent Name</th>
              <th className="border border-gray-300 px-4 py-2">Advertise</th>
            </tr>
          </thead>
          <tbody>
            {verifiedProperties.map((property) => (
              <tr key={property._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">
                  <img src={property.image} alt={property.title} className="w-32 h-32 object-cover" />
                </td>
                <td className="border border-gray-300 px-4 py-2">{property.title}</td>
                <td className="border border-gray-300 px-4 py-2">{property.priceRange}</td>
                <td className="border border-gray-300 px-4 py-2">{property.agentName}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {property.advertised ? (
                    <span className="text-green-500">Advertised</span>
                  ) : (
                    <button
                      onClick={() => handleAdvertise(property._id)}
                      className={`bg-blue-500 text-white px-4 py-2 rounded-lg ${advertising ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={advertising}
                    >
                      Advertise
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdvertiseProperty;
