
import React, { useState } from 'react';
import './story.css';

function Story() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: 'US',
    phone: '',
    message: '',
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // For now just log the payload; replace with real submit later
    console.log('Contact form submitted', form);
    // Simple UX: clear message and show a quick confirmation state
    setForm((f) => ({ ...f, message: '' }));
    alert('Message sent — thanks! (this is a demo)');
  }

  return (
    <section className="contact-section dark-vibe">
        <div className="contact-content">
          <h2 className="contact-title big">Contact us</h2>
          <p className="contact-sub light">Our friendly team would love to hear from you!</p>
        <div className='cardContainerW'>
          <div className="form-card">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="row two-cols">
                <label className="field">
                  <span className="visually-hidden">First name</span>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    value={form.firstName}
                    onChange={handleChange}
                  />
                </label>

                <label className="field">
                  <span className="visually-hidden">Last name</span>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    value={form.lastName}
                    onChange={handleChange}
                  />
                </label>
              </div>

              <label className="field">
                <span className="visually-hidden">Email</span>
                <input
                  type="email"
                  name="email"
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </label>


              <label className="field">
                <span className="visually-hidden">Message</span>
                <textarea
                  name="message"
                  placeholder="Message"
                  rows={6}
                  value={form.message}
                  onChange={handleChange}
                />
              </label>

              <div className="form-actions">
                <button type="submit" className="submit-btn">Send message</button>
              </div>
            </form>
            </div>
          </div>
        </div>
    </section>
  );
}

export default Story;
