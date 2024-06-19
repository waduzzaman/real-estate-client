import { useState } from 'react';
import axios from 'axios';

const AddProperty = ({ agentDisplayName, agentEmail }) => {
  const [propertyTitle, setPropertyTitle] = useState('');
  const [propertyLocation, setPropertyLocation] = useState('');
  const [propertyImage, setPropertyImage] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPropertyImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProperty = {
      title: propertyTitle,
      location: propertyLocation,
      image: propertyImage,
      agentName: agentDisplayName,
      agentEmail: agentEmail,
      priceRange: priceRange,
    };

    try {
      const response = await axios.post('/properties', newProperty);
      console.log(response.data); 
      setPropertyTitle('');
      setPropertyLocation('');
      setPropertyImage('');
      setPriceRange('');
      setErrorMessage('');
    } catch (error) {
      console.error('Error adding property:', error);
      setErrorMessage('Failed to add property. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Add Property</h2>
      <form onSubmit={handleSubmit}>
        <label>Property Title:</label>
        <input type="text" value={propertyTitle} onChange={(e) => setPropertyTitle(e.target.value)} required />

        <label>Property Location:</label>
        <input type="text" value={propertyLocation} onChange={(e) => setPropertyLocation(e.target.value)} required />

        <label>Property Image:</label>
        <input type="file" onChange={handleImageChange} accept="image/*" required />

        <label>Agent Name:</label>
        <input type="text" value={agentDisplayName} readOnly />

        <label>Agent Email:</label>
        <input type="email" value={agentEmail} readOnly />

        <label>Price Range:</label>
        <input type="text" value={priceRange} onChange={(e) => setPriceRange(e.target.value)} required />

        <button type="submit">Add Property</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default AddProperty;
