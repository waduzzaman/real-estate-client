import { useState, useEffect } from 'react';

const DateTime = () => {
  const [currentDateTime, setCurrentDateTime] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const date = new Date();
      // const dateOptions = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
      const timeOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };

      // const formattedDate = date.toLocaleDateString('en-US', dateOptions);
      const formattedTime = date.toLocaleTimeString('en-US', timeOptions);
      
      setCurrentDateTime(`  ${formattedTime} | `);
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="text-right p-2">
      <p className=" font-semibold  text-gray-800 dark:text-gray-200">
        {currentDateTime || 'Loading...'}
      </p>
    </div>
  );
};

export default DateTime;