import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const AddProperty = ({ agentDisplayName, agentEmail }) => {
  const { register, handleSubmit, reset } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const axiosPublic = useAxiosPublic();

  const onSubmit = async (data) => {
    const newProperty = {
      title: data.propertyTitle,
      location: data.propertyLocation,
      image: data.propertyImage,
      bedNumber: data.bedNumber ? parseInt(data.bedNumber, 10) : null,
      bathNumber: data.bathNumber ? parseInt(data.bathNumber, 10) : null,
      agentName: agentDisplayName,
      agentEmail: agentEmail,
      price: data.price ? parseInt(data.price, 10) : null,
    };

    try {
      const response = await axiosPublic.post('/properties', newProperty);
      console.log(response.data);
      reset(); // Reset the form fields
      setErrorMessage('');
    } catch (error) {
      console.error('Error adding property:', error);
      setErrorMessage('Failed to add property. Please try again later.');
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Add Property</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="propertyTitle" className="block text-sm font-medium text-gray-700">Property Title:</label>
          <input type="text" id="propertyTitle" {...register('propertyTitle', { required: true })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500" />
        </div>

        <div className="mb-4">
          <label htmlFor="propertyLocation" className="block text-sm font-medium text-gray-700">Property Location:</label>
          <input type="text" id="propertyLocation" {...register('propertyLocation', { required: true })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500" />
        </div>

        <div className="mb-4">
          <label htmlFor="propertyImage" className="block text-sm font-medium text-gray-700">Property Image URL:</label>
          <input type="text" id="propertyImage" {...register('propertyImage', { required: true })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500" />
        </div>

        <div className="mb-4">
          <label htmlFor="bedNumber" className="block text-sm font-medium text-gray-700">Bed Number:</label>
          <input type="number" id="bedNumber" {...register('bedNumber')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500" />
        </div>

        <div className="mb-4">
          <label htmlFor="bathNumber" className="block text-sm font-medium text-gray-700">Bath Number:</label>
          <input type="number" id="bathNumber" {...register('bathNumber')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500" />
        </div>

        <div className="mb-4">
          <label htmlFor="agentName" className="block text-sm font-medium text-gray-700">Agent Name:</label>
          <input type="text" id="agentName" value={agentDisplayName} readOnly className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500" />
        </div>

        <div className="mb-4">
          <label htmlFor="agentEmail" className="block text-sm font-medium text-gray-700">Agent Email:</label>
          <input type="email" id="agentEmail" value={agentEmail} readOnly className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500" />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price:</label>
          <input type="number" id="price" {...register('price', { required: true })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500" />
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200">Add Property</button>
      </form>
      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
    </div>
  );
};

export default AddProperty;
