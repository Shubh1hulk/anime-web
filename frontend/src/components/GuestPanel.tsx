import React from 'react';

import { ChatBox } from './ChatBox.tsx';

export const GuestPanel: React.FC = () => {
  return (
    <div className="guest-panel" style={{ color: '#fff', textAlign: 'center', marginTop: 80 }}>
      <h2>Guest Panel</h2>
      <p>Welcome, Guest! You can explore the chat and features in a limited mode. Register for full access.</p>
      <ChatBox username="Guest" animeTheme="One Piece" role="guest" />
    </div>
  );
};
