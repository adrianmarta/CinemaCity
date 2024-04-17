// src/components/SignUp.js
import React, { useState } from 'react';
import axios from 'axios';
import {FaEnvelope, FaLock, FaUser} from "react-icons/fa";
import {Link, useNavigate} from "react-router-dom";
import './style.css';


function CreateParty() {
    const [party_planer_name, setName] = useState('');
    const [film_name, setFilm_name] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [restrictions, setRestrictions] = useState('');
    const [goodies, setGoodies] = useState('');
    const [max_participants, setMax_participants] = useState('');
    //const [hostUser, setHostuser] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/parties', {
                partyPlanerName: party_planer_name,
                filmName: film_name,
                description: description,
                location: location,
                restrictions: restrictions,
                goodies: goodies.split(',').map(item => item.trim()), // Convert comma-separated string to an array
                maxParticipants: parseInt(max_participants), // Convert to integer
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


    return (
        <div>
            <header style={{ backgroundColor: '#283548', color: '#fff', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ margin: 0 }}>CinemaHome</h1>
            </header>
            <div className="page">
                <div className='wrapper'>
                    <div className="form-box register">
                        <form onSubmit={handleSubmit}>
                            <h2>Create party</h2>
                            {error && <p style={{ color: 'red' }}>{error.message}</p>}
                            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                            <div className="input-box">
                                <input type="text"
                                       placeholder='Name' required
                                       value={party_planer_name}
                                       onChange={(e) => setName(e.target.value)}
                                />
                                <FaUser className='icon'/>
                            </div>
                            <div className="input-box">
                                <input type="text"
                                       placeholder='Film name' required
                                       value={film_name}
                                       onChange={(e) => setFilm_name(e.target.value)}
                                />

                            </div>
                            <div className="input-box">
                                <input type="text"
                                placeholder="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                               />
                            </div>
                            <div className="input-box">
                                <input type="text"
                                       placeholder="location" required
                                       value={location}
                                       onChange={(e) => setLocation(e.target.value)}
                                />

                            </div>

                            <div className="input-box">
                                <input type="text"
                                       placeholder="restrictions" required
                                       value={restrictions}
                                       onChange={(e) => setRestrictions(e.target.value)}
                                />

                            </div>
                            <div className="input-box">
                                <input type="text"
                                       placeholder="goodies" required
                                       value={goodies}
                                       onChange={(e) => setGoodies(e.target.value)}
                                />

                            </div>
                            <div className="input-box">
                                <input type="number"
                                       placeholder="max participants" required
                                       value={max_participants}
                                       onChange={(e) => setMax_participants(e.target.value)}
                                />

                            </div>
                            <button type="submit">Create</button>



                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateParty;
