import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import styles from './joinParty.module.css';

const JoinParty = () => {
    const [party, setParty] = useState(null);
    const [newGoodie, setNewGoodie] = useState('');
    const [error, setError] = useState(null); // State for handling errors
    const { partyId } = useParams(); // Get the partyId from the URL
    const [userEmail, setUserEmail] = useState(''); // State to store user email
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        fetchPartyDetails();
        fetchUserProfile();
    }, [partyId]);

    const fetchPartyDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/parties/${partyId}`);
            setParty(response.data);
        } catch (error) {
            setError("Error fetching party details.");
            console.error("Error fetching party details:", error);
        }
    };

    const fetchUserProfile = async () => {
        try {
            const response = await axios.get('http://localhost:8080/users/profile', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}` // Pass the JWT token for authentication
                }
            });
            setUserEmail(response.data.email); // Set the user email from the response
        } catch (error) {
            setError("Error fetching user profile.");
            console.error("Error fetching user profile:", error);
        }
    };

    const handleJoinParty = async () => {
        try {
            const joinRequest = { email: userEmail, goodie: newGoodie };
            await axios.post(`http://localhost:8080/parties/join_party/${partyId}`, joinRequest, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}` // Include the JWT token
                }
            });
            fetchPartyDetails(); // Refresh party details
            setNewGoodie(''); // Clear the input field
            navigate(`/party-details/${partyId}`); // Redirect to party details page
        } catch (error) {
            console.error("Error joining party:", error);
        }
    };

    if (error) {
        return <div>{error}</div>; // Display error message if there's an error
    }

    if (!party) {
        return <div>Loading...</div>; // Display loading message while fetching data
    }
    const handleSignOut = () => {
        // Clear the JWT from local storage
        localStorage.removeItem('token');
        // Navigate to the login page or any other page you desire
        navigate('/');
    };
    return (
        <div>
            <header className={styles.header1}>
                <h1>CinemaHome</h1>
                <div>
                    <Link to="/">
                        <button
                            onClick={handleSignOut}
                            className={styles["sign-out-btn"]}>
                            Sign out
                        </button>
                    </Link>
                </div>
            </header>
            <div className={styles.container}>
                <div className={styles["content-container"]}>

                    <div className={styles.content1}>
                        <h2>{party.hostUser.name}'s party</h2>
                        <p>Film: {party.film_name}</p>
                        <p>Remaining seats: {party.joined_participants ? `${party.max_participants - party.joined_participants.length}/${party.max_participants}` : 'Loading...'}</p>
                        <p>Participants joined: {party.joined_participants.length}</p>
                        <h3>Goodies:</h3>
                        <ul>
                            {party.goodies && party.goodies.map((goodie, index) => (
                                <li key={index}>{goodie}</li>
                            ))}
                        </ul>
                        <input
                            type="text"
                            value={newGoodie}
                            onChange={(e) => setNewGoodie(e.target.value)}
                            placeholder="Add a goodie"
                            className={styles["input-text"]}
                        />
                        <button onClick={handleJoinParty} className={styles["join-party-btn"]}>Join Party</button>
                        <Link to={`/party-details/${party.objectIdString}`}>
                            <button className={styles.btn}>Back to party-details</button>
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default JoinParty;
