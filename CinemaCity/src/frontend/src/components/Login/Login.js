import React, { useState, useEffect } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../AuthContext'; // Import useAuth from AuthContext
import styles from './login.module.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth(); // Use the login function from AuthContext

    useEffect(() => {
        // Setup interceptor on component mount
        const interceptor = axios.interceptors.request.use(
            config => {
                const token = localStorage.getItem('token');
                if (token) {
                    config.headers['Authorization'] = 'Bearer ' + token;
                }
                return config;
            },
            error => {
                return Promise.reject(error);
            }
        );

        // Remove interceptor on component unmount
        return () => {
            axios.interceptors.request.eject(interceptor);
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/users/login', {
                email,
                password,
            });
            const { jwt } = response.data; // Extract the JWT from the response
            login(jwt, email); // Use the login function from AuthContext
            console.log('Login successful', response.data);
            navigate('/main-page');
        } catch (error) {
            console.error('Login failed', error.response.data);
            setError(error.response.data);
            logout();
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        navigate('/login');
    };

    return (
        <div>
            <header className={styles.header}>
                <h1>CinemaHome</h1>
            </header>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.formBox}>
                        <form onSubmit={handleSubmit}>
                            <h2>Login</h2>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            <div className={styles.inputBox}>
                                <input
                                    type="text"
                                    placeholder='Email'
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <FaUser className={styles.icon} />
                            </div>
                            <div className={styles.inputBox}>
                                <input
                                    type="password"
                                    placeholder='Password'
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <FaLock className={styles.icon} />
                            </div>



                            <button type="submit">Login</button>
                            <div className={styles.registerLink}>
                                <p>Don't have an account? <Link to="/signin">Sign Up</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
