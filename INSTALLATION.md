# 🚀 Local Defense Backend - Installation Guide

## Structure Overview

Your project now has:
```
local-defense-site/
├── backend/                 (NEW) Backend server
│   ├── routes/
│   │   ├── auth.js         - Authentication (Discord OAuth, login, logout)
│   │   ├── raids.js        - Raid signups and roster management
│   │   └── users.js        - User management (Admin only)
│   ├── server.js           - Express server entry point
│   ├── package.json        - Node.js dependencies
│   ├── .env.example        - Environment variables template
│   └── README.md           - Backend documentation
├── login.html              (UPDATED) Now uses backend API
├── login.js                (UPDATED) Backend integration
└── [other files...]
```

---

## Step 1: Install Node.js

**Windows/Mac/Linux:**
1. Go to https://nodejs.org/
2. Download LTS version (Long-term support)
3. Install and verify:
```bash
node --version
npm --version
```

---

## Step 2: Quick Install (Recommended)

### Windows PowerShell:
```bash
cd c:\Users\user\Desktop\Website\local-defense-site
./SETUP.bat
```

### Mac/Linux:
```bash
cd ~/Desktop/Website/local-defense-site
chmod +x SETUP.sh
./SETUP.sh
```

---

## Step 3: Get Discord OAuth Credentials

1. Go to https://discord.com/developers/applications
2. Click "New Application"
3. Name it "Local Defense"
4. Go to "OAuth2" > "General"
5. Copy **Client ID** and **Client Secret**
6. Add OAuth2 Redirect:
   ```
   http://localhost:5000/api/auth/discord/callback
   ```

---

## Step 4: Set Up MongoDB (Free)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a free cluster
4. Go to "Database" > "Connect"
5. Copy the connection string
6. Replace `<username>` and `<password>` with your credentials

---

## Step 5: Create `.env` File

In the `backend/` folder, create a file named `.env`:

```env
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/local-defense?retryWrites=true&w=majority

# Discord OAuth
DISCORD_CLIENT_ID=your_client_id_here
DISCORD_CLIENT_SECRET=your_client_secret_here
DISCORD_CALLBACK_URL=http://localhost:5000/api/auth/discord/callback

# JWT Secret (can be anything random)
JWT_SECRET=your_super_secret_key_change_this_to_something_random

# Frontend URL
FRONTEND_URL=http://localhost
```

---

## Step 6: Start the Backend

From `backend/` folder:

```bash
npm start
```

You should see:
```
✓ MongoDB Connected
✓ Created users collection
✓ Created raids collection
✓ Created signups collection
🚀 Server running on http://localhost:5000
```

---

## Step 7: Test It Works

1. Open http://localhost:5000/health
   - Should show: `{"status":"✅ Server is running"}`

2. Go to http://localhost/login.html
   - Click "Discord Login" button
   - Should redirect to Discord
   - After login, you'll be redirected back to the site

---

## Test Accounts (Traditional Login)

After backend is running:
- **Username:** admin | **Password:** 1234
- **Username:** officer | **Password:** raidlead  
- **Username:** member | **Password:** guild123

---

## Common Issues

### "Cannot find module 'express'"
**Fix:** Run `npm install` in the backend folder

### "MongoDB Connection Error"
**Fix:** Check your .env file:
- Is the connection string correct?
- Are your credentials right?
- Is the DB user created in MongoDB Atlas?

### "Discord OAuth failed"
**Fix:** Verify in Discord Developer Portal:
- Is the Redirect URL exactly: `http://localhost:5000/api/auth/discord/callback`?
- Are Client ID and Secret correct?

### "Port 5000 already in use"
**Fix:** Change PORT in .env to 5001 and restart

---

## What's Next?

✅ Backend initialized with authentication
✅ MongoDB database set up
✅ Discord OAuth configured
✅ Login system working

### Next Phase:
1. Update raids.js to store signups in database
2. Add real-time raid roster updates
3. Create calendar integration
4. Add YouTube embed section
5. Deploy to production

---

## Keeping Server Running

### Option 1: Keep terminal open
```bash
npm start
```

### Option 2: Auto-restart on changes (development)
```bash
npm run dev
```
(Requires `nodemon` - included in package.json)

### Option 3: Keep running in background (PowerShell)
```bash
Start-Process pwsh -ArgumentList "-Command npm start" -WindowStyle Hidden
```

---

## Production Deployment

When you're ready to go live:

1. **Heroku** (free tier available)
   ```bash
   heroku login
   heroku create your-guild-name
   git push heroku main
   ```

2. **Railway** (simpler than Heroku)
   - Connect your GitHub repo
   - Set environment variables
   - Deploy with one click

3. **DigitalOcean/AWS**
   - More control, slightly more complex

---

## API Reference

###Login
```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{"username": "admin", "password": "1234"}
```

### Discord OAuth
```
GET http://localhost:5000/api/auth/discord
```

### Raid Signup
```bash
POST http://localhost:5000/api/raids/signup
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "characterName": "Thrall",
  "characterClass": "Shaman",
  "characterSpec": "Enhancement",
  "characterRole": "Melee DPS",
  "raidName": "Naxxramas 25"
}
```

### Get Raid Summary
```bash
GET http://localhost:5000/api/raids/summary/Naxxramas%2025
```

---

Need help? Check the backend/README.md for more details!
