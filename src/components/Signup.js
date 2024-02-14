import React, { useState } from 'react';
import { signupFields } from "../constants/formFields"; // Assume this is defined similarly to loginFields but for signup
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import { useNavigate } from 'react-router-dom';
import { signup } from '../Api'; // Assuming you have a signup function in your API similar to login

const fields = signupFields; // Use signup specific fields
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');

export default function Signup() {
    const navigate = useNavigate();
    const [signupState, setSignupState] = useState(fieldsState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const validateFields = () => {
        // Add or modify validation rules specific to signup, e.g., confirm password
        if (!signupState.email) {
            return "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(signupState.email)) {
            return "Email address is invalid.";
        } else if (signupState.email.length > 255) {
            return "Email address is too long.";
        } else if (!signupState.password) {
            return "Password is required.";
        } else if (signupState.password.length < 8) {
            return "Password must be at least 8 characters long.";
        } else if (signupState.password !== signupState.password_confirmation) {
            return "Passwords do not match.";
        }
        return null;
    };

    const handleChange = (e) => {
        setSignupState({ ...signupState, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationError = validateFields();
        if (validationError) {
            setError(validationError);
            return;
        }
    
        setLoading(true);
        setError('');
    
        try {
            const data = await signup(signupState); // Call the signup API
            localStorage.setItem('token', data.token); // Assuming the signup API also returns a token
            setSignupState(fieldsState); // Reset form state
            navigate('/home'); // Redirect on success
        } catch (error) {
            setError(error.message); // Handle signup errors
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="-space-y-px">
                {fields.map(field =>
                    <Input
                        key={field.id}
                        handleChange={handleChange}
                        value={signupState[field.id]}
                        labelText={field.labelText}
                        labelFor={field.labelFor}
                        id={field.id}
                        name={field.name}
                        type={field.type}
                        isRequired={field.isRequired}
                        placeholder={field.placeholder}
                    />
                )}
            </div>

            {error && <div className="text-red-600">{error}</div>}
            {loading && <div>Loading...</div>}

            <FormExtra />
            <FormAction text="Sign Up" /> {/* Update button text to "Sign Up" */}
        </form>
    );
}
