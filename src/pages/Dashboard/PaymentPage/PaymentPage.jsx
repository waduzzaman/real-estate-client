import{ useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const PaymentPage = () => {
  const location = useLocation();
  const { offer } = location.state;

  const handlePayment = async () => {
    try {
      // Simulate payment process and get transaction ID
      const transactionId = 'dummy-transaction-id'; // Replace with actual payment process

      // Update offer status to 'bought'
      await axios.patch(`http://localhost:5000/offers/${offer._id}/status`, {
        status: 'bought',
        transactionId
      });

      Swal.fire({
        icon: 'success',
        title: 'Payment Successful',
        text: `Transaction ID: ${transactionId}`
      });

      // Redirect to property bought page
      history.push('/property-bought');
    } catch (error) {
      console.error('Error during payment:', error);
      Swal.fire({
        icon: 'error',
        title: 'Payment Failed',
        text: 'There was an error processing your payment. Please try again.'
      });
    }
  };

  return (
    <div>
      <h2>Payment for {offer.property.title}</h2>
      <p>Amount: ${offer.offeredAmount}</p>
      <button onClick={handlePayment}>Complete Payment</button>
    </div>
  );
};

export default PaymentPage;
