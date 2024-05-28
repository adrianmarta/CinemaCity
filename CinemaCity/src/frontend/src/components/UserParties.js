import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './style.css';

const UserParties = () => {
    const [parties, setParties] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const email = localStorage.getItem('email'); // Assuming userId is stored in localStorage

    useEffect(() => {
        fetchUserParties();
    }, []);

    const fetchUserParties = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/parties/user-parties/${email}`);
            setParties(response.data);
        } catch (error) {
            setError("Error fetching user parties");
            console.error("Error fetching user parties:", error);
        }
    };

    const handleSignOut = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const handleLeaveReview = async (partyId, review) => {
        try {
            await axios.post(`http://localhost:8080/parties/leave-review/${partyId}`, { review });
            fetchUserParties();
        } catch (error) {
            console.error("Error leaving review:", error);
        }
    };

    const handleCancelParticipation = async (partyId) => {
        try {
            await axios.post(`http://localhost:8080/parties/cancel-participation/${partyId}`, { email: localStorage.getItem('email') });
            fetchUserParties();

        } catch (error) {
            console.error("Error canceling participation:", error);
        }
    };

    if (error) {
        return <div>{error}</div>;
    }

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
                </div>
            </header>
            <div className="content">
                <h2>Your Parties</h2>
                {parties.length === 0 ? (
                    <p>No parties joined yet.</p>
                ) : (
                    parties.map(party => (
                        <div key={party.objectId} className="party-card">
                            <h3>{party.party_planer_name}</h3>
                            <p>Film: {party.film_name}</p>
                            <p>Date: {new Date(party.date).toLocaleString()}</p>
                            <div className="actions">
                                {new Date(party.date) < new Date() ? (
                                    <button onClick={() => handleLeaveReview(party.objectId, prompt('Leave a review:'))}>
                                        Leave a Review
                                    </button>
                                ) : (
                                    <Link to="/main-page">
                                        <button onClick={() => handleCancelParticipation(party.objectId)}>
                                            Not Coming Anymore
                                        </button>
                                    </Link>

                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default UserParties;
