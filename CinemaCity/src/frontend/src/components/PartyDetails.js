import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from 'axios';

const PartyDetails=()=> {
    const [party, setParty] = useState(null);
    const [objectIdString, setObjectIdString] = useState('');
    const { partyId } = useParams(); // Obține parametrul partyId din URL

    useEffect(() => {
        fetchPartyDetails();
        setObjectIdString(partyId.toString()); // Convert the partyId to a string and store it in objectIdString
    }, [partyId]);

    const fetchPartyDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/parties/${partyId}`);
            setParty(response.data);
        } catch (error) {
            console.error("Error fetching party details:", error);
        }
    };

    if (!party) {
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
            <div
                style={{
                    padding: "20px"
                }}
            >
                <h2>{party.hostUser.name}'s {party.party_planer_name} party</h2>
                <p>Film: {party.film_name}</p>
                <p>Description: {party.description}</p>
                <p>Location: {party.location}</p>
                <p>Restrictions: {party.restrictions}</p>
                <p>Joined people: {party.joined_participants ? `${party.joined_participants.length}/${party.max_participants}` : 'Loading...'} </p>

                {/* Add more party details here */}
            </div>
            <Link to={`/join-party/${objectIdString}`}>
                <button className="btn">I'm in</button>
            </Link>
            <Link to="/main-page">
                <button className="btn">Back to Main Page</button></Link>
        </div>
    );
};
export default PartyDetails;