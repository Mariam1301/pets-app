import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { submitPetLocation } from '../Api';

export default function PetLocation() {
    const { petId } = useParams();
    const navigate = useNavigate();
    const [statusMessage, setStatusMessage] = useState('');

    useEffect(() => {
        const handleSuccess = async (position) => {
            const latitude = position.coords.latitude.toString();
            const longitude = position.coords.longitude.toString();
        
            try {
                await submitPetLocation(petId, { latitude, longitude });
                alert('Location submitted successfully. Thank you!');
                navigate('/home');
            } catch (error) {
                setStatusMessage(error.message || 'Failed to submit location data.');
            }
        };

        const handleError = (error) => {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    setStatusMessage("Location access denied. Please enable location permissions in your browser settings and try again.");
                    break;
                case error.POSITION_UNAVAILABLE:
                    setStatusMessage("Location information is unavailable.");
                    break;
                case error.TIMEOUT:
                    setStatusMessage("The request to get user location timed out.");
                    break;
                default:
                    setStatusMessage("An unknown error occurred.");
                    break;
            }
        };

        if (!navigator.geolocation) {
            setStatusMessage('Geolocation is not supported by your browser.');
        } else {
            setStatusMessage('Fetching location...');
            navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
        }
    }, [petId, navigate]);

    return (
        <div className="text-center mt-20">
            <p>{statusMessage}</p>
        </div>
    );
}
