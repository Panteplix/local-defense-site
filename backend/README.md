# Local Defense Guild Website - Backend Setup

## Quick Start

### 1. Navigate to backend folder
```bash
cd backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Copy `.env.example` to `.env` and fill in your values:
```bash
cp .env.example .env
```

### 4. Start the server
```bash
npm start
# or for development with auto-reload:
npm run dev
```

Server will run on `http://localhost:5000`

---

## Environment Variables (.env)

### Database Setup (MongoDB)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a project and cluster
4. Get your connection string
5. Add to `.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/local-defense?retryWrites=true&w=majority
```

### Discord OAuth Setup

1. Go to https://discord.com/developers/applications
2. Create a New Application
3. Copy **Client ID** and **Client Secret** to `.env`:
```
DISCORD_CLIENT_ID=your_client_id
DISCORD_CLIENT_SECRET=your_client_secret
```
4. Add "OAuth2 > Redirects":
```
http://localhost:5000/api/auth/discord/callback
```
5. For production, update to your domain

---

## API Endpoints

### Authentication
- `POST /api/auth/login` - Traditional login (username/password)
- `GET /api/auth/discord` - Discord OAuth login
- `GET /api/auth/discord/callback` - Discord callback
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user (requires token)

### Raids
- `GET /api/raids` - Get all raids
- `GET /api/raids/:raidId` - Get raid with signups
- `POST /api/raids/signup` - Sign up for raid (requires token)
- `DELETE /api/raids/signup/:signupId` - Cancel signup (requires token)
- `GET /api/raids/summary/:raidName` - Get raid role summary

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/profile/:userId` - Get user profile (requires token)
- `PUT /api/users/:userId/role` - Update user role (Admin only)

---

## How to Use in Frontend

### Store token after login:
```javascript
localStorage.setItem("authToken", token);
```

### Make authenticated requests:
```javascript
const token = localStorage.getItem("authToken");
fetch('/api/raids/signup', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(data)
});
```

---

## Next Steps

1. ✅ Backend initialized
2. ⏳ Update raids.js to use backend API
3. ⏳ Add real user authentication
4. ⏳ Connect raids calendar
5. ⏳ Add YouTube embed section
6. ⏳ Deploy to production

