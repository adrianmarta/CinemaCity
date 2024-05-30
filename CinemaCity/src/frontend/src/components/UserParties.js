import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from 'react-modal';
import StarRatingComponent from 'react-star-rating-component';
import './Modal.css';

const UserParties = () => {
    const [parties, setParties] = useState([]);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [partyId, setCurrentPartyId] = useState(null);
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);
    const navigate = useNavigate();

    const email = localStorage.getItem('email'); // Assuming email is stored in localStorage

    useEffect(() => {
        fetchUserParties();
    }, []);

    const fetchUserParties = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/parties/user-parties/${email}`);
            setParties(response.data);
        } catch (error) {
            setError("Error fetching user parties");
            console.error("Error fetching user parties:", error);
        }
    };

    const handleSignOut = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const handleLeaveReview = async () => {
        try {
            await axios.post(`http://localhost:8080/review/${partyId}`, {
                review: reviewText,
                rating,
                reviewer: { email } // Send the reviewer email with the review object
            });
            fetchUserParties();
            closeModal();
        } catch (error) {
            console.error("Error leaving review:", error);
        }
    };

    const handleCancelParticipation = async (partyId) => {
        try {
            await axios.post(`http://localhost:8080/parties/cancel-participation/${partyId}`, { email });
            fetchUserParties();
        } catch (error) {
            console.error("Error canceling participation:", error);
        }
    };

    const openModal = (partyId) => {
        setCurrentPartyId(partyId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setReviewText('');
        setRating(0);
    };

    const onStarClick = (nextValue) => {
        setRating(nextValue);
    };

    if (error) {
        return <div>{error}</div>;
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
                </div>
            </header>
            <h2>Your Parties</h2>
            <div className="content">

                {parties.length === 0 ? (
                    <p>No parties joined yet.</p>
                ) : (
                    parties.map(party => (
                        <div key={party.objectId} className="party-card">
                            <h3>{party.party_planer_name}</h3>
                            <p>Film: {party.film_name}</p>
                            <p>Date: {new Date(party.date).toLocaleString()}</p>
                            <div className="actions">
                                {new Date(party.date) < new Date() ? (
                                    <button onClick={() => openModal(party.objectIdString)}>
                                        Leave a Review
                                    </button>
                                ) : (
                                    <button onClick={() => handleCancelParticipation(party.objectId)}>
                                        Not Coming Anymore
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Leave a Review"
                ariaHideApp={false}
                className="Modal"
                overlayClassName="Overlay"
            >
                <h2>Leave a Review</h2>
                <form onSubmit={handleLeaveReview}>
                    <div className="review-container">
                        <label>
                            Review:
                            <textarea
                                className="review-textarea"
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            Rating:
                            <div className="star-rating">
                                <StarRatingComponent
                                    name="rate1"
                                    starCount={5}
                                    value={rating}
                                    onStarClick={onStarClick}
                                />
                            </div>
                        </label>
                    </div>
                    <button type="submit" className="submit-btn">Submit Review</button>
                    <button type="button" onClick={closeModal} className="cancel-btn">Cancel</button>
                </form>
            </Modal>
        </div>
    );
};

export default UserParties;
