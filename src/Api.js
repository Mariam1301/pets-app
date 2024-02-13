const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchPets = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_BASE_URL}/pet`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch pets');
  }
  return response.json();
};

export const removePet = async (id) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_BASE_URL}/pet/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Could not delete the pet');
  }
  return true;
};

export const fetchImageAsDataUrl = async (imageUrl) => {
  const token = localStorage.getItem('token');
  const response = await fetch(imageUrl, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export const fetchPetDetails = async (id) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/pet/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch details for pet with ID ${id}`);
    }
    return response.json();
  };
  
  export const updatePet = async (pet) => {
    console.log(pet)
    const { id, name, breed, birth_year } = pet;
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/pet/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        breed,
        birth_year,
      }),
    });
    if (!response.ok) {
      throw new Error(`Failed to update pet with ID ${id}`);
    }
    return response.json();
  };

  export const addPet = async (formData) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/pet`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
  
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to add pet: ${errorText}`);
    }
  
    return response.json();
  };

export const login = async (loginDetails) => {
    console.log(process.env.REACT_APP_API_BASE_URL)
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginDetails)
    });

    if (!response.ok) {
        const data = await response.json();
        const error = data.message || 'An error occurred. Please try again.';
        if (response.status === 401) {
            throw new Error('Invalid credentials');
        } else {
            throw new Error(error);
        }
    }
    return response.json();
};

export const submitPetLocation = async (petId, locationData) => {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/pet-location/${petId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(locationData),
    });

    if (!response.ok) {
        throw new Error('Failed to submit location data.');
    }

    return response.json();
};

export const fetchPetLocations = async (petId) => {
    try {
        const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/pet/${petId}/locations`, {
        headers: {
        Authorization: `Bearer ${token}`,
      },});
      if (!response.ok) {
        throw new Error('Failed to fetch locations');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching pet locations:", error);
      throw error;
    }
  };
  


