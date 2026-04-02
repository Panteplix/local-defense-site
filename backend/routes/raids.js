const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');

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

// Get all raids
router.get('/', async (req, res) => {
  try {
    const raidCollection = req.db.collection('raids');
    const raids = await raidCollection.find({}).toArray();
    res.json(raids);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get raid by ID with signups
router.get('/:raidId', async (req, res) => {
  try {
    const { raidId } = req.params;
    const signupCollection = req.db.collection('signups');
    
    const signups = await signupCollection
      .find({ raidId })
      .toArray();
    
    res.json({ raidId, signups });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create raid signup
router.post('/signup', verifyToken, async (req, res) => {
  try {
    const { characterName, characterClass, characterSpec, characterRole, raidName } = req.body;
    
    const signupCollection = req.db.collection('signups');
    
    const signup = {
      userId: req.user.id,
      username: req.user.username,
      characterName,
      characterClass,
      characterSpec,
      characterRole,
      raidName,
      signupTime: new Date(),
      status: 'confirmed'
    };

    const result = await signupCollection.insertOne(signup);
    
    res.json({ 
      success: true, 
      message: 'Signup successful',
      signup: { ...signup, _id: result.insertedId }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get raid summary (counts by role)
router.get('/summary/:raidName', async (req, res) => {
  try {
    const { raidName } = req.params;
    const signupCollection = req.db.collection('signups');
    
    const signups = await signupCollection
      .find({ raidName })
      .toArray();

    const summary = {
      tankCount: signups.filter(s => s.characterRole === 'Tank').length,
      healerCount: signups.filter(s => s.characterRole === 'Healer').length,
      meleeDpsCount: signups.filter(s => s.characterRole === 'Melee DPS').length,
      rangedDpsCount: signups.filter(s => s.characterRole === 'Ranged DPS').length,
      totalSignups: signups.length,
      signups
    };

    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete signup (for members to cancel)
router.delete('/signup/:signupId', verifyToken, async (req, res) => {
  try {
    const { signupId } = req.params;
    const signupCollection = req.db.collection('signups');
    
    const result = await signupCollection.deleteOne({ _id: new ObjectId(signupId) });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Signup not found' });
    }

    res.json({ success: true, message: 'Signup cancelled' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
