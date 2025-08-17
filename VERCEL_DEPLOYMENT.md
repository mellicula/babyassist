# Vercel Deployment Guide for Baby Assistant

## 🚀 **Deploy Your Baby Assistant to Vercel**

This guide will walk you through deploying your React app to Vercel with proper environment variable configuration.

## 📋 **Prerequisites**

- ✅ **Vercel account** - Sign up at [vercel.com](https://vercel.com)
- ✅ **GitHub repository** - Your code should be pushed to GitHub
- ✅ **Environment variables** - OpenAI and Supabase credentials ready

## 🔧 **Step-by-Step Deployment**

### **Step 1: Install Vercel CLI (Optional but Recommended)**

```bash
npm install -g vercel
```

### **Step 2: Prepare Your Repository**

1. **Commit all changes** to your local repository
2. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

### **Step 3: Deploy via Vercel Dashboard (Recommended)**

1. **Go to [vercel.com](https://vercel.com)** and sign in
2. **Click "New Project"**
3. **Import your GitHub repository**:
   - Select your Baby Assistant repository
   - Click "Import"
4. **Configure project settings**:
   - **Project Name**: `baby-assistant` (or your preferred name)
   - **Framework Preset**: Vite (should auto-detect)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (should auto-detect)
   - **Output Directory**: `dist` (should auto-detect)
5. **Click "Deploy"**

### **Step 4: Configure Environment Variables**

**IMPORTANT**: Set these in Vercel dashboard before your first deployment:

1. **Go to Project Settings** → **Environment Variables**
2. **Add each variable**:

   ```
   Name: VITE_OPENAI_API_KEY
   Value: sk-your-actual-openai-key-here
   Environment: Production, Preview, Development
   
   Name: VITE_SUPABASE_URL
   Value: https://your-project.supabase.co
   Environment: Production, Preview, Development
   
   Name: VITE_SUPABASE_ANON_KEY
   Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   Environment: Production, Preview, Development
   ```

3. **Click "Save"** for each variable

### **Step 5: Redeploy (if needed)**

If you added environment variables after the first deployment:
1. **Go to Deployments tab**
2. **Click "Redeploy"** on your latest deployment
3. **Wait for build to complete**

## 🌐 **Alternative: Deploy via CLI**

### **Step 1: Login to Vercel**
```bash
vercel login
```

### **Step 2: Deploy**
```bash
vercel
```

### **Step 3: Follow the prompts**
- Link to existing project or create new
- Confirm settings
- Wait for deployment

### **Step 4: Set environment variables**
```bash
vercel env add VITE_OPENAI_API_KEY
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
```

## 🔍 **Post-Deployment Verification**

### **Check Your App**
1. **Visit your Vercel URL** (e.g., `https://baby-assistant.vercel.app`)
2. **Test the app**:
   - Add a child
   - Try the chat functionality
   - Check console for any errors

### **Common Issues & Solutions**

#### **"OpenAI API key not configured"**
- ✅ Check environment variables in Vercel dashboard
- ✅ Ensure variable names start with `VITE_`
- ✅ Redeploy after adding variables

#### **"Supabase credentials not found"**
- ✅ Verify Supabase URL and anon key
- ✅ Check environment variable names
- ✅ Ensure Supabase table is created

#### **"Build failed"**
- ✅ Check build logs in Vercel dashboard
- ✅ Ensure all dependencies are in `package.json`
- ✅ Verify Node.js version compatibility

## 🚀 **Custom Domain (Optional)**

1. **Go to Project Settings** → **Domains**
2. **Add your domain** (e.g., `babyassistant.com`)
3. **Follow DNS configuration** instructions
4. **Wait for DNS propagation** (can take 24-48 hours)

## 📱 **Mobile Testing**

After deployment:
1. **Test on mobile devices**
2. **Check responsive design**
3. **Verify chat functionality works**
4. **Test on different screen sizes**

## 🔄 **Continuous Deployment**

Vercel automatically:
- ✅ **Deploys on every push** to your main branch
- ✅ **Creates preview deployments** for pull requests
- ✅ **Handles rollbacks** if needed
- ✅ **Optimizes builds** for performance

## 📊 **Monitoring & Analytics**

### **Vercel Analytics (Optional)**
1. **Go to Project Settings** → **Analytics**
2. **Enable Vercel Analytics**
3. **Get insights** on performance and usage

### **Performance Monitoring**
- **Core Web Vitals** tracking
- **Build performance** metrics
- **Deployment history** and logs

## 🔒 **Security Best Practices**

✅ **Environment variables** stored securely in Vercel  
✅ **HTTPS enforced** automatically  
✅ **No sensitive data** in client code  
✅ **Automatic security updates**  

## 🎯 **Next Steps After Deployment**

1. **Test all functionality** thoroughly
2. **Share your app** with others
3. **Monitor performance** and usage
4. **Set up custom domain** if desired
5. **Configure analytics** for insights

## 🆘 **Need Help?**

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **Community**: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)

Your Baby Assistant will be live on the web in minutes! 🎉 