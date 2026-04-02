const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const axios = require('axios');

// Hardcoded users for now (replace with DB later)
const users = [
  { id: 1, username: 'admin', email: 'admin@localddefense.com', password: '$2a$10$YourHashedPasswordHere', role: 'Admin' },
  { id: 2, username: 'officer', email: 'officer@localddefense.com', password: '$2a$10$YourHashedPasswordHere', role: 'Officer' },
  { id: 3, username: 'member', email: 'member@localddefense.com', password: '$2a$10$YourHashedPasswordHere', role: 'Member' }
];

// Traditional Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const user = users.find(u => u.username === username);
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // For now, skip password check (add bcrypt comparison later)
    // const isValidPassword = await bcrypt.compare(password, user.password);
    // if (!isValidPassword) return res.status(401).json({ error: 'Invalid password' });

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET || 'your_secret_key',
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token,
      user: { id: user.id, username: user.username, role: user.role, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Discord OAuth Redirect
router.get('/discord', (req, res) => {
  const clientId = process.env.DISCORD_CLIENT_ID;
  const redirectUri = process.env.DISCORD_CALLBACK_URL;
  const scope = 'identify email guilds';
  
  const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${scope}`;
  
  res.redirect(authUrl);
});

// Discord OAuth Callback
router.get('/discord/callback', async (req, res) => {
  try {
    const { code } = req.query;
    const clientId = process.env.DISCORD_CLIENT_ID;
    const clientSecret = process.env.DISCORD_CLIENT_SECRET;
    const redirectUri = process.env.DISCORD_CALLBACK_URL;

    // Exchange code for token
    const tokenResponse = await axios.post('https://discord.com/api/v10/oauth2/token', {
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri
    });

    const { access_token } = tokenResponse.data;

    // Get user info from Discord
    const userResponse = await axios.get('https://discord.com/api/v10/users/@me', {
      headers: { Authorization: `Bearer ${access_token}` }
    });

    const discordUser = userResponse.data;

    // Check if user exists in DB, if not create them
    const userCollection = req.db.collection('users');
    let dbUser = await userCollection.findOne({ discordId: discordUser.id });

    if (!dbUser) {
      // Create new user
      const result = await userCollection.insertOne({
        discordId: discordUser.id,
        username: discordUser.username,
        email: discordUser.email,
        avatar: discordUser.avatar,
        role: 'Member', // Default role
        createdAt: new Date()
      });
      dbUser = await userCollection.findOne({ _id: result.insertedId });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: dbUser._id, username: dbUser.username, role: dbUser.role, discordId: dbUser.discordId },
      process.env.JWT_SECRET || 'your_secret_key',
      { expiresIn: '7d' }
    );

    // Redirect to frontend with token
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost';
    res.redirect(`${frontendUrl}/login.html?token=${token}&user=${encodeURIComponent(JSON.stringify(dbUser))}`);

  } catch (error) {
    console.error('Discord OAuth Error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
});

// Verify Token Middleware
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Logout
router.post('/logout', (req, res) => {
  res.json({ success: true, message: 'Logged out successfully' });
});

// Get current user
router.get('/me', verifyToken, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
