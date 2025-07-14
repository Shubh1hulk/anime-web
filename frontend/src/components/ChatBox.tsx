import React, { useEffect, useRef, useState } from 'react';
import avatarBleach from '../assets/avatar-bleach.jpg';
import fallbackAnime from '../assets/fallback-anime.jpg';

interface ChatMessage {
  _id: string;
  user: string;
  message: string;
  animeTheme: string;
  createdAt: string;
}

interface ChatBoxProps {
  username: string;
  animeTheme: string;
  role: 'admin' | 'user' | 'guest';
}

export const ChatBox: React.FC<ChatBoxProps> = ({ username, animeTheme, role }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetch('/api/chat')
      .then(res => res.json())
      .then(data => setMessages(data.reverse()))
      .catch(() => setError('Could not load chat history'));
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: username, message: input, animeTheme })
      });
      const data = await res.json();
      if (res.ok) {
        setMessages([data, ...messages]);
        setInput('');
      } else {
        setError(data.error || 'Failed to send message');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbox" style={{ background: '#23233b', borderRadius: 12, padding: 16, maxWidth: 420, margin: '32px auto', boxShadow: '0 4px 32px #0008' }}>
      <div style={{ height: 280, overflowY: 'auto', marginBottom: 16, background: '#18181c', borderRadius: 8, padding: 8 }}>
        {messages.map(msg => (
          <div key={msg._id} style={{ display: 'flex', alignItems: 'flex-end', marginBottom: 10, flexDirection: msg.user === username ? 'row-reverse' : 'row' }}>
            <img
              src={avatarBleach}
              alt="avatar"
              style={{ width: 36, height: 36, borderRadius: '50%', margin: msg.user === username ? '0 0 0 8px' : '0 8px 0 0', boxShadow: '0 2px 8px #0008' }}
              onError={e => { (e.currentTarget as HTMLImageElement).src = fallbackAnime; }}
            />
            <div>
              <div style={{ fontWeight: 600, color: msg.user === username ? '#ffd700' : '#7fd7ff' }}>{msg.user} <span style={{ fontSize: 10, color: '#aaa' }}>({new Date(msg.createdAt).toLocaleTimeString()})</span></div>
              <div style={{ background: msg.user === username ? '#3838b8' : '#282828', color: '#fff', display: 'inline-block', borderRadius: 6, padding: '6px 12px', maxWidth: 280, wordBreak: 'break-word' }}>{msg.message}</div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={sendMessage} style={{ display: 'flex', gap: 8 }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a message..."
          style={{ flex: 1, borderRadius: 6, border: 'none', padding: 8 }}
          disabled={loading}
        />
        <button type="submit" disabled={loading || !input.trim()} style={{ borderRadius: 6, padding: '8px 16px', background: '#ffd700', color: '#18181c', border: 'none', fontWeight: 700 }}>
          Send
        </button>
      </form>
      {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
    </div>
  );
};
