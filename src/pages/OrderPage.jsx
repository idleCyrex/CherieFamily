import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import menuData from '../../public/menu.json';
import '../assets/style.css';

function OrderPage() {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4242';
  const [cart, setCart] = useState([]);
  const [name, setName] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryPort, setDeliveryPort] = useState('');
  const [boat, setBoat] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');

  // add or increment
  const addToCart = (item, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.name === item.name);
      if (existing) return prev.map(i => i.name === item.name ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { ...item, qty }];
    });
  };

  const removeFromCart = (name) => {
    setCart(prev => prev.filter(i => i.name !== name));
  };

  // change quantity, if item not present and delta>0, add it
  const changeQty = (item, delta) => {
    setCart(prev => {
      const found = prev.find(i => i.name === item.name);
      if (found) {
        const newQty = found.qty + delta;
        if (newQty <= 0) return prev.filter(i => i.name !== item.name);
        return prev.map(i => i.name === item.name ? { ...i, qty: newQty } : i);
      }
      if (delta > 0) return [...prev, { ...item, qty: delta }];
      return prev;
    });
  };

  const total = cart.reduce((s, i) => s + (i.price || 0) * i.qty, 0);

  const sections = menuData.sections || [];

  const getQty = (item) => {
    const found = cart.find(i => i.name === item.name);
    return found ? found.qty : 0;
  };

  return (
    <div>
      <Navbar />

      <div className="order-hero">
        <h1>Order Now</h1>
        <p>Choose your items and checkout — free delivery</p>
      </div>

      <div className="order-container">
        <div className="order-list">
          {sections.map(section => (
            <div key={section.name} className="menu-section">
              <h2 className={section.items && section.items.length === 0 ? 'menu-group-title' : ''}>{section.name}</h2>
              {(!section.items || section.items.length === 0) ? null : (
              <div className="menu-items">
                {section.items.map(item => (
                  <div className="menu-item" key={item.name}>
                    <div className="menu-item-left">
                      <strong>{item.name}</strong>
                      {item.description && <div className="menu-desc">{Array.isArray(item.description) ? item.description.join(' • ') : item.description}</div>}
                    </div>
                    <div className="menu-item-right">
                      <div className="menu-price">{item.price ? item.price + '€' : ''}</div>
                      <div className="qty-controls">
                        <button className="qty-btn" onClick={() => changeQty(item, -1)}>-</button>
                        <span className="qty">{getQty(item)}</span>
                        <button className="qty-btn" onClick={() => changeQty(item, 1)}>+</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              )}
            </div>
          ))}
        </div>

        <div className="details-stack">
          <div className="summary-box">
            <h3>ORDER DETAILS</h3>
            <div className="summary-content">
              <div className="summary-food">
                <div className="summary-title">Food</div>
                <div className="summary-items">
                  {cart.length === 0 && <div className="empty">No items</div>}
                  {cart.map(i => (
                    <div key={i.name} className="summary-line">
                      <span>{i.qty} x {i.name}</span>
                      <span className="right">{(i.price * i.qty).toFixed(2)}€</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="summary-delivery">Delivery <span className="right">Free</span></div>
              <hr />
              <div className="summary-totals">
                <div className="total-to-pay">Total to pay <span className="right">{total.toFixed(2)}€</span></div>
              </div>
            </div>
          </div>

          <div className="form-box">
            <h3>ORDER DETAILS</h3>
            <div className="form-grid">
              <input placeholder="First and Last Name*" value={name} onChange={e => setName(e.target.value)} />
              <input placeholder="Delivery Date*" value={deliveryDate} onChange={e => setDeliveryDate(e.target.value)} />
              <input placeholder="Delivery Port" value={deliveryPort} onChange={e => setDeliveryPort(e.target.value)} />
              <input placeholder="Boat" value={boat} onChange={e => setBoat(e.target.value)} />
              <input placeholder="Phone number*" value={phone} onChange={e => setPhone(e.target.value)} />
              <input placeholder="Email*" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <textarea placeholder="Notes: age for number balloons, age for candles, color scheme, boat info, invoice request,..." value={notes} onChange={e => setNotes(e.target.value)} />

            <button className="paynow" onClick={async () => {
              if (cart.length === 0) return alert('Cart is empty');
              // simple validation for required fields
              const errors = [];
              if (!name.trim()) errors.push('First and Last Name');
              if (!deliveryDate.trim()) errors.push('Delivery Date');
              if (!phone.trim()) errors.push('Phone number');
              if (!email.trim()) errors.push('Email');
              // basic email format check
              const emailOk = /.+@.+\..+/.test(email);
              if (email && !emailOk) errors.push('Valid Email');
              if (errors.length) {
                alert('Please fill the required fields: ' + errors.join(', '));
                return;
              }
              try {
                const origin = window.location.origin;
                const resp = await fetch(`${API_URL}/create-checkout-session`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    items: cart,
                    successUrl: `${origin}/success`,
                    cancelUrl: `${origin}/order`,
                    details: {
                      name,
                      deliveryDate,
                      deliveryPort,
                      boat,
                      phone,
                      email,
                      notes,
                    }
                  })
                });
                if (!resp.ok) {
                  let msg = 'Error creating checkout session';
                  try { const err = await resp.json(); msg = err.error || msg; } catch {}
                  alert(msg);
                  return;
                }
                const data = await resp.json();
                if (data.url) window.location.href = data.url;
                else alert('Error creating checkout session');
              } catch (e) { console.error(e); alert('Checkout error'); }
            }}>PAY NOW</button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default OrderPage;
