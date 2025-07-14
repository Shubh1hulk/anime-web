import React, { useState } from 'react';

export const AIAssistant: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ sender: 'user' | 'ai', text: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { sender: 'user', text: input }]);
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/ai-assist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input })
      });
      const data = await res.json();
      if (res.ok && data.response) {
        setMessages((msgs) => [...msgs, { sender: 'ai', text: data.response }]);
      } else {
        setError(data.error || 'AI did not respond');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setInput('');
      setLoading(false);
    }
  };

  return (
    <div className="ai-assistant" style={{ background: '#23233b', borderRadius: 12, padding: 16, maxWidth: 420, margin: '32px auto', boxShadow: '0 4px 32px #0008' }}>
      <h3 style={{ color: '#ffd700', marginBottom: 12 }}>AI Assistant</h3>
      <div style={{ height: 180, overflowY: 'auto', marginBottom: 16, background: '#18181c', borderRadius: 8, padding: 8 }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left', marginBottom: 10 }}>
            <div style={{ fontWeight: 600, color: msg.sender === 'user' ? '#ffd700' : '#7fd7ff' }}>{msg.sender === 'user' ? 'You' : 'AI'}</div>
            <div style={{ background: msg.sender === 'user' ? '#3838b8' : '#282828', color: '#fff', display: 'inline-block', borderRadius: 6, padding: '6px 12px', maxWidth: 280, wordBreak: 'break-word' }}>{msg.text}</div>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} style={{ display: 'flex', gap: 8 }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask the AI anything..."
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
