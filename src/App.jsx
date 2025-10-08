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
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import Story from './components/story';

function App() {
    return (
        <Router>
            <Routes>
                {/* Main App Routes */}
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
                {/* Order Page */}
                <Route path="/order" element={<OrderPage />} />
                {/* Checkout Success */}
                <Route path="/success" element={<SuccessPage />} />
                {/* Terms of Service Page */}
                <Route path="/terms" element={<TermsPage />} />
                {/* Redirect for undefined routes */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;
