// src/components/SignUp.js
import React, { useState } from 'react';
import axios from 'axios';

function SignUp() {
    const [username, setUsername] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/users', {
                username,
                age,
                gender,
                email,
                password,
            });
            console.log('User created', response.data);
            // Redirect or perform actions after successful sign up
        } catch (error) {
            console.error('User creation failed', error);
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUp;
