import React from 'react';
import { AdminPanel } from '../components/AdminPanel.tsx';

export const AdminPanelPage: React.FC = () => (
  <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #3838b8 50%, #18181c 100%)' }}>
    <AdminPanel />
  </div>
);
