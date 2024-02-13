import React from 'react';
import { Link } from 'react-router-dom';

const PetForm = ({ pet, setPet, onSubmit, formTitle }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPet((prevPet) => ({
      ...prevPet,
      [name]: name === 'image' ? e.target.files[0] : value,
    }));
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-xl font-semibold mb-5">{formTitle}</h1>
      <form onSubmit={onSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {/* Name Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Pet Name" name="name" value={pet.name} onChange={handleChange} />
        </div>

        {/* Breed Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="breed">
            Breed
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="breed" type="text" placeholder="Breed" name="breed" value={pet.breed} onChange={handleChange} />
        </div>

        {/* Birth Year Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="birthYear">
            Birth Year
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="birthYear" type="text" placeholder="Birth Year" name="birth_year" value={pet.birth_year} onChange={handleChange} />
        </div>

        {/* Image Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
            Image
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="image" type="file" name="image" onChange={handleChange} />
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            {formTitle}
          </button>
          <Link to="/" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">Cancel</Link>
        </div>
      </form>
    </div>
  );
};

export default PetForm;
