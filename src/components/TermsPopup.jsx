import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TermsPopup = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const hasAccepted = localStorage.getItem('termsAccepted');
        if (!hasAccepted) {
            setIsOpen(true);
        }
    }, []);

    const handleClose = () => {
        localStorage.setItem('termsAccepted', 'true');
        setIsOpen(false);
    };

    return (
        isOpen && (
            <div className="terms-popup">
                <div className="popup-content">
                    <h2>Cookies</h2>
                    <p>
                        By using this site, you agree to our <Link to="/terms">Terms of Service</Link>.
                    </p>
                    <div>
                    <button className="button" onClick={handleClose}>
                        Accept
                    </button>
                    <button className="button red" onClick={handleClose}>
                        Decline
                    </button>
                    </div>

                </div>
            </div>
        )
    );
};

export default TermsPopup;
