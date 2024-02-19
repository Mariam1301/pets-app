import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserDetails, updateUserDetails } from '../Api';
import { userSettingsFields } from '../constants/formFields';
import Input from '../components/Input';
import HomeHeader from '../components/HomeHeader';

const UserSettingsPage = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        name: '',
        mobile: '',
        comment: ''
    });

    useEffect(() => {
        const populateUserData = async () => {
            try {
                const userDetails = await fetchUserDetails();
                const updatedUserData = userSettingsFields.reduce((acc, field) => {
                    acc[field.name] = userDetails[field.name] !== null ? userDetails[field.name] : '';
                    return acc;
                }, {});
                setUserData(updatedUserData);
            } catch (error) {
                console.error("Failed to fetch user details:", error);
            }
        };
    
        populateUserData();
    }, []);

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUserDetails(userData);
            navigate('/home');
        } catch (error) {
            console.log(error)
        }
    };

    const handleClick = () => {
        navigate('/home');
    }

    return (
        <>
            <HomeHeader />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <form onSubmit={handleSubmit} className="space-y-4" style={{ width: '100%', maxWidth: '400px' }}>
                    {userSettingsFields.map(field => (
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={userData[field.name]}
                            {...field}
                        />
                    ))}
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                            Update Details
                        </button>
                        <button onClick={handleClick} className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </>

    );
};

export default UserSettingsPage;
