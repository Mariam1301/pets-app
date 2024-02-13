import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { submitPetLocation } from '../Api';

export default function PetLocation() {
    const { petId } = useParams();
    const navigate = useNavigate();
    const [statusMessage, setStatusMessage] = useState('Fetching location...');

    useEffect(() => {
        const fetchAndSubmitLocation = async () => {
            if (!navigator.geolocation) {
                setStatusMessage('Geolocation is not supported by your browser.');
                return;
            }

            navigator.geolocation.getCurrentPosition(async (position) => {
                const latitude = position.coords.latitude.toString();
                const longitude = position.coords.longitude.toString();
                
                try {
                    await submitPetLocation(petId, { latitude, longitude });
                    alert('Location submitted successfully. Thank you!');
                    navigate('/home');
                } catch (error) {
                    setStatusMessage(error.message || 'Failed to submit location data.');
                }
            }, () => {
                setStatusMessage('Unable to retrieve your location. Please allow location access and try again.');
            });
        };

        fetchAndSubmitLocation();
    }, [petId, navigate]);

    return (
        <div className="text-center mt-20">
            <p>{statusMessage}</p>
        </div>
    );
}
