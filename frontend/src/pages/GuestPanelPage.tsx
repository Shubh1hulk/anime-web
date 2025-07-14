import React from 'react';
import { GuestPanel } from '../components/GuestPanel.tsx';

export const GuestPanelPage: React.FC = () => (
  <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #7fd7ff 50%, #18181c 100%)' }}>
    <GuestPanel />
  </div>
);
