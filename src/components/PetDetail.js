import React from 'react';
import { useNavigate } from 'react-router-dom';

const PetDetail = ({ pet, onRemovePet }) => {
  const navigate = useNavigate();

  const handleNavigateToTracker = () => {
    navigate(`/tracker/${pet.id}`);
  };

  return (
    <div className="bg-gray-100 mb-4 rounded p-4 shadow-lg flex justify-between items-center">
    <div className="flex justify-between items-center">
      <div>
        <h5 className="text-lg font-bold">{pet.name}</h5>
        <p>Breed: {pet.breed}</p>
        <p>Birth Year: {pet.birth_year}</p>
      </div>
    </div>
    <div className="flex justify-between items-center">
      {pet.qr_code_data_url && (
        <div className="my-4">
          <img src={pet.qr_code_data_url} alt="QR Code" style={{ maxWidth: '100px', maxHeight: '100px' }} />
        </div>
      )}
    </div>
    <div className="flex flex-col sm:flex-row sm:justify-between">
    <div className="flex flex-col space-y-2">
      <button 
        onClick={() => onRemovePet(pet.id)} 
        className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded w-full transition-colors duration-150">
          Delete
      </button>
      <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full transition-colors duration-150"
        onClick={() => navigate(`/edit-pet/${pet.id}`)}>
          Edit
      </button>
      <button 
        onClick={handleNavigateToTracker}
        className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full transition-colors duration-150">
          Location
      </button>
    </div>

    </div>
    </div>
  );
};

export default PetDetail;
