import React from 'react';

import { ChatBox } from './ChatBox.tsx';

export const AdminPanel: React.FC = () => {
  return (
    <div className="admin-panel" style={{ color: '#fff', textAlign: 'center', marginTop: 80 }}>
      <h2>Admin Panel</h2>
      <p>Welcome, Admin! Here you can manage users, monitor chat, and configure site settings.</p>
      <ChatBox username="Admin" animeTheme="Bleach" role="admin" />
    </div>
  );
};
