# GitHub Setup Instructions

Follow these steps to push your project to GitHub:

## 1. Create a new repository on GitHub

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right corner and select "New repository"
3. Name your repository (e.g., "rest-countries-app")
4. Add a description (optional)
5. Choose whether to make it public or private
6. Do NOT initialize with README, .gitignore, or license (we already have these)
7. Click "Create repository"

## 2. Connect your local repository to GitHub

Run these commands in your terminal (replace `YOUR_USERNAME` with your GitHub username):

```bash
# Add all files to staging
git add .

# Commit the files
git commit -m "Initial commit"

# Add the remote repository
git remote add origin https://github.com/YOUR_USERNAME/rest-countries-app.git

# Push to GitHub
git push -u origin main
```

## 3. Deploy to Vercel

1. Go to [Vercel](https://vercel.com) and sign in with your GitHub account
2. Click "New Project"
3. Import your GitHub repository
4. Keep the default settings (Vercel will detect Next.js automatically)
5. Click "Deploy"

## 4. Deploy to Netlify

1. Go to [Netlify](https://netlify.com) and sign in with your GitHub account
2. Click "New site from Git"
3. Select GitHub and choose your repository
4. For build command, use: `npm run build`
5. For publish directory, use: `.next`
6. Click "Deploy site"

## 5. Troubleshooting

If you encounter any issues:

1. **API Routes not working**: Make sure the data.json file is properly copied to the public directory
2. **Images not loading**: Check the next.config.js and vercel.json configurations for image domains
3. **Build errors**: Check the build logs for specific error messages
4. **Styling issues**: Ensure all Tailwind CSS configurations are properly set up

Remember to check the deployment logs for any specific errors that might occur during the build process.
