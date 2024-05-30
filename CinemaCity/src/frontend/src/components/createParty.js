import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import './createStyle.css';

function CreateParty() {
    const [film_name, setFilm_name] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [restrictions, setRestrictions] = useState('');
    const [goodies, setGoodies] = useState('');
    const [max_participants, setMax_participants] = useState('');
    const [dateAndTime, setDateAndTime] = useState(''); // State to store date and time
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [hostUser, setHostUser] = useState(null); // State to store host user details
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user details from backend based on the logged-in user's email
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get('http://localhost:8080/users/profile', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}` // Pass the JWT token for authentication
                    }
                });
                setHostUser(response.data); // Set the host user details from the response
            } catch (error) {
                console.error('Failed to fetch user details:', error);
                setError('Failed to fetch user details');
            }
        };

        fetchUserDetails();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!hostUser) {
            setError('Host user details are missing');
            return;
        }
        const party = {
            party_planer_name: hostUser.name,
            film_name,
            description,
            location,
            restrictions,
            goodies: goodies.split(',').map(item => item.trim()),
            max_participants: parseInt(max_participants),
            date: new Date(dateAndTime), // Convert date and time to a JavaScript Date object
            hostUser: { email: hostUser.email } // Include host user details
        };

        const formData = new FormData();
        formData.append('party', new Blob([JSON.stringify(party)], { type: 'application/json' }));
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await axios.post('http://localhost:8080/parties', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setSuccessMessage('Party created successfully!');
            setError('');
            console.log('Party created', JSON.stringify(response.data));
            navigate('/main-page');
        } catch (error) {
            if (error && error.response && error.response.data) {
                setError(error.response.data);
            } else {
                console.error('Party creation failed', error);
            }
        }
    };
    const handleSignOut = () => {
        // Clear the JWT from local storage
        localStorage.removeItem('token');
        // Navigate to the login page or any other page you desire
        navigate('/');
    };
    return (
        <div>
            <header
                style={{
                    backgroundColor: "#283548",
                    color: "#fff",
                    padding: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >
                <h1 style={{ margin: 0 }}>CinemaHome</h1>
                <div>
                    <Link to="/">
                        <button
                            onClick={handleSignOut}
                            style={{
                                backgroundColor: "#D9D9D9",
                                border: "none",
                                color: "black",
                                padding: "15px 32px",
                                textAlign: "center",
                                textDecoration: "none",
                                display: "inline-block",
                                fontSize: "16px",
                                margin: "4px 2px",
                                cursor: "pointer"
                            }}
                        >
                            Sign out
                        </button>
                    </Link>
                </div>
            </header>
            <div className="page">
                <div className='wrapper'>
                    <div className="form-box register">
                        <form onSubmit={handleSubmit}>
                            <h2>Create Party</h2>
                            {error && <p className="error-message">{error.message}</p>}
                            {successMessage && <p className="success-message">{successMessage}</p>}
                            <div className="form-row">
                                <div className="input-box">
                                    <input
                                        type="text"
                                        placeholder='Film name'
                                        required
                                        value={film_name}
                                        onChange={(e) => setFilm_name(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="input-box">
                                    <input
                                        type="text"
                                        placeholder="Description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>
                                <div className="input-box">
                                    <input
                                        type="text"
                                        placeholder="Location"
                                        required
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="input-box">
                                    <input
                                        type="text"
                                        placeholder="Restrictions"
                                        required
                                        value={restrictions}
                                        onChange={(e) => setRestrictions(e.target.value)}
                                    />
                                </div>
                                <div className="input-box">
                                    <input
                                        type="text"
                                        placeholder="Goodies"
                                        required
                                        value={goodies}
                                        onChange={(e) => setGoodies(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="input-box">
                                    <input
                                        type="number"
                                        placeholder="Max participants"
                                        required
                                        value={max_participants}
                                        onChange={(e) => setMax_participants(e.target.value)}
                                    />
                                </div>
                                <div className="input-box">
                                    <input
                                        type="datetime-local" // Input for selecting date and time
                                        placeholder="Date and Time"
                                        required
                                        value={dateAndTime}
                                        onChange={(e) => setDateAndTime(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="input-box">
                                    <input
                                        type="file"
                                        placeholder="upload images of home"
                                        className="file-input"
                                        onChange={(e) =>
                                            setImage(e.target.files[0])}
                                    />
                                </div>
                            </div>
                            <button type="submit">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateParty;