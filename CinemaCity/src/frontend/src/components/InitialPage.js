import React from 'react';
import {Link} from "react-router-dom";

const InitialPage = () => {
    return (
        <>
            <header style={{ backgroundColor: '#283548', color: '#fff',zIndex: 999, padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ margin: 0 }}>CinemaHome</h1>
                <div>
                    <Link to="/signin">
                        <button style={{ backgroundColor: '#D9D9D9', border: 'none', color: 'black', padding: '15px 32px', textAlign: 'center', textDecoration: 'none', display: 'inline-block', fontSize: '16px', margin: '4px 2px', cursor: 'pointer' }}>Sign In</button>
                    </Link>
                    <Link to="/login">
                        <button style={{ backgroundColor: '#D9D9D9', border: 'none', color: 'black', padding: '15px 32px', textAlign: 'center', textDecoration: 'none', display: 'inline-block', fontSize: '16px', margin: '4px 2px', cursor: 'pointer' }}>Log In</button>
                    </Link>
                </div>
            </header>
            <div style={{ paddingTop: '100px' }}> {/* Add padding to the top of content to prevent overlap */}
                <img style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', zIndex: '-1', objectFit: 'cover' }} src="https://blog.zegocloud.com/wp-content/uploads/2023/05/watch-movies-together-online.jpg" alt="Full page background image" />
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    right: '10px',
                    transform: 'translateY(-50%)',
                    backgroundColor: 'rgba(0, 0, 0, 0.0)', // Transparent background
                    color: '#fff',
                    padding: '10px',
                    boxSizing: 'border-box',
                    textAlign: 'left',
                }}>
                    <h2 style={{ margin: '5px 0' }}>Watch movies</h2>
                    <h2 style={{ margin: '5px 0' }}>Meet new people</h2>
                    <h2 style={{ margin: '5px 0' }}>Have fun</h2>
                </div>
            </div>        </>
    );
};

export default InitialPage;