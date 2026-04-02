const express = require('express');
const router = express.Router();

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Get all users (Admin only)
router.get('/', verifyToken, async (req, res) => {
  try {
    if (req.user.role !== 'Admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const userCollection = req.db.collection('users');
    const users = await userCollection.find({}).toArray();
    
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user profile
router.get('/profile/:userId', verifyToken, async (req, res) => {
  try {
    const userCollection = req.db.collection('users');
    const { userId } = req.params;
    
    // Users can only see their own profile, admins can see all
    if (req.user.role !== 'Admin' && req.user.id.toString() !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const user = await userCollection.findOne({ _id: new (require('mongodb')).ObjectId(userId) });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user role (Admin only)
router.put('/:userId/role', verifyToken, async (req, res) => {
  try {
    if (req.user.role !== 'Admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const { role } = req.body;
    const validRoles = ['Admin', 'Officer', 'Member'];

    if (!validRoles.includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    const userCollection = req.db.collection('users');
    const result = await userCollection.updateOne(
      { _id: new (require('mongodb')).ObjectId(req.params.userId) },
      { $set: { role } }
    );

    res.json({ success: true, message: 'Role updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
