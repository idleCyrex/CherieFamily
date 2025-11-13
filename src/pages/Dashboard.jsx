import React, { useEffect, useState } from 'react';
import { getToken, setToken, clearToken, apiFetch } from '../utils/auth';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
// Simple charts with Recharts
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

function Dashboard() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginUser, setLoginUser] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupUser, setSignupUser] = useState('');
  const [adminEmail, setAdminEmail] = useState(null);
  const [signupAllowed, setSignupAllowed] = useState(false);
  const [message, setMessage] = useState('');
  const [stage, setStage] = useState('login'); // 'login' | 'signup' | '2fa'
  const [tempToken, setTempToken] = useState(null);
  const [code, setCode] = useState('');
  // Affiliate program state
  const [affiliates, setAffiliates] = useState([]);
  const [showAddAffiliate, setShowAddAffiliate] = useState(false);
  const [newAffiliate, setNewAffiliate] = useState({ code: '', tax: '', available: true, contact: '' });
  const [selectedAffiliate, setSelectedAffiliate] = useState(null); // for revenue details
  const [revenueView, setRevenueView] = useState('daily'); // 'daily' | 'monthly' | 'total'
  // Inline code edit state
  // Full row edit state (except link which is derived)
  const [editAffiliate, setEditAffiliate] = useState(null); // { code, tax, available, contact, revenue, _originalCode }
  const [editError, setEditError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        // Only call /admin/verify if we have a stored token — avoids generating a 401 in dev when no token present
        const token = getToken();
        if (token) {
          const r = await fetch(`${API_URL}/admin/verify`, { headers: { Authorization: `Bearer ${token}` } });
          if (r.ok) {
            const j = await r.json();
            setLoggedIn(true);
            setAdminEmail(j.username || j.email);
          }
        }
      } catch (e) { /* ignore */ }
      try {
        const s = await fetch(`${API_URL}/admin/signup-allowed`);
        if (s.ok) {
          const j = await s.json();
          setSignupAllowed(!!j.allowed);
        }
      } catch (e) {}
      setLoading(false);
    })();
  }, []);

  const startSignup = () => { setStage('signup'); setMessage(''); };

  const doSignup = async () => {
    setMessage('');
    if (!signupEmail || !signupUser || !password) return setMessage('Enter email, username and password');
    try {
      const r = await fetch(`${API_URL}/signup`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: signupEmail, username: signupUser, password }) });
      const j = await r.json();
      if (!r.ok) return setMessage(j.error || 'Signup failed');
      setMessage('Verification email sent. Check your inbox.');
      // after signup we don't auto-login; force user to verify via email then go to login
      setStage('login');
    } catch (e) {
      setMessage('Network error');
    }
  };

  const doLogin = async () => {
    setMessage('');
    if (!loginUser || !password) return setMessage('Enter username and password');
    try {
      const r = await fetch(`${API_URL}/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username: loginUser, password }) });
      const j = await r.json();
      if (!r.ok) return setMessage(j.error || 'Login failed');
      // got temporary token for 2FA
      setTempToken(j.tempToken);
      setStage('2fa');
      setMessage('A 2FA code has been emailed to you.');
    } catch (e) {
      setMessage('Network error');
    }
  };

  const doVerify2fa = async () => {
    setMessage('');
    if (!code || !tempToken) return setMessage('Enter the code');
    try {
      const r = await fetch(`${API_URL}/login/verify`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${tempToken}` }, body: JSON.stringify({ code }) });
      const j = await r.json();
      if (!r.ok) return setMessage(j.error || 'Verification failed');
      setToken(j.token);
      setLoggedIn(true);
      setStage('login');
    } catch (e) { setMessage('Network error'); }
  };

  const doLogout = () => { clearToken(); setLoggedIn(false); };

  // Load affiliates from backend once logged in
  useEffect(() => {
    if (!loggedIn) return;
    (async () => {
      try {
        const r = await apiFetch('/admin/affiliates');
        if (r.ok) {
          const j = await r.json();
          if (j && j.ok && Array.isArray(j.affiliates)) setAffiliates(j.affiliates);
        }
      } catch (e) { /* ignore */ }
    })();
  }, [loggedIn]);

  if (loading) return <div>Loading...</div>;

  if (!loggedIn) {
    return (
      <div>
        <Navbar />
        <div className="auth-page-container">
          <div className="auth-card auth-box">
             <h2>Admin Access</h2>
             {signupAllowed && stage === 'login' && <div className="signup-note">No admin exists. You can create a one-time account.</div>}

             {stage === 'login' && (
               <>
                 <input placeholder="Username" value={loginUser} onChange={e => setLoginUser(e.target.value)} />
                 <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                 <div className="auth-actions">
                   <button onClick={doLogin}>Log in</button>
                  {signupAllowed && <button onClick={startSignup} className="secondary">Create account</button>}
                 </div>
               </>
             )}

             {stage === 'signup' && (
               <>
                 <input placeholder="Email" value={signupEmail} onChange={e => setSignupEmail(e.target.value)} />
                 <input placeholder="Username" value={signupUser} onChange={e => setSignupUser(e.target.value)} />
                 <input placeholder="Password (min 8)" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                 <div className="auth-actions">
                  <button onClick={doSignup}>Sign up and verify email</button>
                  <button onClick={() => setStage('login')} className="secondary">Back</button>
                 </div>
               </>
             )}

             {stage === '2fa' && (
               <>
                 <div>A 6-digit code was sent to your email.</div>
                 <input placeholder="Enter code" value={code} onChange={e => setCode(e.target.value)} />
                 <div className="auth-actions">
                  <button onClick={doVerify2fa}>Verify and sign in</button>
                  <button onClick={() => setStage('login')} className="secondary">Cancel</button>
                 </div>
               </>
             )}

             {message && <div className="auth-message">{message}</div>}
          </div>
        </div>
         <Footer />
       </div>
     );
   }

  // When logged in we remove the site's navbar/footer to avoid overlap and provide a clean admin view
  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <img src="/src/assets/img/Cherie.png" alt="logo" />
        </div>
        <nav className="sidebar-icons" aria-label="Admin navigation">
          <button
            className="sidebar-icon"
            title="Dashboard"
            aria-current={activeTab === 'dashboard' ? 'page' : undefined}
            onClick={() => setActiveTab('dashboard')}
          >
            <i className="fa-solid fa-house"></i>
          </button>
          <button
            className="sidebar-icon"
            title="Affiliates"
            aria-label="Affiliate Program"
            aria-current={activeTab === 'affiliates' ? 'page' : undefined}
            onClick={() => setActiveTab('affiliates')}
          >
            <i className="fa-solid fa-handshake"></i>
          </button>
        </nav>
        <div className="sidebar-bottom" aria-label="Account actions">
          <button
            className="sidebar-icon"
            title="Sign out"
            aria-label="Sign out"
            onClick={doLogout}
          >
            <i className="fa-solid fa-right-from-bracket"></i>
          </button>
        </div>
      </aside>

      <main className="content-area">
        <div className="admin-header">
          <h1>{activeTab === 'dashboard' ? 'Dashboard' : 'Affiliate Program'}</h1>
        </div>
        {activeTab === 'dashboard' && (
          <div className="dashboard-content">
            <p>Protected content goes here. You can add order lists, stats, etc.</p>
          </div>
        )}
        {activeTab === 'affiliates' && (
          <div className="dashboard-content">
            <h2 style={{ marginTop: 0 }}>Manage current affiliate programs:</h2>
            <div style={{ overflowX: 'auto', marginBottom: 20 }}>
              <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 900, background: '#fff' }}>
                <thead>
                  <tr style={{ background: '#f5f5f5' }}>
                    <th style={thStyle}>Affiliate Code</th>
                    <th style={thStyle}>Link</th>
                    <th style={thStyle}>Commission</th>
                    <th style={thStyle}>Revenue</th>
                    <th style={thStyle}>Availability</th>
                    <th style={thStyle}>Contact Details</th>
                    <th style={thStyle}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {affiliates.map(a => {
                    const link = `${window.location.origin}/?ref=${encodeURIComponent(a.code)}`;
                    return (
                      <tr key={a.code} style={{ borderTop: '1px solid #e5e5e5' }}>
                        <td style={tdStyle}>
                          {editAffiliate && editAffiliate._originalCode === a.code ? (
                            <input
                              aria-label="Edit affiliate code"
                              style={inputStyle}
                              value={editAffiliate.code}
                              onChange={e => { setEditError(''); setEditAffiliate({ ...editAffiliate, code: e.target.value.toUpperCase() }); }}
                            />
                          ) : a.code}
                        </td>
                        <td style={tdStyle}><a href={link} target="_blank" rel="noreferrer">{link}</a></td>
                        <td style={tdStyle}>
                          {editAffiliate && editAffiliate._originalCode === a.code ? (
                            <input
                              aria-label="Edit tax percentage"
                              type="number"
                              style={inputStyle}
                              value={editAffiliate.tax}
                              onChange={e => { setEditError(''); setEditAffiliate({ ...editAffiliate, tax: e.target.value }); }}
                            />
                          ) : `${a.tax}%`}
                        </td>
                        <td style={tdStyle}>
                          <button style={linkBtnStyle} onClick={() => { setSelectedAffiliate(a); setRevenueView('daily'); }}>click for more details</button>
                        </td>
                        <td style={tdStyle}>
                          {editAffiliate && editAffiliate._originalCode === a.code ? (
                            <select
                              aria-label="Edit availability"
                              style={inputStyle}
                              value={editAffiliate.available ? 'active' : 'disabled'}
                              onChange={e => { setEditError(''); setEditAffiliate({ ...editAffiliate, available: e.target.value === 'active' }); }}
                            >
                              <option value="active">Active</option>
                              <option value="disabled">Disabled</option>
                            </select>
                          ) : (a.available ? 'Active' : 'Disabled')}
                        </td>
                        <td style={tdStyle}>
                          {editAffiliate && editAffiliate._originalCode === a.code ? (
                            <input
                              aria-label="Edit contact email"
                              type="email"
                              style={inputStyle}
                              value={editAffiliate.contact}
                              onChange={e => { setEditError(''); setEditAffiliate({ ...editAffiliate, contact: e.target.value }); }}
                            />
                          ) : a.contact}
                        </td>
                        <td style={tdStyle}>
                          {editAffiliate && editAffiliate._originalCode === a.code ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                <button
                                  style={primaryBtnStyle}
                                  aria-label="Save affiliate edits"
                                  onClick={() => {
                                    const newCode = editAffiliate.code.trim().toUpperCase();
                                    if (!newCode) { setEditError('Code cannot be empty'); return; }
                                    const taxNum = Number(editAffiliate.tax);
                                    if (Number.isNaN(taxNum) || taxNum < 0 || taxNum > 100) { setEditError('Tax must be between 0 and 100'); return; }
                                    (async () => {
                                      try {
                                        const body = { code: newCode, tax: taxNum, available: editAffiliate.available, contact: editAffiliate.contact };
                                        const r = await apiFetch(`/admin/affiliates/${encodeURIComponent(editAffiliate._originalCode)}`, { method: 'PATCH', body: JSON.stringify(body) });
                                        const j = await r.json();
                                        if (!r.ok) { setEditError(j.error || 'Update failed'); return; }
                                        setAffiliates(prev => prev.map(af => af.code === editAffiliate._originalCode ? j.affiliate : af));
                                        setEditAffiliate(null);
                                      } catch (e) { setEditError('Network error'); }
                                    })();
                                  }}
                                >Save</button>
                                <button
                                  style={secondaryBtnStyle}
                                  aria-label="Cancel affiliate edits"
                                  onClick={() => { setEditAffiliate(null); setEditError(''); }}
                                >Cancel</button>
                                <button
                                  style={dangerBtnStyle}
                                  aria-label="Delete affiliate"
                                  onClick={() => {
                                    if (!confirm('Delete this affiliate?')) return;
                                    const orig = editAffiliate._originalCode;
                                    (async () => {
                                      try {
                                        const r = await apiFetch(`/admin/affiliates/${encodeURIComponent(orig)}`, { method: 'DELETE' });
                                        const j = await r.json().catch(() => ({}));
                                        if (!r.ok) { alert(j.error || 'Delete failed'); return; }
                                        setAffiliates(prev => prev.filter(af => af.code !== orig));
                                        if (selectedAffiliate && selectedAffiliate.code === orig) setSelectedAffiliate(null);
                                        setEditAffiliate(null);
                                      } catch (e) { alert('Network error'); }
                                    })();
                                  }}
                                >Delete</button>
                              </div>
                              {editError && <div style={{ color: '#b00020', fontSize: 12 }}>{editError}</div>}
                            </div>
                          ) : (
                            <button
                              style={linkBtnStyle}
                              aria-label={`Edit affiliate ${a.code}`}
                              onClick={() => { setEditAffiliate({ ...a, _originalCode: a.code }); setEditError(''); }}
                            >
                              <i className="fa-solid fa-pen" style={{ marginRight: 4 }}></i>Edit
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  {affiliates.length === 0 && (
                    <tr>
                      <td style={tdStyle} colSpan={7}>No affiliates yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {!showAddAffiliate && (
              <button onClick={() => setShowAddAffiliate(true)} style={primaryBtnStyle}>
                <i className="fa-solid fa-plus" style={{ marginRight: 6 }}></i> Add affiliate user
              </button>
            )}
            {showAddAffiliate && (
              <div style={cardStyle}>
                <h3 style={{ marginTop: 0 }}>New Affiliate User</h3>
                <div style={formRowStyle}>
                  <label style={labelStyle}>Code</label>
                  <input style={inputStyle} value={newAffiliate.code} placeholder="e.g. CREATOR25" onChange={e => setNewAffiliate({ ...newAffiliate, code: e.target.value.toUpperCase() })} />
                </div>
                <div style={formRowStyle}>
                  <label style={labelStyle}>Tax %</label>
                  <input style={inputStyle} type="number" value={newAffiliate.tax} placeholder="10" onChange={e => setNewAffiliate({ ...newAffiliate, tax: e.target.value })} />
                </div>
                <div style={formRowStyle}>
                  <label style={labelStyle}>Availability</label>
                  <select style={inputStyle} value={newAffiliate.available ? 'active' : 'disabled'} onChange={e => setNewAffiliate({ ...newAffiliate, available: e.target.value === 'active' })}>
                    <option value="active">Active</option>
                    <option value="disabled">Disabled</option>
                  </select>
                </div>
                <div style={formRowStyle}>
                  <label style={labelStyle}>Contact Email</label>
                  <input style={inputStyle} type="email" value={newAffiliate.contact} placeholder="creator@example.com" onChange={e => setNewAffiliate({ ...newAffiliate, contact: e.target.value })} />
                </div>
                <div style={{ fontSize: 12, color: '#555', marginBottom: 12 }}>
                  Link will be auto-generated: {newAffiliate.code ? `${window.location.origin}/?ref=${encodeURIComponent(newAffiliate.code)}` : '(enter code)'}
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button
                    style={primaryBtnStyle}
                    onClick={() => {
                      if (!newAffiliate.code || !newAffiliate.tax || !newAffiliate.contact) return;
                      (async () => {
                        try {
                          const body = { code: newAffiliate.code, tax: Number(newAffiliate.tax), available: newAffiliate.available, contact: newAffiliate.contact };
                          const r = await apiFetch('/admin/affiliates', { method: 'POST', body: JSON.stringify(body) });
                          const j = await r.json();
                          if (!r.ok) { alert(j.error || 'Create failed'); return; }
                          setAffiliates(prev => [...prev, j.affiliate]);
                          setNewAffiliate({ code: '', tax: '', available: true, contact: '' });
                          setShowAddAffiliate(false);
                        } catch (e) { alert('Network error'); }
                      })();
                    }}
                  >Save</button>
                  <button style={secondaryBtnStyle} onClick={() => { setShowAddAffiliate(false); setNewAffiliate({ code: '', tax: '', available: true, contact: '' }); }}>Cancel</button>
                </div>
              </div>
            )}

            {selectedAffiliate && (
              <div style={modalOverlayStyle} onClick={() => setSelectedAffiliate(null)}>
                <div style={modalStyle} onClick={e => e.stopPropagation()}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: 0 }}>Revenue details - {selectedAffiliate.code}</h3>
                    <button style={iconBtnStyle} onClick={() => setSelectedAffiliate(null)}><i className="fa-solid fa-xmark"></i></button>
                  </div>
                  <div style={{ margin: '12px 0' }}>
                    <strong>View:</strong>{' '}
                    {['daily','monthly','total'].map(v => (
                      <button
                        key={v}
                        style={v === revenueView ? activeFilterBtnStyle : filterBtnStyle}
                        onClick={() => setRevenueView(v)}
                      >{v}</button>
                    ))}
                  </div>
                  <div>
                    {renderRevenueChart(selectedAffiliate, revenueView)}
                  </div>
                  <div style={{ marginTop: 12, fontSize: 13, color: '#555' }}>
                    (Sample data placeholder. Will connect to real metrics later.)
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

// ----- Inline style helpers (keep minimal until extracted) -----
const thStyle = { textAlign: 'left', padding: '10px 12px', fontSize: 13, fontWeight: 600, borderBottom: '1px solid #e5e5e5' };
const tdStyle = { padding: '10px 12px', fontSize: 13, verticalAlign: 'top' };
const linkBtnStyle = { background: 'none', border: 'none', color: '#2c6b53', cursor: 'pointer', textDecoration: 'underline', padding: 0, fontSize: 13 };
const primaryBtnStyle = { background: '#2c6b53', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: 6, cursor: 'pointer', fontSize: 14 };
const secondaryBtnStyle = { background: '#eee', color: '#333', border: 'none', padding: '10px 16px', borderRadius: 6, cursor: 'pointer', fontSize: 14 };
const dangerBtnStyle = { background: '#b91c1c', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: 6, cursor: 'pointer', fontSize: 14 };
const cardStyle = { marginTop: 20, background: '#fff', border: '1px solid #e5e5e5', borderRadius: 8, padding: 16, maxWidth: 520 };
const formRowStyle = { display: 'flex', flexDirection: 'column', marginBottom: 12 };
const labelStyle = { fontSize: 12, fontWeight: 600, marginBottom: 4 };
const inputStyle = { padding: '8px 10px', fontSize: 14, border: '1px solid #ccc', borderRadius: 4 };
const modalOverlayStyle = { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 };
const modalStyle = { background: '#fff', padding: 24, borderRadius: 10, width: 'min(640px, 90vw)', maxHeight: '80vh', overflowY: 'auto', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' };
const iconBtnStyle = { background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: '#555' };
const filterBtnStyle = { marginRight: 8, padding: '6px 10px', background: '#eee', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12 };
const activeFilterBtnStyle = { ...filterBtnStyle, background: '#2c6b53', color: '#fff' };

function renderRevenueChart(a, view) {
  // Backward compatibility: old field `revenue.total` (commission) OR new field `revenue.totalCommissionEur`
  const commissionTotal = (a && a.revenue && typeof a.revenue.totalCommissionEur === 'number')
    ? a.revenue.totalCommissionEur
    : (a && a.revenue && typeof a.revenue.total === 'number' ? a.revenue.total : 0);
  const grossTotal = (a && a.revenue && typeof a.revenue.totalGrossEur === 'number') ? a.revenue.totalGrossEur : null;
  const byDay = (a && a.revenueByDay) || {};
  const byMonth = (a && a.revenueByMonth) || {};

  if (view === 'total') {
    // Show commission and optionally gross if available
    const data = grossTotal != null
      ? [
          { name: 'Commission', value: commissionTotal },
          { name: 'Gross', value: grossTotal }
        ]
      : [ { name: 'Commission', value: commissionTotal } ];
    return (
      <div style={{ height: 240 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(v, n) => [`€${Number(v).toFixed(2)}`, n]} />
            <Bar dataKey="value" name="Value" fill="#2c6b53" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  if (view === 'daily') {
    // Last 7 days including today
    const out = [];
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      const key = `${yyyy}-${mm}-${dd}`;
      const label = `${dd}/${mm}`;
      const val = typeof byDay[key] === 'number' ? byDay[key] : 0;
      out.push({ name: label, value: val });
    }
    return (
      <div style={{ height: 240 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={out} margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(v) => [`€${Number(v).toFixed(2)}`, 'Commission']} />
            <Bar dataKey="value" name="Commission" fill="#2c6b53" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  // monthly view: last 6 months
  const out = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const key = `${yyyy}-${mm}`;
    const label = `${mm}/${String(yyyy).slice(-2)}`;
    const val = typeof byMonth[key] === 'number' ? byMonth[key] : 0;
    out.push({ name: label, value: val });
  }
  return (
    <div style={{ height: 240 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={out} margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(v) => [`€${Number(v).toFixed(2)}`, 'Commission']} />
          <Bar dataKey="value" name="Commission" fill="#2c6b53" radius={[4,4,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Dashboard;
