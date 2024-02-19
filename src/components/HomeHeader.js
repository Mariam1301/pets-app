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
                <h1 className="text-lg"></h1>
                <div className="flex items-center">
                    <button onClick={handleUserSettings} className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                        <span>User Settings</span>
                        <UserIcon className="w-4 h-4" /> 
                    </button>
                    <button onClick={handleLogout} className="flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">
                        <span>Log Out</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default HomeHeader;
