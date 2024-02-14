import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { fetchPetLocations } from '../Api';
import Modal from './Modal';
import markerIconUrl from '../icons/pngwing.com.png';

const customMarkerIcon = new L.Icon({
    iconUrl: markerIconUrl,
    iconSize: [35, 46], // size of the icon
    iconAnchor: [17, 46], // point of the icon which will correspond to marker's location
});

function SetViewOnClick({ coords }) {
  const map = useMap();
  map.setView(coords, map.getZoom());

  return null;
}

const Tracker = () => {
    const { id } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [locations, setLocations] = useState([]);
    const mapRef = useRef();

    const handleMarkerClick = (location) => {
        console.log(location)
        setSelectedLocation(location);
        setIsModalOpen(true);
    };

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const data = await fetchPetLocations(id);
                setLocations(data);
                if (data.length > 0) {
                  mapRef.current.flyTo([data[0].latitude, data[0].longitude], 13, {
                    animate: true,
                  });
                }
            } catch (error) {
                console.error("Failed to load locations:", error);
            }
        };

        fetchLocations();
    }, [id]);

   return (
        <>
            <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "100vh", width: "100%" }} ref={mapRef}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {locations.map((location, index) => (
                    <Marker key={index} position={[location.latitude, location.longitude]} icon={customMarkerIcon}
                        eventHandlers={{
                            click: () => handleMarkerClick(location),
                        }}
                    />
                ))}
                {/* ... other code */}
            </MapContainer>
            {selectedLocation && (
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <div>Date: {selectedLocation.created_at}</div> {/* Render additional location details as needed */}
                </Modal>
            )}
        </>
    );
};

export default Tracker;
