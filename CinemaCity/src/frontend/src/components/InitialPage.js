import React from 'react';
import {Link} from "react-router-dom";

const InitialPage = () => {
    return (
        <>
            <header style={{ backgroundColor: '#283548', color: '#fff', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
            <img style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', zIndex: '-1', objectFit: 'cover' }} src="images/background.jpg" alt="Full page background image" />
        </>
    );
};

export default InitialPage;