import React from 'react';
import { UserPanel } from '../components/UserPanel.tsx';

export const UserPanelPage: React.FC = () => (
  <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #23233b 50%, #18181c 100%)' }}>
    <UserPanel />
  </div>
);
