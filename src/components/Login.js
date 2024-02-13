import React, { useState } from 'react';
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import { useNavigate } from 'react-router-dom';
import { login } from '../Api';

const fields = loginFields;
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');

export default function Login() {
    const navigate = useNavigate();
    const [loginState, setLoginState] = useState(fieldsState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const validateFields = () => {
        if (!loginState.email) {
            return "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(loginState.email)) {
            return "Email address is invalid.";
        } else if (loginState.email.length > 255) {
            return "Email address is too long.";
        } else if (!loginState.password) {
            return "Password is required.";
        } else if (loginState.password.length < 8) {
            return "Password must be at least 8 characters long.";
        }
        return null;
    };

    const handleChange = (e) => {
        setLoginState({ ...loginState, [e.target.id]: e.target.value });
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
            const data = await login(loginState);
            localStorage.setItem('token', data.token);
            setLoginState(fieldsState);
            navigate('/home');
        } catch (error) {
            setError(error.message);
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
                        value={loginState[field.id]}
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
            <FormAction text="Login" />
        </form>
    );
}
