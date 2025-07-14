import React from 'react';
import { AuthPanel } from '../components/AuthPanel.tsx';

export const LoginPage: React.FC = () => (
  <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(135deg, #23233b 50%, #18181c 100%)' }}>
    <h2 style={{ color: '#ffd700', fontFamily: 'Orbitron, sans-serif', marginBottom: 32 }}>Login / Register</h2>
    <AuthPanel onAuthSuccess={role => {
      if (role === 'admin') window.location.href = '/admin';
      else if (role === 'user') window.location.href = '/user';
      else window.location.href = '/guest';
    }} />
    <a href="/" style={{ marginTop: 32, color: '#7fd7ff', textDecoration: 'underline' }}>Back to Home</a>
  </div>
);
