import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserDetails, updateUserDetails } from '../Api';
import { userSettingsFields } from '../constants/formFields';
import Input from '../components/Input';

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

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {userSettingsFields.map(field => (
                <Input
                    key={field.id}
                    handleChange={handleChange}
                    value={userData[field.name]}
                    {...field}
                />
            ))}
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Update Details
            </button>
        </form>
    );
};

export default UserSettingsPage;