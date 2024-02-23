import React, { useState } from 'react';

function MobileInputWithButton({ onSendCode, onMobileChange }) {
  const [mobile, setMobile] = useState('');

  const handleChange = (e) => {
    setMobile(e.target.value);
    onMobileChange(e.target.value);
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="tel"
        value={mobile}
        onChange={handleChange}
        className="input input-bordered flex-grow p-2.5 text-sm text-gray-900 bg-gray-50 rounded-l-md border border-r-0 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        placeholder="Mobile Number"
      />
      <button
        type="button"
        onClick={() => onSendCode(mobile)}
        className="px-4 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-r-md border border-l-0 border-blue-600 hover:border-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Send Code
      </button>
    </div>
  );
}

export default MobileInputWithButton;
