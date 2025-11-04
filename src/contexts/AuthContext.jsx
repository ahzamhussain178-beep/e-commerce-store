import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isVerified, setIsVerified] = useState(() => {
    try {
      return localStorage.getItem('isVerified') === 'true';
    } catch {
      return false;
    }
  });

  // Determine API base from environment. Support both Vite (import.meta.env) and CRA-like REACT_APP for flexibility.
  const API_BASE = (typeof process !== 'undefined' && process.env && process.env.REACT_APP_API_BASE)
    || (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE)
    || 'http://localhost:4000';

  useEffect(() => {
    try {
      const raw = localStorage.getItem('authUser');
      if (raw) setUser(JSON.parse(raw));
    } catch (e) {
      setUser(null);
    }
  }, []);

  const login = ({ email, password }) => {
    // Mocked credentials for demo purposes only
    const adminCred = { email: 'admin@zzqstores.com', password: 'Admin123!' };

    if (email === adminCred.email && password === adminCred.password) {
      const adminUser = { email, role: 'admin', token: 'admin-token' };
      localStorage.setItem('authToken', adminUser.token);
      localStorage.setItem('authUser', JSON.stringify(adminUser));
      setUser(adminUser);
      return { success: true, user: adminUser };
    }

    // simple fallback: allow any other credentials as a regular user
    if (email && password) {
      const normalUser = { email, role: 'user', token: 'user-token' };
      localStorage.setItem('authToken', normalUser.token);
      localStorage.setItem('authUser', JSON.stringify(normalUser));
      setUser(normalUser);
      return { success: true, user: normalUser };
    }

    return { success: false, message: 'Invalid credentials' };
  };

  // Request OTP via backend API. Backend will return { success, message, devCode? } in dev mode.
  const requestOtp = async (phone) => {
    try {
      const res = await fetch(`${API_BASE.replace(/\/$/, '')}/auth/request-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json().catch(() => ({ success: false, message: 'Invalid JSON from server' }));
      // expose devCode in browser console for easier dev testing
      try { if (data?.devCode) console.info('[FRONTEND DEV OTP]', data.devCode); } catch (e) {}
      return { ...(data || {}), status: res.status };
    } catch (err) {
      // network or other failure
      // eslint-disable-next-line no-console
      console.error('requestOtp error', err);
      return { success: false, message: 'Failed to contact auth server' };
    }
  };

  // Verify OTP via backend. Expect { success, user, token, message } on success.
  const verifyOtp = async (phone, code) => {
    try {
      const res = await fetch(`${API_BASE.replace(/\/$/, '')}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, code }),
      });
      const data = await res.json().catch(() => ({ success: false, message: 'Invalid JSON from server' }));
      if (!data?.success) return { success: false, message: data?.message || 'OTP verification failed' };
      const token = data.token || data?.user?.token || null;
      const userObj = data.user || null;
      if (token) {
        try { localStorage.setItem('authToken', token); } catch {}
      }
      if (userObj) {
        try { localStorage.setItem('authUser', JSON.stringify(userObj)); } catch {}
        setUser(userObj);
      }
      try { localStorage.setItem('isVerified', 'true'); } catch {}
      setIsVerified(true);
      return { success: true, user: userObj, token };
    } catch (err) {
      // network or other failure
      // eslint-disable-next-line no-console
      console.error('verifyOtp error', err);
      return { success: false, message: 'Failed to contact auth server' };
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    localStorage.removeItem('isVerified');
    setUser(null);
    setIsVerified(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, isVerified, requestOtp, verifyOtp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
