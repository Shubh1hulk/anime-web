import React from 'react';

import { ChatBox } from './ChatBox.tsx';
import { AIAssistant } from './AIAssistant.tsx';

export const UserPanel: React.FC = () => {
  return (
    <div style={{ padding: 32 }}>
      <h2 style={{ color: '#ffd700' }}>User Panel</h2>
      <p>Welcome to your dashboard! Here you can chat, change your theme, and explore anime features.</p>
      <ChatBox username="User" animeTheme="One Piece" />
      <AIAssistant />
    </div>
  );
};
