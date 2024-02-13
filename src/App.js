import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import LandingPage from './pages/Landing';
import AddPet from './pages/AddPet';
import EditPet from './pages/EditPet';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import PetLocation from './pages/PetLocation';
import Tracker from './components/Tracker';
import { GlobalState } from './context/GlobalContext';

function App() {
  return (
    <GlobalState>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/add-pet" element={<ProtectedRoute><AddPet /></ProtectedRoute>} />
          <Route path="/tracker/:id" element={<ProtectedRoute><Tracker /></ProtectedRoute>} />
          <Route path="/edit-pet/:id" element={<ProtectedRoute><EditPet /></ProtectedRoute>} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/pet-location/:petId" element={<PetLocation />} /> 
        </Routes>
      </BrowserRouter>
    </GlobalState>
  );
}

export default App;
