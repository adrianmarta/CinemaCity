import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './style.css';

const MainPage = () => {
    const [parties, setParties] = useState([]);

    useEffect(() => {
        fetchParties();
    }, []);

    const fetchParties = async () => {
        try {
            const response = await axios.get("http://localhost:8080/parties"); // Assuming your backend server is running on the same host
            setParties(response.data);
        } catch (error) {
            console.error("Error fetching parties:", error);
        }
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
                    <div className="wrapper-listing"
                        key={party.objectId}
                        style={{
                            border: "1px solid #ccc",
                            padding: "20px",
                            borderRadius: "5px",
                            boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)"
                        }}
                    >
                        <h2>{party.film_name}</h2>
                        <p>{party.description}</p>
                        <p>{party.location}</p>
                        <p>{party.party_planer_name}</p>
                        <p>{party.reviews}</p>
                        {/* Add more party details here */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MainPage;
