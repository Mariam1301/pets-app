import React from 'react';

const OwnerDetailsCard = ({ ownerDetails }) => {
  if (!ownerDetails) return null;

  return (
    <div className="max-w-md mx-auto rounded overflow-hidden shadow-lg bg-white m-4 p-4">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">Pet Owner Details</div>
        <p className="text-gray-700 text-base">
          Name: {ownerDetails.name}
        </p>
        <p className="text-gray-700 text-base">
          Phone: {ownerDetails.phone}
        </p>
        <p className="text-gray-700 text-base">
          Email: {ownerDetails.email}
        </p>
      </div>
    </div>
  );
};

export default OwnerDetailsCard;
