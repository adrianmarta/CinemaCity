import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState, useCallback } from "react";
import axios from 'axios';
import StarRatingComponent from 'react-star-rating-component';
import './partyDetails.css';

const PartyDetails = () => {
    const [party, setParty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reviews, setReviews] = useState([]);
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

    const fetchReviews = useCallback(async (email) => {
        try {
            const response = await axios.get(`http://localhost:8080/review/user/${email}`);
            setReviews(response.data);
        } catch (error) {
            console.error("Error fetching reviews", error);
        }
    }, []);

    useEffect(() => {
        fetchPartyDetails();
    }, [fetchPartyDetails]);

    useEffect(() => {
        if (party && party.hostUser) {
            fetchReviews(party.hostUser.email);
        }
    }, [party, fetchReviews]);

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

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    const handleSignOut = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div className="party-details-container">
            <header className="header">
                <h1 style={{ margin: 0 }}>CinemaHome</h1>
                <div className="button-group">
                    <Link to="/main-page" className="home-button">Home</Link>
                    <button onClick={handleSignOut} className="signout">Sign out</button>
                </div>
            </header>

            <div className="content">
                <div className="left-section">
                    <div className="section-background">
                        <div className="top-section">
                            {party.images && party.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={convertBlobToBase64(image)}
                                    alt={party.party_planer_name}
                                    style={{ width: "auto", height: "150px", marginRight: "10px" }}
                                />
                            ))}
                        </div>
                        <div className="bottom-section">
                            <h2 className="party-planer-name">{party.party_planer_name}'s party</h2>
                            {/* Other party details */}
                        </div>

                        <p>Film: {party.film_name}</p>
                        <p>Description: {party.description}</p>
                        <p>Location: {party.location}</p>
                        <p>Restrictions: {party.restrictions}</p>
                        <p>Date: {formatDateTime(party.date)}</p>
                        <p>Joined people: {party.joined_participants ? `${party.joined_participants.length}/${party.max_participants}` : 'Loading...'}</p>

                    </div>
                </div>
                <div className="right-section">
                    <div className="section-background">
                        <div className="reviews-section">
                            <h3>Host User Reviews</h3>
                            {reviews.length === 0 ? (
                                <p>No reviews yet.</p>
                            ) : (
                                reviews.map((review, index) => (
                                    <div key={index} className="review-card">
                                        <div>
                                            <strong>Rating:</strong>
                                            <StarRatingComponent
                                                name={`rating-${index}`}
                                                starCount={5}
                                                value={review.rating}
                                                editing={false}
                                            />
                                        </div>
                                        <p><strong>Review:</strong> {review.review}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="actions">
                <div className="button-group">
                    <Link to={`/join-party/${partyId}`}>
                        <button className="btn join">I'm in</button>
                    </Link>
                    <Link to="/main-page">
                        <button className="btn back">Back to Main Page</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PartyDetails;
