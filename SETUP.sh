#!/bin/bash

# Quick setup script for Local Defense Backend

echo "================================="
echo "Local Defense Backend Setup"
echo "================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed!"
    echo "Please download it from: https://nodejs.org/"
    exit 1
fi

echo "✓ Node.js found: $(node --version)"
echo ""
echo "Installing dependencies..."

cd backend
npm install

if [ $? -ne 0 ]; then
    echo "ERROR: npm install failed"
    exit 1
fi

echo ""
echo "✓ Dependencies installed"
echo ""
echo "IMPORTANT: Before starting the server, you need to:"
echo ""
echo "1. Create a .env file in the backend folder"
echo "2. Copy contents from .env.example"
echo "3. Fill in your Discord OAuth credentials:"
echo "   - Get them from: https://discord.com/developers/applications"
echo "4. Add your MongoDB connection string"
echo "   - Get it from: https://www.mongodb.com/cloud/atlas"
echo ""
echo "Next steps:"
echo "-----------"
echo "cd backend"
echo "npm start"
