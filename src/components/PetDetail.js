import React from 'react';
import { Link } from 'react-router-dom';

const PetDetail = ({ pet, onRemovePet }) => {
  return (
    <div className="bg-gray-100 mb-4 rounded p-4 shadow-lg">
      <h5 className="text-lg font-bold">{pet.name}</h5>
      <p>Breed: {pet.breed}</p>
      <p>Birth Year: {pet.birth_year}</p>
      {pet.qr_code_data_url && (
        <div className="my-4">
          <img src={pet.qr_code_data_url} alt="QR Code" style={{ maxWidth: '100px', maxHeight: '100px' }} />
        </div>
      )}
      <div className="mt-4">
        <Link 
          to={`/edit-pet/${pet.id}`} 
          state={{ pet }}
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2">
            Edit
        </Link>
        <button 
          onClick={() => onRemovePet(pet.id)} 
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
            Delete
        </button>
      </div>
    </div>
  );
};

export default PetDetail;
