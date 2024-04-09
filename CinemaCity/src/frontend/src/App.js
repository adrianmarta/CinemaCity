import React from 'react';
import InitialPage from './components/InitialPage';
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<InitialPage/>}/>
                <Route path="/signin" element={<SignUp/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </Router>
    );
}

export default App;
