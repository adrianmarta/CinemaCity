import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import './style.css'; // Assuming you have a CSS file for styles

const JoinParty = () => {}
   /* const [party, setParty] = useState(null);
    const [objectIdString, setObjectIdString] = useState('');
    const [newGoodie, setNewGoodie] = useState('');
    const [error, setError] = useState(null); // State for handling errors
    const { partyId } = useParams(); // Get the partyId from the URL

    useEffect(() => {
        fetchPartyDetails();
        setObjectIdString(partyId.toString());
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



    const handleJoinParty = async () => {
        try {
            const joinRequest = { email: userEmail, goodie: newGoodie };
            await axios.post(`http://localhost:8080/parties/join_party/${partyId}`, joinRequest);
            fetchPartyDetails(); // Refresh party details
            //fetchGoodies(); // Refresh goodies
            setNewGoodie(''); // Clear the input field
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

    return (
        <div>
            <header className="header">
                <h1>CinemaHome</h1>
                <div>
                    <Link to="/">
                        <button className="sign-out-btn">
                            Sign out
                        </button>
                    </Link>
                </div>
            </header>
            <div className="content">
                <h2>{party.hostUser.name}'s {party.party_planer_name} party</h2>
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
                />
                <button onClick={handleJoinParty}>Join Party</button>
                <Link to={`/party-details/${objectIdString}`}>
                    <button className="btn">Back to party-details</button>
                </Link>
            </div>
        </div>
    );
};

    */

export default JoinParty;
