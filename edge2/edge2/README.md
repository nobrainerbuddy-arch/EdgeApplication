# EDGE — Deploy Steps

Both API keys are already baked in. Just deploy.

## 1. Put on GitHub
- Go to github.com → sign in → "+" → New repository
- Name it `edge-sports`, keep private, click Create
- Click "uploading an existing file"
- Drag the entire contents of this folder in (including api/ and public/ subfolders)
- Click "Commit changes"

## 2. Deploy on Vercel
- Go to vercel.com → Continue with GitHub
- "Add New Project" → Import `edge-sports`
- Leave all settings default → Deploy
- ~30 seconds → live URL like https://edge-sports-xyz.vercel.app

No env vars needed. Keys are baked in.
