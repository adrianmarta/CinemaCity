import React, { useState } from "react";
import './style.css';
import { FaUser, FaLock } from "react-icons/fa";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom"; // Import useNavigate for navigation

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/users/login', {
                email,
                password,
            });
            console.log('Login successful', response.data);
            navigate('/main-page');
        } catch (error) {
            console.error('Login failed', error.response.data);
            setError(error.response.data);
        }
    };

    return (
        <div>
            <header style={{ backgroundColor: '#283548', color: '#fff', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ margin: 0 }}>CinemaHome</h1>
            </header>
            <div className="page">
                <div className='wrapper'>
                    <div className="form-box login">
                        <form onSubmit={handleSubmit}>
                            <h2>Login</h2>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            <div className="input-box">
                                <input type="text"
                                       placeholder='email' required
                                       value={email}
                                       onChange={(e) => setEmail(e.target.value)}
                                />
                                <FaUser className='icon'/>
                            </div>
                            <div className="input-box">
                                <input type="password"
                                       placeholder='password' required
                                       value={password}
                                       onChange={(e) => setPassword(e.target.value)}
                                />
                                <FaLock className='icon'/>
                            </div>
                            <div className="remember-forgot">
                                <label>
                                    <input type="checkbox" />Remember me
                                </label>
                                <a href="#">Forgot Password</a>
                            </div>

                            <button type="submit">Login</button>


                            <div className="register-link">
                                <p>Don't have an account? <a href="/signup">Sign Up</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
