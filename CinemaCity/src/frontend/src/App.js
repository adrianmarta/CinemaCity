import React from 'react';
import InitialPage from './components/InitialPage';
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import MainPage from "./components/MainPage";
import createParty from "./components/createParty";
import CreateParty from "./components/createParty";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<InitialPage/>}/>
                <Route path="/signin" element={<SignUp/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/main-page" element={<MainPage/>}/>
                <Route path="/parties" element={<CreateParty/>}/>
            </Routes>
        </Router>
    );
}

export default App;
