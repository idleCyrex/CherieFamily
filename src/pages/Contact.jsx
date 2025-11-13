import React, { useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function Contact() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ sending: false, success: false, serverError: null });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((err) => ({ ...err, [name]: undefined }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Invalid email";
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    if (!form.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length) return;
    setStatus({ sending: true, success: false, serverError: null });
    try {
      const base = import.meta.env.VITE_API_URL;
      const resp = await fetch(`${base}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          message: form.message,
        }),
      });
      if (!resp.ok) {
        const data = await resp.json().catch(() => ({}));
        throw new Error(data.error || `Request failed (${resp.status})`);
      }
      setStatus({ sending: false, success: true, serverError: null });
      setForm({ firstName: "", lastName: "", email: "", phone: "", message: "" });
      setTimeout(() => setStatus((s) => ({ ...s, success: false })), 3000);
    } catch (err) {
      setStatus({ sending: false, success: false, serverError: err.message || 'Error' });
      // reset visual state back to idle after a few seconds
      setTimeout(() => setStatus({ sending: false, success: false, serverError: null }), 3000);
    }
  };

  return (
    <div className="contact-page">
      <Navbar />
      <main className="contact-main">
        <div className="contact-card">
          <h2 className="contact-title">Contact us</h2>
          <p className="contact-subtitle">Fill out this form to reach out.</p>
          <form onSubmit={handleSubmit} noValidate>
            <div className="contact-grid">
              <div className="form-group">
                <label className="form-label" htmlFor="firstName">First name*</label>
                <input
                  id="firstName"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  className={`form-input ${errors.firstName ? "has-error" : ""}`}
                />
                {errors.firstName && <span className="error-text">{errors.firstName}</span>}
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="lastName">Last name*</label>
                <input
                  id="lastName"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  className="form-input"
                />
                {errors.lastName && <span className="error-text">{errors.lastName}</span>}
              </div>
            </div>
            <div className="contact-grid">
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email*</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={`form-input ${errors.email ? "has-error" : ""}`}
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="phone">Phone*</label>
                <input
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className={`form-input ${errors.phone ? "has-error" : ""}`}
                />
                {errors.phone && <span className="error-text">{errors.phone}</span>}
              </div>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="message">Message*</label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Enter your message"
                rows={5}
                className={`form-input textarea ${errors.message ? "has-error" : ""}`}
              />
              {errors.message && <span className="error-text">{errors.message}</span>}
            </div>
            <div className="divider" />
            <button
              type="submit"
              className={`submit-btn ${status.sending ? 'is-sending' : status.success ? 'is-success' : status.serverError ? 'is-error' : ''}`}
              disabled={status.sending}
              title={status.serverError || undefined}
            >
              <span className="btn-content">
                {status.sending && <span className="btn-spinner" aria-hidden="true" />}
                {status.success && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                )}
                {status.serverError && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                )}
                <span>
                  {status.sending ? 'Sending…' : status.success ? 'Sent' : status.serverError ? 'Error' : 'Send'}
                </span>
              </span>
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

