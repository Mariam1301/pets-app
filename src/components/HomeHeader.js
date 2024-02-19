import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as UserIcon } from '../icons/settings.svg';

const HomeHeader = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleUserSettings = () => {
        navigate('/user-settings');
    };

    return (
        <header className="bg-blue-500 text-white p-4">
            <nav className="container mx-auto flex justify-between items-center">
                <h1 className="text-lg">Pet Tracker</h1>
                <div className="flex items-center">
                    {/* Adjusted button with fixed width and SVG icon */}
                    <button onClick={handleUserSettings} className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                        <UserIcon className="w-4 h-4" /> {/* Adjust SVG size as needed */}
                        <span>User Settings</span>
                    </button>
                    {/* Log Out Button with same styling */}
                    <button onClick={handleLogout} className="flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">
                        <span>Log Out</span>
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default HomeHeader;
