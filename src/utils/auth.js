export function getToken() {
  try { return localStorage.getItem('cf_token'); } catch { return null; }
}
export function setToken(token) {
  try { localStorage.setItem('cf_token', token); } catch {}
}
export function clearToken() {
  try { localStorage.removeItem('cf_token'); } catch {}
}

export async function apiFetch(path, opts = {}) {
  const API_URL = import.meta.env.VITE_API_URL || '';
  const token = getToken();
  const headers = new Headers(opts.headers || {});
  if (token) headers.set('Authorization', `Bearer ${token}`);
  if (!(opts.body instanceof FormData) && !(opts.body === undefined)) {
    headers.set('Content-Type', 'application/json');
  }
  const res = await fetch(API_URL + path, { ...opts, headers });
  if (res.status === 401) {
    // token invalid or expired
    clearToken();
  }
  return res;
}
