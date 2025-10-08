import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

function SuccessPage() {
  return (
    <div>
      <Navbar />
      <div className="order-hero">
        <h1>Thank you!</h1>
        <p>Your order was received. A confirmation email has been sent.</p>
      </div>
      <div className="order-container" style={{ padding: '2rem 1rem' }}>
        <p>
          We’ll reach out soon with delivery details. If you have questions, please contact us.
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default SuccessPage;