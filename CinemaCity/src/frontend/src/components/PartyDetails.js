import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import './style.css';
const PartyDetails=()=>
{
    const { partyId } = useParams();
    const [partyDetails, setPartyDetails] = useState(null);
    useEffect(() => {
        fetchPartyDetails();
    }, [partyId]);

    const fetchPartyDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/parties/${partyId}`);
            setPartyDetails(response.data);
        } catch (error) {
            console.error("Error fetching party details:", error);
        }
    };
    if (!partyDetails) {
        return <div>Loading...</div>;
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
            <div className="party-details-container">
                <h2>{partyDetails.party_planer_name}</h2>
                <div className="party-details">
                    <p><strong>Film Name:</strong> {partyDetails.film_name}</p>
                    <p><strong>Description:</strong> {partyDetails.description}</p>
                    <p><strong>Location:</strong> {partyDetails.location}</p>
                    <p><strong>Restrictions:</strong> {partyDetails.restrictions}</p>
                    <p><strong>Reviews:</strong> {partyDetails.reviews}</p>
                    {/* Add more party details here */}
                </div>
            </div>
        </div>
    );
};
export default PartyDetails;