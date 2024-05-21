import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState, useCallback } from "react";
import axios from 'axios';
import './style.css';

const PartyDetails = () => {
    const [party, setParty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { partyId } = useParams();

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
                <h2>{party.hostUser.name}'s {party.party_planer_name} party</h2>
                <p>Film: {party.film_name}</p>
                <p>Description: {party.description}</p>
                <p>Location: {party.location}</p>
                <p>Restrictions: {party.restrictions}</p>
                <p>Joined people: {party.joined_participants ? `${party.joined_participants.length}/${party.max_participants}` : 'Loading...'}</p>
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
