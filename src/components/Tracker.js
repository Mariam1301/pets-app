import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { fetchPetLocations } from '../Api';

const Tracker = () => {
    const { id } = useParams();
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const data = await fetchPetLocations(id);
                setLocations(data.locations); 
            } catch (error) {
                console.error("Failed to load locations:", error);
            }
        };

        fetchLocations();
    }, [id]);

    return (
        <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "100vh", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {locations.map(location => (
                <Marker key={location.id} position={[location.latitude, location.longitude]} />
            ))}
        </MapContainer>
    );
};

export default Tracker;
