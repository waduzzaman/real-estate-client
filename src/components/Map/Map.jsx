import { useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import SectionTitle from "../SectionTitle/SectionTitle";

const Map = () => {
  const containerStyle = {
    width: '100%',
    height: '400px'
  };

  const center = {
    lat: 43.75759366221604,
    lng: -79.22396057439575
  };

  const markerPosition = {
    lat: 43.75759366221604,
    lng: -79.22396057439575
  };

  useEffect(() => {
    if (!import.meta.env.VITE_MAP_API) {
      console.error("Google Maps API key is missing. Please check your environment variables.");
    }
  }, []);

  return (
    
    <div className="p-4 md:p-8 lg:p-16 bg-gray-100">
         <SectionTitle
                subHeading=" Location "
                heading="Find Us"
            ></SectionTitle>
      {/* <h2 className="text-3xl font-semibold text-center mb-6">Our Location</h2> */}
      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_WEATHER_API}
        onError={(error) => console.error("Error loading Google Maps API script:", error)}
        // onLoad={() => console.log("Google Maps API script loaded successfully.")}
      >
        <div className="overflow-hidden rounded-lg shadow-lg">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            tilt={45}
            mapTypeId="roadmap"
          >
            <Marker position={markerPosition} />
          </GoogleMap>
        </div>
      </LoadScript>
    </div>
  );
};

export default Map;
