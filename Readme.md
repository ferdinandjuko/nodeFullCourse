# Node CRUD

> Node JS - MongoDB with mongoose: Async CRUD


[<img src="https://cdn.gomix.com/2bdfb3f8-05ef-4035-a06e-2043962a3a13%2Fremix-butoon.svg" width="163px" />](https://glitch.com/edit/#!/import/github.com/ferdinandjuko/nodeFullCourse)

**Deploy by clicking the button above**

## 🚀 Quick Start

**Prerequisites:** Node.js (via nvm), npm

```bash
# Install dependencies
npm install

### Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
# Generate secure tokens using the commands below
ACCESS_TOKEN_SECRET=your_access_token_here
REFRESH_TOKEN_SECRET=your_refresh_token_here

# Your MongoDB connection string
DATABASE_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname

# Environment mode
NODE_ENV=development
```

#### 🔐 Generating Secure Tokens

Run these commands in your terminal to generate cryptographically secure tokens:

```bash
# Generate ACCESS_TOKEN_SECRET
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Generate REFRESH_TOKEN_SECRET (run the command again)
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Copy each output and paste into your `.env` file.

#### 🗄️ MongoDB Setup

1. Create a free account at [mongodb.com](https://www.mongodb.com/)
2. Create a new cluster
3. Get your connection string
4. Replace `DATABASE_URI` in `.env` with your connection string

#### 🌍 Environment Modes

- **Development:** `NODE_ENV=development`
- **Production:** `NODE_ENV=production`

### Running the Application

```bash

# Development mode (with nodemon hot-reload)
npm run dev

# Production mode
npm start
```

## 📦 Tech Stack

- Node.js
- TLS (Transport Layer Security)
- nodemon (dev dependency)

## 📝 Available Scripts

- `npm run dev` - Development server with auto-restart
- `npm start` - Production server

---

**License:** MIT | **Author:** Ferdinand Juko