import React, { useState } from 'react';
import { signupFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import { useNavigate } from 'react-router-dom';
import { signup, sendVerificationCode } from '../Api';
import MobileInputWithButton from './MobileInputWithButton';
import { transformEmptyStringsToNull } from '../utils/transformInput';

const fields = signupFields;
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');

export default function Signup() {
    const navigate = useNavigate();
    const [signupState, setSignupState] = useState(fieldsState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const validateFields = () => {
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
        } else if (!signupState.mobile) {
            return "Mobile number is required.";
        } else if (!/^\+9955\d{2}(\s?\d{3}\s?\d{3}|\s?\d{2}\s?\d{2}\s?\d{2})$/.test(signupState.mobile)) {
            return "Mobile number is invalid. Please use the format +9955XXXXXXXX.";
        }
        return null;
    };

    const handleChange = (e) => {
        setSignupState({ ...signupState, [e.target.id]: e.target.value });
    };

    const handleMobileChange = (mobileNumber) => {
        setSignupState({ ...signupState, mobile: mobileNumber });
    };

    const handleSendCode = async (mobile) => {
        setLoading(true);
        try {
            await sendVerificationCode({ mobile });
            alert('Verification code sent! Please check your messages.');
            setLoading(false);
        } catch (error) {
            console.error('Error sending verification code:', error);
            setError('Failed to send verification code. Please try again.');
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const transformedState = transformEmptyStringsToNull(signupState);
        const validationError = validateFields();
        if (validationError) {
            setError(validationError);
            return;
        }
    
        setLoading(true);
        setError('');
    
        try {
            const data = await signup(signupState);
            localStorage.setItem('token', data.token);
            setSignupState(fieldsState);
            navigate('/home');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <form className="mt-8 gap-y-6" onSubmit={handleSubmit}>
            <div className="-gap-y-px gap-y-2">
                {fields.map(field => {
                        if(field.id == 'mobile') {
                            return <MobileInputWithButton key={field.id} onSendCode={handleSendCode} onMobileChange={handleMobileChange}/>;
                        }else{
                            return <Input
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
                        }
                    }
                    
                )}
            </div>

            {error && <div className="text-red-600">{error}</div>}
            {loading && <div>Loading...</div>}

            <FormExtra />
            <FormAction text="Sign Up" /> {/* Update button text to "Sign Up" */}
        </form>
    );
}
