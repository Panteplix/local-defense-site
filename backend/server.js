const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
let db;

// MongoDB Connection
const connectDB = async () => {
  try {
    const client = new MongoClient(process.env.MONGODB_URI || 'mongodb://localhost:27017');
    await client.connect();
    db = client.db('local-defense');
    console.log('✅ MongoDB Connected');
    
    // Create collections if they don't exist
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);
    
    if (!collectionNames.includes('users')) {
      await db.createCollection('users');
      console.log('📝 Created users collection');
    }
    if (!collectionNames.includes('raids')) {
      await db.createCollection('raids');
      console.log('📝 Created raids collection');
    }
    if (!collectionNames.includes('signups')) {
      await db.createCollection('signups');
      console.log('📝 Created signups collection');
    }
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
};

// Middleware
app.use(cors({
  origin: [process.env.FRONTEND_URL || 'http://localhost:3000', 'http://localhost'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Make db available to routes
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/raids', require('./routes/raids'));
app.use('/api/users', require('./routes/users'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: '✅ Server is running' });
});

// Start server
app.listen(PORT, async () => {
  await connectDB();
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

module.exports = app;
