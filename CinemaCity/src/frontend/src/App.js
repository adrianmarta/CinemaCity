import React from 'react';
import InitialPage from './components/initialPage/InitialPage';
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import MainPage from "./components/MainPage/MainPage";
//import createParty from "./components/createParty";
import CreateParty from "./components/createParty/createParty";
import PartyDetails from "./components/partyDetails/PartyDetails";
import JoinParty from "./components/joinParty/JoinParty";
import './setup.js';
import UserParties from "./components/UserParties/UserParties";
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<InitialPage/>}/>
                <Route path="/signin" element={<SignUp/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/main-page" element={<MainPage/>}/>
                <Route path="/parties" element={<CreateParty/>}/>
                <Route path="/party-details/:partyId" element={<PartyDetails />} />
                <Route path="/join-party/:partyId" element={<JoinParty />} />
                <Route path="/user-parties" element={<UserParties />} />
            </Routes>
        </Router>
    );
}

export default App;