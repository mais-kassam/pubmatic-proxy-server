# PubMatic Proxy Server - Railway Deployment Guide

## 📋 Files Needed

You should have these 3 files:
- `server.js` - The backend server
- `package.json` - Dependencies
- `.gitignore` - Files to ignore in Git

## 🚀 Step-by-Step Railway Deployment

### Step 1: Create a GitHub Repository

1. Go to https://github.com and sign in
2. Click the **"+"** button (top right) → **"New repository"**
3. Name it something like `pubmatic-proxy-server`
4. Set to **Public** or **Private** (your choice)
5. **Do NOT** initialize with README, .gitignore, or license
6. Click **"Create repository"**

### Step 2: Upload Your Files to GitHub

**Option A: Using GitHub Web Interface (Easiest)**
1. On your new repository page, click **"uploading an existing file"**
2. Drag and drop these files:
   - `server.js`
   - `package.json`
   - `.gitignore`
3. Click **"Commit changes"**

**Option B: Using Git Command Line**
```bash
# In the folder with your files
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/pubmatic-proxy-server.git
git push -u origin main
```

### Step 3: Sign Up for Railway

1. Go to https://railway.app
2. Click **"Sign up"**
3. **Sign in with GitHub** (recommended - makes connecting easier)
4. Authorize Railway to access your GitHub account

### Step 4: Deploy to Railway

1. On Railway dashboard, click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose your `pubmatic-proxy-server` repository
4. Railway will automatically:
   - Detect it's a Node.js app
   - Install dependencies from `package.json`
   - Run `npm start`
5. Wait for deployment (usually 2-3 minutes)

### Step 5: Get Your Railway URL

1. Once deployed, click on your project
2. Click on the **"Settings"** tab
3. Scroll down to **"Domains"**
4. Click **"Generate Domain"**
5. Copy the URL (something like: `https://pubmatic-proxy-server-production-xxxx.up.railway.app`)

### Step 6: Update CORS in server.js

1. Go back to your GitHub repository
2. Click on `server.js`
3. Click the **pencil icon** (Edit this file)
4. Find this line:
   ```javascript
   'https://yourusername.github.io',  // REPLACE with your actual GitHub Pages URL
   ```
5. Replace with your **actual GitHub Pages URL**
6. Click **"Commit changes"**
7. Railway will automatically redeploy (takes 1-2 minutes)

### Step 7: Update Your Frontend HTML

Update your `index.html` file on GitHub Pages:

Find this line:
```javascript
var API_ENDPOINT = 'https://cmpbid.pubmatic.com/convert/sponsored';
```

Replace with:
```javascript
var API_ENDPOINT = 'https://your-railway-app.up.railway.app/api/sponsored-products';
```
(Use the Railway URL you copied in Step 5)

### Step 8: Test It!

1. Visit your GitHub Pages site
2. Click **"⭐ Load All Sponsored Ads"**
3. You should see the sponsored products load!

## 🔧 Troubleshooting

### Error: "CORS policy blocked"
- Make sure you updated the CORS origin in `server.js` with your exact GitHub Pages URL
- Redeploy on Railway after making changes

### Error: "Failed to fetch"
- Check your Railway logs (Settings → View Logs)
- Make sure your API_ENDPOINT URL is correct
- Verify Railway app is running (should show green status)

### Railway app keeps crashing
- Check Railway logs for error messages
- Make sure `package.json` has correct dependencies
- Node version should be 18 or higher

## 💰 Railway Free Tier

Railway gives you:
- **$5 credit per month** (free)
- This should be plenty for your demo/testing
- Monitor usage in Railway dashboard

## 📞 Need Help?

Common issues:
1. **CORS error**: Update GitHub Pages URL in server.js
2. **404 error**: Check API_ENDPOINT path includes `/api/sponsored-products`
3. **App not starting**: Check Railway logs for errors

## 🎉 Success Checklist

- [ ] Files uploaded to GitHub
- [ ] Railway project created and deployed
- [ ] Railway domain generated
- [ ] CORS updated in server.js with GitHub Pages URL
- [ ] Frontend updated with Railway API endpoint
- [ ] Sponsored ads loading successfully

---

**Your URLs will look like:**
- Frontend: `https://yourusername.github.io/your-repo`
- Backend: `https://your-app-name.up.railway.app`
- API Endpoint: `https://your-app-name.up.railway.app/api/sponsored-products`
