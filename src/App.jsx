import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './assets/style.css';
import Hero from './components/hero';
import Second from './components/second';
import Forth from './components/forth';
import Footer from './components/footer';
import TermsPopup from './components/TermsPopup';
import TermsPage from './pages/TermsPage.jsx';
import OrderPage from './pages/OrderPage.jsx';
import SuccessPage from './pages/SuccessPage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Contact from './pages/Contact.jsx';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import Story from './components/story';

function App() {
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <Hero />
                            <Second />
                            <Forth />
                            <Story/>
                            <Footer />
                            <TermsPopup />
                            
                        </>
                    }
                />
                <Route path="/order" element={<OrderPage />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/success" element={<SuccessPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;
