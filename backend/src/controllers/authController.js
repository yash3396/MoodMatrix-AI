import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const MIN_PASSWORD_LENGTH = 8;
const PW_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_WINDOW_MINUTES = 15;

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });
    const existingByUsername = await User.findOne({ username });
    if (existingByUsername) return res.status(400).json({ message: 'Username already taken' });
    if (!password || password.length < MIN_PASSWORD_LENGTH || !PW_REGEX.test(password)) {
      return res.status(400).json({ message: 'Password must be at least 8 chars incl. upper, lower, digit.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    if (err?.code === 11000) {
      const field = Object.keys(err.keyPattern || {})[0] || 'field';
      return res.status(400).json({ message: field === 'email' ? 'Email already exists' : 'Username already taken' });
    }
    if (err?.message?.includes('not primary')) {
      return res.status(503).json({ message: 'Database temporarily unavailable. Restart the backend.' });
    }
    console.error('Register error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    if (user.lockout && user.lockout.lockedUntil && user.lockout.lockedUntil > new Date()) {
      return res.status(429).json({ message: 'Account temporarily locked. Try again later.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    if (user.lockout) {
      user.lockout.failed = 0; user.lockout.lockedUntil = null; await user.save();
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { username: user.username, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export async function recordFailedLogin(email) {
  const user = await User.findOne({ email });
  if (!user) return;
  const now = new Date();
  if (!user.lockout) user.lockout = { failed: 0, lockedUntil: null, lastAttempt: now };
  if (user.lockout.lastAttempt && (now.getTime() - new Date(user.lockout.lastAttempt).getTime()) > LOCKOUT_WINDOW_MINUTES*60*1000) {
     user.lockout.failed = 0;
  }
  user.lockout.failed += 1;
  user.lockout.lastAttempt = now;
  if (user.lockout.failed >= MAX_FAILED_ATTEMPTS) {
    user.lockout.lockedUntil = new Date(now.getTime() + 10*60*1000);
  }
  await user.save();
}
