import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState, useCallback } from "react";
import axios from 'axios';
import './style.css';

const PartyDetails = () => {
    const [party, setParty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { partyId } = useParams();
    const navigate = useNavigate();

    const fetchPartyDetails = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:8080/parties/${partyId}`);
            setParty(response.data);
            setLoading(false);
        } catch (error) {
            setError("Error fetching party details");
            setLoading(false);
        }
    }, [partyId]);

    useEffect(() => {
        fetchPartyDetails();
    }, [fetchPartyDetails]);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    const handleSignOut = () => {
        // Clear the JWT from local storage
        localStorage.removeItem('token');
        // Navigate to the login page or any other page you desire
        navigate('/');
    };

    return (
        <div className="party-details">
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
            <div className="content">
                <div className="top-section">
                    {party.imageUrls && party.imageUrls.length > 0 ? (
                        party.imageUrls.map((image, index) => (
                            <img key={index} src={image} alt={`Party Image ${index + 1}`} />
                        ))
                    ) : (
                        <p>No images available</p>
                    )}
                </div>
                <div className="bottom-section">
                    <h2>{party.hostUser.name}'s party</h2>
                    <p>Film: {party.film_name}</p>
                    <p>Description: {party.description}</p>
                    <p>Location: {party.location}</p>
                    <p>Restrictions: {party.restrictions}</p>
                    <p>Joined people: {party.joined_participants ? `${party.joined_participants.length}/${party.max_participants}` : 'Loading...'}</p>
                </div>
            </div>
            <div className="actions">
                <Link to={`/join-party/${partyId}`}>
                    <button className="btn join">I'm in</button>
                </Link>
                <Link to="/main-page">
                    <button className="btn back">Back to Main Page</button>
                </Link>
            </div>
        </div>
    );
};

export default PartyDetails;
