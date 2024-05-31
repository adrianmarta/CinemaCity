import React from 'react';
import InitialPage from './components/initialPage/InitialPage';
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from "./components/MainPage/MainPage";
import CreateParty from "./components/createParty/createParty";
import PartyDetails from "./components/partyDetails/PartyDetails";
import JoinParty from "./components/joinParty/JoinParty";
import UserParties from "./components/UserParties/UserParties";
import { AuthProvider } from './components/AuthContext';
import ProtectedRoute from './ProtectedRoute';
import './setup.js';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<InitialPage />} />
                    <Route path="/signin" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/main-page" element={<ProtectedRoute element={<MainPage />} />} />
                    <Route path="/parties" element={<ProtectedRoute element={<CreateParty />} />} />
                    <Route path="/party-details/:partyId" element={<ProtectedRoute element={<PartyDetails />} />} />
                    <Route path="/join-party/:partyId" element={<ProtectedRoute element={<JoinParty />} />} />
                    <Route path="/user-parties" element={<ProtectedRoute element={<UserParties />} />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
