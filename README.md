# offbooklabs website

Static site: index.html, styles.css, main.js, projects.js, assets/. No build step.

## Deploy on Vercel
1. Create a new GitHub repo (e.g. `offbooklabs-site`) and upload everything in this folder.
2. vercel.com -> Add New -> Project -> import that repo.
3. Framework preset: **Other**. Leave build command and output directory empty. Deploy.
4. Domain: Project -> Settings -> Domains -> add yours (e.g. offbooklabs.com).

Every push to GitHub redeploys automatically.

## Add a new project
1. Put `<name>-1080p-HQ.mp4` in a folder and run `./prep_videos.sh <that folder> assets`
   (needs ffmpeg). It makes the preview, full video and poster.
2. Add an entry to `projects.js` with the same `slug`.
