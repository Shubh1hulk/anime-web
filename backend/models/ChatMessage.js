const mongoose = require('mongoose');

const ChatMessageSchema = new mongoose.Schema({
  user: { type: String, default: 'Anonymous' },
  message: { type: String, required: true },
  anime: { type: String }, // For anime-themed messages
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ChatMessage', ChatMessageSchema);
