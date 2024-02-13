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
                const { latitude, longitude } = position.coords;
                
                try {
                    await submitPetLocation(petId, { latitude, longitude });
                    setStatusMessage('Thank you! Redirecting to home page...');
                    setTimeout(() => navigate('/home'), 3000);
                } catch (error) {
                    setStatusMessage('Failed to submit location data.');
                }
            }, () => {
                setStatusMessage('Unable to retrieve your location.');
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
