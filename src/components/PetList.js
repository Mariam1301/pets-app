import React from 'react';
import PetDetail from './PetDetail';

const PetList = ({ pets, onRemovePet }) => {
  return (
    <div className="flex flex-col">
      {pets.map((pet) => (
        <PetDetail key={pet.id} pet={pet} onRemovePet={onRemovePet} />
      ))}
    </div>
  );
};

export default PetList;
