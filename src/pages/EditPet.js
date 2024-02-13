import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchPetDetails, updatePet } from '../Api';
import PetForm from '../components/PetForm';

const EditPet = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState({
    name: '',
    breed: '',
    birth_year: '',
  });

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const petDetails = await fetchPetDetails(id);
        setPet({
          name: petDetails.name,
          breed: petDetails.breed,
          birth_year: petDetails.birth_year,
        });
      } catch (error) {
        console.error('Error fetching pet details:', error);
      }
    };

    fetchDetails();
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
        pet.id = id
      await updatePet(pet);
      navigate('/');
    } catch (error) {
      console.error("Error updating pet:", error);
    }
  };

  return <PetForm pet={pet} setPet={setPet} onSubmit={onSubmit} formTitle="Edit Pet" />;
};

export default EditPet;
