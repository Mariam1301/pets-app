import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchPets, removePet, fetchImageAsDataUrl } from '../Api';
import PetList from '../components/PetList';
import HomeHeader from '../components/HomeHeader';

const Home = () => {
  const [pets, setPets] = useState([]);
  const [initiatedFetch, setInitiatedFetch] = useState(false);

  const handleFetchPets = async () => {
    try {
      const data = await fetchPets();
      await fetchQRCodes(data);
    } catch (error) {
      console.error('Error fetching pets:', error);
    }
  };

  const handleRemovePet = async (id) => {
    try {
      await removePet(id);
      setPets(prev => prev.filter(pet => pet.id !== id));
    } catch (error) {
      console.error('Error deleting pet:', error);
    }
  };

  const fetchQRCodes = async (pets) => {
    const updatedPets = await Promise.all(
      pets.map(async (pet) => {
        if (!pet.qr_code_url) return pet;
        try {
          const dataUrl = await fetchImageAsDataUrl(pet.qr_code_url);
          return { ...pet, qr_code_data_url: dataUrl };
        } catch (error) {
          console.error('Error fetching QR code:', error);
          return pet;
        }
      })
    );
    setPets(updatedPets);
  };

  useEffect(() => {
    if (!initiatedFetch) {
      handleFetchPets();
      setInitiatedFetch(true);
    }
  }, [initiatedFetch]);

  return (
    <div>
    <HomeHeader />
    <div className="container mx-auto">
      <h3 className="text-center text-3xl mt-20 mb-6 font-bold">My Pets</h3>
      <div className="text-right mb-4">
        <Link to="/add-pet" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Pet
        </Link>
      </div>
      {pets.length > 0 ? (
        <PetList pets={pets} onRemovePet={handleRemovePet} />
      ) : (
        <p>No pets to display</p>
      )}
    </div>
    </div>
  );
};

export default Home;
