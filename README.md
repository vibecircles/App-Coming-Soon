# VibeCircles Coming Soon Page

A beautiful coming soon page with email collection functionality, deployed on Vercel with GitHub integration.

## Features

- ⏰ Countdown timer (3 years from today)
- 📧 Email collection with validation
- 💾 Local storage fallback
- 🚀 Serverless API for email storage
- 📱 Responsive design
- 🎨 Modern UI with animations

## Setup Instructions

### 1. GitHub Repository Setup

1. **Create a new GitHub repository:**
   ```bash
   # Initialize git (if not already done)
   git init
   
   # Add all files
   git add .
   
   # Commit changes
   git commit -m "Initial commit: Coming soon page with email collection"
   
   # Create repository on GitHub.com and then:
   git remote add origin https://github.com/yourusername/vibecircles-coming-soon.git
   git branch -M main
   git push -u origin main
   ```

2. **Repository Structure:**
   ```
   vibecircles-coming-soon/
   ├── api/
   │   └── subscribe.js          # Email collection API
   ├── assets/                   # CSS, JS, images
   ├── data/                     # Email storage (auto-created)
   ├── coming-soon.html          # Main page
   ├── index.html               # Home page
   ├── package.json             # Dependencies
   ├── vercel.json              # Vercel configuration
   └── README.md                # This file
   ```

### 2. Vercel Deployment

#### Option A: Deploy via Vercel Dashboard

1. **Go to [vercel.com](https://vercel.com) and sign up/login**
2. **Click "New Project"**
3. **Import your GitHub repository:**
   - Select "Import Git Repository"
   - Choose your `vibecircles-coming-soon` repository
   - Click "Import"

4. **Configure project settings:**
   - Project Name: `vibecircles-coming-soon` (or your preferred name)
   - Framework Preset: `Other`
   - Root Directory: `./` (leave as default)
   - Build Command: `echo "Static site - no build required"`
   - Output Directory: `./` (leave as default)

5. **Click "Deploy"**

#### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel --prod
   ```

### 3. Environment Setup

The deployment will automatically:
- Create the `data/` directory for email storage
- Set up serverless functions for the API
- Configure routing for static files and API endpoints

### 4. Testing the Email Collection

1. **Visit your deployed site:** `https://your-project.vercel.app/coming-soon.html`
2. **Test email submission:**
   - Enter a valid email address
   - Click "notify me"
   - Check for success message
   - Verify email is stored in `data/subscribers.json`

### 5. Accessing Collected Emails

#### Via Vercel Dashboard:
1. Go to your project dashboard
2. Navigate to "Functions" tab
3. Check the logs for subscription activity

#### Via GitHub:
1. The `data/subscribers.json` file will be automatically created
2. You can view it in your GitHub repository
3. Each email entry includes:
   ```json
   {
     "email": "user@example.com",
     "subscribedAt": "2024-12-19T10:30:00.000Z",
     "ip": "192.168.1.1"
   }
   ```

### 6. Custom Domain (Optional)

1. **In Vercel Dashboard:**
   - Go to your project settings
   - Click "Domains"
   - Add your custom domain (e.g., `coming-soon.vibecircles.co.za`)

2. **Configure DNS:**
   - Add CNAME record pointing to your Vercel deployment
   - Wait for DNS propagation

## API Endpoints

### POST /api/subscribe
Collects and stores email addresses.

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "message": "Successfully subscribed!",
  "totalSubscribers": 42
}
```

## Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run locally:**
   ```bash
   vercel dev
   ```

3. **Access locally:**
   - Main site: `http://localhost:3000`
   - Coming soon: `http://localhost:3000/coming-soon.html`

## File Structure

```
├── api/
│   └── subscribe.js          # Email collection API endpoint
├── assets/
│   ├── css/                  # Stylesheets
│   ├── js/                   # JavaScript files
│   ├── images/               # Images and icons
│   └── fonts/                # Font files
├── data/                     # Email storage (auto-created)
│   └── subscribers.json      # Collected email addresses
├── coming-soon.html          # Coming soon page
├── index.html               # Home page
├── package.json             # Project dependencies
├── vercel.json              # Vercel configuration
└── README.md                # Documentation
```

## Troubleshooting

### Common Issues:

1. **Emails not being collected:**
   - Check browser console for errors
   - Verify API endpoint is accessible
   - Check Vercel function logs

2. **Countdown not working:**
   - Verify `timer.js` file is loaded
   - Check for JavaScript errors in console

3. **Styling issues:**
   - Ensure all CSS files are properly linked
   - Check for missing assets

### Support:

- Check Vercel documentation: [vercel.com/docs](https://vercel.com/docs)
- GitHub repository issues for code-related problems
- Vercel support for deployment issues

## Security Notes

- Email addresses are stored in plain text
- Consider adding rate limiting for production use
- Implement email verification for critical applications
- Add CAPTCHA for spam prevention if needed

## License

MIT License - feel free to use and modify as needed.
