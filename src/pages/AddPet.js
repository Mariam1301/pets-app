import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addPet } from '../Api';
import PetForm from '../components/PetForm';

const AddPet = () => {
  const navigate = useNavigate();
  const [pet, setPet] = useState({
    name: '',
    breed: '',
    birth_year: '',
    image: null,
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(pet).forEach((key) => {
      if (pet[key] !== null) formData.append(key, pet[key]);
    });

    try {
      await addPet(formData);
      navigate('/');
    } catch (error) {
      console.error('Error adding pet:', error.message);
    }
  };

  return <PetForm pet={pet} setPet={setPet} onSubmit={onSubmit} formTitle="Add New Pet" />;
};

export default AddPet;
