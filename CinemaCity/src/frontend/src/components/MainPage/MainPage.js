import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './style.css';

const MainPage = () => {
    const [parties, setParties] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchParties();
    }, []);

    const fetchParties = async () => {
        try {
            const response = await axios.get("http://localhost:8080/parties");
            console.log("Response from server:", response.data);
            setParties(response.data);
        } catch (error) {
            console.error("Error fetching parties:", error);
        }
    };

    const handleSignOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email')
        navigate('/');
    };

    const convertBlobToBase64 = (blob) => {
        return `data:image/jpeg;base64,${blob}`;
    };

    const formatDateTime = (dateString) => {
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        };
        return new Date(dateString).toLocaleString('en-US', options);
    };

    return (
        <div>
            <header>
                <h1>CinemaHome</h1>
                <div style={{ display: "flex", gap: "10px" }}>
                    <button onClick={handleSignOut}>
                        Sign out
                    </button>
                    <Link to="/parties">
                        <button>
                            Create Party
                        </button>
                    </Link>
                    <Link to="/user-parties">
                        <button>
                            My Parties
                        </button>
                    </Link>
                </div>
            </header>
            <div className="grid-container">
                {parties.map(party => (
                    <div key={party.objectId} className="wrapper-listing">
                        <div className="image-gallery">
                            {party.images && party.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={convertBlobToBase64(image)}
                                    alt={party.party_planer_name}
                                />
                            ))}
                        </div>
                        <div className="details">
                            <h2>{party.film_name}</h2>
                            <p>{party.party_planer_name}</p>
                            <p>{party.description}</p>
                            <p>{party.location}</p>
                            <p>{party.restrictions}</p>
                            <p>{party.reviews}</p>
                            <p>{formatDateTime(party.date)}</p>
                            <Link to={party.objectIdString ? `/party-details/${party.objectIdString}` : "/main-page"}>
                                <button className="btn">View Details</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MainPage;
