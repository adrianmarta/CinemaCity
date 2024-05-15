import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import './style.css';

const MainPage = () => {
    const [parties, setParties] = useState([]);
    const [objectIdString, setObjectIdString] = useState(''); // Stocăm partyId ca și șir de caractere
    const { partyId } = useParams(); // Adăugăm useParams pentru a obține partyId din URL

    useEffect(() => {
        fetchParties();
        if (partyId) {
            setObjectIdString(partyId.toString());
        }
    }, [partyId]);

    const fetchParties = async () => {
        try {
            const response = await axios.get("http://localhost:8080/parties");
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
                    <div
                        key={party.objectId.toString()}
                        className="wrapper-listing"
                        style={{
                            border: "1px solid #ccc",
                            padding: "20px",
                            borderRadius: "5px",
                            boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)"
                        }}
                    >
                        <h2>{party.party_planer_name}</h2>
                        <p>{party.film_name}</p>
                        <p>{party.description}</p>
                        <p>{party.location}</p>
                        <p>{party.restrictions}</p>
                        <p>{party.reviews}</p>
                        {/* Add more party details here */}
                        <Link to={objectIdString ? `/party-details/${objectIdString}` : "/"}> {/* Verificare pentru objectIdString */}
                            <button className="btn">View Details</button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MainPage;
