import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/register', { username, email, password, gender });
            const token = response.data.token;
            // Handle successful registration (e.g., redirect to login)
        } catch (error) {
            console.error(error);
            // Handle registration errors (e.g., email format, password strength)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* ... username, email, password, gender fields and submit button */}
        </form>
    );
};

export default RegistrationForm;
