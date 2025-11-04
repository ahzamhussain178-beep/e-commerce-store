import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const from = (location.state && location.state.from) || '/user-dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) return setError('Please enter email and password.');

    setLoading(true);
    const res = await Promise.resolve(login({ email, password }));
    setLoading(false);

    if (!res?.success) {
      setError(res?.message || 'Invalid credentials');
      return;
    }

    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-card/80 rounded-2xl p-8 shadow-lg border border-border">
            <div className="md:flex md:items-center md:space-x-8">
              <div className="md:w-1/2">
                <h1 className="text-3xl font-extrabold mb-3 text-foreground">Welcome back</h1>
                <p className="text-sm text-muted-foreground mb-6">Sign in with your admin credentials to access the dashboard. If you're a regular user, signing in will take you to your account area.</p>

                {error && <div className="mb-4 text-sm text-red-600">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-foreground">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border rounded-md px-3 py-2 bg-background text-foreground"
                      placeholder="admin@zzqstores.com"
                      autoComplete="email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-foreground">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full border rounded-md px-3 py-2 bg-background text-foreground"
                      placeholder="Enter your password"
                      autoComplete="current-password"
                    />
                  </div>

                  <Button type="submit" variant="primary" className="w-full" disabled={loading}>
                    {loading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>

                <div className="mt-4 text-xs text-muted-foreground">
                  Demo admin credentials: <strong>admin@zzqstores.com</strong> / <strong>Admin123!</strong>
                </div>
              </div>

              <div className="hidden md:flex md:w-1/2 items-stretch">
                <div className="flex-1 rounded-lg p-6 h-full flex flex-col justify-center items-center bg-card border border-border shadow-brand-xl">
                  {/* Polished inline SVG illustration using brand red accents */}
                  <div className="w-56 h-56 rounded-full bg-card flex items-center justify-center shadow-brand-lg mb-4">
                    <svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <defs>
                        <linearGradient id="g1" x1="0" x2="1">
                          <stop offset="0" stopColor="rgba(230,57,70,0.95)" />
                          <stop offset="1" stopColor="rgba(249,115,101,0.85)" />
                        </linearGradient>
                      </defs>
                      <rect x="0" y="0" width="140" height="140" rx="70" fill="url(#g1)" opacity="0.95" />
                      <g transform="translate(24,34)" fill="#fff">
                        <circle cx="46" cy="22" r="18" opacity="0.98" />
                        <path d="M3 96c0-25 31-33 43-33s43 8 43 33v6H3v-6z" opacity="0.96" />
                      </g>
                      {/* subtle decorative dots */}
                      <circle cx="20" cy="20" r="3" fill="rgba(255,255,255,0.22)" />
                      <circle cx="120" cy="32" r="2.5" fill="rgba(255,255,255,0.18)" />
                      <circle cx="100" cy="110" r="2" fill="rgba(255,255,255,0.12)" />
                    </svg>
                  </div>

                  <h3 className="text-lg font-semibold text-foreground">Admin Console</h3>
                  <p className="text-sm text-muted-foreground text-center mt-2 max-w-xs">Securely manage your store, review analytics, and process orders. Fast access to critical tools and reporting.</p>

                  <div className="mt-5 flex items-center space-x-3">
                    <div className="w-2 h-6 rounded-full bg-primary" />
                    <div className="text-sm text-primary font-medium">Enterprise tools</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;




