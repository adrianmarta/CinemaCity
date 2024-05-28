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
        navigate('/');
    };

    const convertBlobToBase64 = (blob) => {
        return `data:image/jpeg;base64,${blob}`;
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
                <div style={{ display: "flex", gap: "10px" }}>
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
                    <Link to="/parties">
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
                            Create Party
                        </button>
                    </Link>
                    <Link to="/user-parties">
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
                            My Parties
                        </button>
                    </Link>
                </div>
            </header>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                    gap: "20px",
                    padding: "20px"
                }}
            >
                {parties.map(party => (
                    <div
                        key={party.objectId}
                        className="wrapper-listing"
                        style={{
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                            boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                            overflow: "hidden",
                            display: "flex",
                            flexDirection: "column"
                        }}
                    >
                        <div style={{ flex: 1 }}>
                            {/* Image gallery section */}
                            <div style={{ display: "flex", overflowX: "auto" }}>
                                {party.images && party.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={convertBlobToBase64(image)}
                                        alt={party.party_planer_name}
                                        style={{ width: "auto", height: "150px", marginRight: "10px" }}
                                    />
                                ))}
                            </div>
                        </div>
                        <div style={{ padding: "20px" }}>
                            {/* Party details section */}
                            <h2>{party.film_name}</h2>
                            <p>{party.party_planer_name}</p>
                            <p>{party.description}</p>
                            <p>{party.location}</p>
                            <p>{party.restrictions}</p>
                            <p>{party.reviews}</p>
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
