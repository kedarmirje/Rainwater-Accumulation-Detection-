# Quick Render Deployment Steps

## ✅ Prerequisites Complete
- [x] Code pushed to GitHub
- [x] render.yaml configuration created
- [x] Backend requirements updated with gunicorn
- [x] Deployment documentation created

## 🚀 Deploy Now (5 Minutes)

### Step 1: Go to Render
Visit: https://dashboard.render.com

### Step 2: Create New Blueprint
1. Click **"New +"** button (top right)
2. Select **"Blueprint"**

### Step 3: Connect GitHub
1. Click **"Connect GitHub"**
2. Authorize Render to access your repositories
3. Select repository: **`kedarmirje/Rainwater-Accumulation-Detection-`**

### Step 4: Configure Blueprint
1. Render will detect `render.yaml` automatically
2. Review the services:
   - ✅ floodguard-frontend (Static Site)
   - ✅ floodguard-backend (Web Service)

### Step 5: Set Environment Variables (Backend)
Add these in the Render dashboard:
- `FLASK_SECRET_KEY`: Click "Generate" button
- `JWT_SECRET_KEY`: Click "Generate" button
- `MONGODB_URI`: `mongodb+srv://your-connection-string` (or use MongoDB Atlas)

### Step 6: Deploy
1. Click **"Apply"** button
2. Wait 5-10 minutes for deployment
3. Both services will be deployed automatically

## 📝 After Deployment

### Get Your URLs
- Frontend: `https://floodguard-frontend.onrender.com`
- Backend: `https://floodguard-backend.onrender.com`

### Update API URL in Code
1. Edit `src/services/api.ts`
2. Change API_URL to your backend URL
3. Commit and push:
   ```bash
   git add src/services/api.ts
   git commit -m "Update API URL for production"
   git push origin main
   ```

## 🎉 Done!
Your FloodGuard AI app is now live on Render!

## 💡 Tips

### Free Tier Limitations
- Services sleep after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds (cold start)
- 750 hours/month free

### Upgrade to Paid ($7/month per service)
- Always-on instances
- No cold starts
- Better performance

### MongoDB Setup
If you need a database:
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Add to Render environment variables

## 🐛 Troubleshooting

### Build Failed?
- Check logs in Render dashboard
- Verify all dependencies are correct
- Check Node/Python versions

### Can't Access Frontend?
- Wait for deployment to complete
- Check if build succeeded
- Clear browser cache

### Backend Errors?
- Check environment variables are set
- Review backend logs
- Verify MongoDB connection

## 📞 Need Help?
- Render Docs: https://render.com/docs
- GitHub Repo: https://github.com/kedarmirje/Rainwater-Accumulation-Detection-
