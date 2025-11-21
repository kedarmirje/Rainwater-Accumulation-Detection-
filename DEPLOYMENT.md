# FloodGuard AI - Render Deployment Guide

## Prerequisites
- GitHub account with your repository
- Render account (sign up at https://render.com)

## Deployment Steps

### Option 1: Deploy using render.yaml (Recommended)

1. **Push your code to GitHub** (Already done!)
   ```bash
   git add .
   git commit -m "Add Render deployment configuration"
   git push origin main
   ```

2. **Go to Render Dashboard**
   - Visit https://dashboard.render.com
   - Click "New +" button
   - Select "Blueprint"

3. **Connect Repository**
   - Connect your GitHub account
   - Select repository: `kedarmirje/Rainwater-Accumulation-Detection-`
   - Render will automatically detect `render.yaml`

4. **Deploy**
   - Click "Apply"
   - Render will create both frontend and backend services
   - Wait for deployment to complete (5-10 minutes)

### Option 2: Manual Deployment

#### Deploy Frontend (Static Site)

1. **Create New Static Site**
   - Go to Render Dashboard
   - Click "New +" → "Static Site"
   - Connect your GitHub repository

2. **Configure Frontend**
   - Name: `floodguard-frontend`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`
   - Add Rewrite Rule:
     - Source: `/*`
     - Destination: `/index.html`

3. **Environment Variables**
   - `NODE_VERSION`: `18`

#### Deploy Backend (Web Service)

1. **Create New Web Service**
   - Go to Render Dashboard
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure Backend**
   - Name: `floodguard-backend`
   - Root Directory: `backend`
   - Environment: `Python 3`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn app:app`

3. **Environment Variables**
   - `PYTHON_VERSION`: `3.12.0`
   - `FLASK_SECRET_KEY`: (Generate random string)
   - `JWT_SECRET_KEY`: (Generate random string)
   - `MONGODB_URI`: (Your MongoDB connection string)

## Post-Deployment

### Update API URL in Frontend

After backend is deployed, update the API URL in your frontend:

1. Get your backend URL from Render (e.g., `https://floodguard-backend.onrender.com`)

2. Update `src/services/api.ts`:
   ```typescript
   const API_URL = 'https://floodguard-backend.onrender.com/api';
   ```

3. Commit and push:
   ```bash
   git add .
   git commit -m "Update API URL for production"
   git push origin main
   ```

### Configure CORS

Make sure your backend allows requests from your frontend domain:

In `backend/app.py`:
```python
CORS(app, origins=['https://your-frontend-url.onrender.com'])
```

## Database Setup

### Option 1: MongoDB Atlas (Recommended)

1. Create free account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Add to Render environment variables as `MONGODB_URI`

### Option 2: Render PostgreSQL

1. Create PostgreSQL database in Render
2. Update backend code to use PostgreSQL instead of MongoDB

## Custom Domain (Optional)

1. Go to your Static Site settings in Render
2. Click "Custom Domain"
3. Add your domain
4. Update DNS records as instructed

## Monitoring

- Check logs in Render Dashboard
- Set up health checks
- Monitor performance metrics

## Troubleshooting

### Build Fails
- Check build logs in Render Dashboard
- Verify all dependencies are in package.json/requirements.txt
- Check Node/Python version compatibility

### Backend Not Starting
- Verify gunicorn is installed
- Check environment variables are set
- Review application logs

### Frontend Shows Blank Page
- Check browser console for errors
- Verify API URL is correct
- Check CORS configuration

## Cost Estimate

- **Free Tier**: Both services can run on Render's free tier
- **Limitations**: 
  - Services spin down after 15 minutes of inactivity
  - 750 hours/month free
  - Slower cold starts

- **Paid Tier**: $7/month per service for always-on instances

## URLs After Deployment

- Frontend: `https://floodguard-frontend.onrender.com`
- Backend: `https://floodguard-backend.onrender.com`

## Support

For issues, check:
- Render Documentation: https://render.com/docs
- GitHub Issues: https://github.com/kedarmirje/Rainwater-Accumulation-Detection-/issues
