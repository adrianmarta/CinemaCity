import React, { useState } from 'react';
import axios from 'axios';
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import styles from './signUp.module.css';
import { useAuth } from '../AuthContext';

function SignUp() {
    const [name, setUsername] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/users', {
                name,
                age,
                gender,
                email,
                password,
            });
            setSuccessMessage('User created successfully!');
            setError('');
            console.log('User created', JSON.stringify(response.data));

            // After successful user creation, automatically login the user
            const loginResponse = await axios.post('http://localhost:8080/users/login', {
                email,
                password,
            });
            const { jwt } = loginResponse.data;
            login(jwt, email);
            navigate('/main-page'); // Navigate after successful login
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data);
            } else {
                console.error('User creation failed', error);
                setError('User creation failed');
            }
        }
    };

    return (
        <div>
            <header className={styles.header}>
                <h1>CinemaHome</h1>
            </header>
            <   div className={styles.container}>
                <div className={styles.page}>
                    <div className={styles.wrapper}>
                        <div className={styles['form-box']}>
                            <form onSubmit={handleSubmit}>
                                <h2 className="sign-up">Sign Up</h2>
                                {error && <p style={{ color: 'red' }}>{error.message}</p>}
                                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                                <div className={styles['input-box']}>
                                    <input type="text"
                                           placeholder='Name' required
                                           value={name}
                                           onChange={(e) => setUsername(e.target.value)}
                                    />
                                    <FaUser className={styles.icon}/>
                                </div>
                                <div className={styles['input-box']}>
                                    <input type="number"
                                           placeholder='Age' required
                                           value={age}
                                           onChange={(e) => setAge(e.target.value)}
                                    />
                                </div>
                                <div className={styles['input-box']}>
                                    <select
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                        required
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className={styles['input-box']}>
                                    <input type="text"
                                           placeholder='Email' required
                                           value={email}
                                           onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <FaEnvelope className={styles.icon}/>
                                </div>
                                <div className={styles['input-box']}>
                                    <input type="password"
                                           placeholder='Password' required
                                           value={password}
                                           onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <FaLock className={styles.icon}/>
                                </div>
                                <button type="submit">Sign Up</button>
                                <div className={styles['register-link']}>
                                    <p>Already have an account? <Link to="/login">Log in</Link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default SignUp;
