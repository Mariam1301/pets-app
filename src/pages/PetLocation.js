import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { submitPetLocation, fetchPetOwnerDetails } from '../Api';
import OwnerDetailsCard from '../components/OwnerDetailsCard';

export default function PetLocation() {
    const { petId } = useParams();
    const [statusMessage, setStatusMessage] = useState('');
    const [ownerDetails, setOwnerDetails] = useState(null);
    const [alertShown, setAlertShown] = useState(false);

    useEffect(() => {
        const handleSuccess = async (position) => {
            const latitude = position.coords.latitude.toString();
            const longitude = position.coords.longitude.toString();
        
            try {
                await submitPetLocation(petId, { latitude, longitude });
                if (!alertShown) {
                    alert('Location submitted successfully. Thank you!');
                    setAlertShown(true);
                }
                const fetchedOwnerDetails = await fetchPetOwnerDetails(petId);
                console.log(fetchedOwnerDetails);
                setOwnerDetails(fetchedOwnerDetails);
                setStatusMessage('');
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
    }, [petId]);

    return (
        <div className="text-center mt-20">
            {statusMessage && <p>{statusMessage}</p>}
            {ownerDetails && <OwnerDetailsCard ownerDetails={ownerDetails} />}
        </div>
    );
}
