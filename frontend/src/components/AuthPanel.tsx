import React, { useState } from 'react';

interface AuthPanelProps {
  onAuthSuccess: (role: 'admin' | 'user' | 'guest') => void;
}

export const AuthPanel: React.FC<AuthPanelProps> = ({ onAuthSuccess }) => {
  const [mode, setMode] = useState<'login' | 'register' | 'guest'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'user'>('user');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'login') {
        const res = await fetch('/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        if (res.ok) {
          localStorage.setItem('token', data.token);
          onAuthSuccess(data.role);
        } else {
          setError(data.error || 'Login failed');
        }
      } else if (mode === 'register') {
        const res = await fetch('/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password, role })
        });
        const data = await res.json();
        if (res.ok) {
          setMode('login');
        } else {
          setError(data.error || 'Registration failed');
        }
      } else if (mode === 'guest') {
        onAuthSuccess('guest');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-panel">
      <div style={{ marginBottom: 20 }}>
        <button onClick={() => setMode('login')} disabled={mode==='login'}>Login</button>
        <button onClick={() => setMode('register')} disabled={mode==='register'}>Register</button>
        <button onClick={() => setMode('guest')} disabled={mode==='guest'}>Guest</button>
      </div>
      <form onSubmit={handleSubmit}>
        {mode !== 'guest' && (
          <>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              style={{ marginBottom: 10 }}
            /><br/>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{ marginBottom: 10 }}
            /><br/>
          </>
        )}
        {mode === 'register' && (
          <>
            <select value={role} onChange={e => setRole(e.target.value as 'admin' | 'user')} style={{ marginBottom: 10 }}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select><br/>
          </>
        )}
        <button type="submit" disabled={loading}>{loading ? 'Please wait...' : mode === 'guest' ? 'Continue as Guest' : mode === 'login' ? 'Login' : 'Register'}</button>
      </form>
      {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
    </div>
  );
};
