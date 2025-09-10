# Attrition Launcher Deployment Guide

## Current Status
Your website is now configured to download the **LAUNCHER** from GitHub Releases. The correct workflow is:
1. User downloads **Attrition Launcher** from website
2. Launcher automatically downloads/installs **Attrition Game** from GitHub releases

Website will automatically:
- Detect the user's operating system (Windows/macOS/Linux)
- Download from: `https://github.com/BrianSMitchell/attrition-desktop/releases/latest/download/Attrition-Launcher.exe`
- Show "Coming Soon" messages for macOS/Linux until you build those versions

## Next Steps

### 1. Upload BOTH Launcher AND Game to GitHub Releases
You need to upload both files:

**Launcher (what users download first):**
```
C:\Users\roand\OneDrive\Documents\Attrition\packages\launcher\Attrition Launcher.exe
```

**Game (what launcher downloads automatically):**
```
C:\Users\roand\OneDrive\Documents\Attrition\packages\releases\Attrition-Setup-1.0.9.exe
```

To upload it to GitHub:

#### Option A: Using GitHub CLI (Recommended)
```bash
# First authenticate with GitHub
gh auth login

# Create and upload release
gh release create v1.0.9 --repo BrianSMitchell/attrition-desktop --title "Attrition v1.0.9" --notes "Latest version with launcher support"
gh release upload v1.0.9 "C:\Users\roand\OneDrive\Documents\Attrition\packages\releases\Attrition-Setup-1.0.9.exe" --repo BrianSMitchell/attrition-desktop
```

#### Option B: Using GitHub Web Interface
1. Go to: https://github.com/BrianSMitchell/attrition-desktop/releases
2. Click "Create a new release"
3. Tag version: `v1.0.9`
4. Release title: `Attrition v1.0.9`
5. Upload the file: `Attrition-Setup-1.0.9.exe`
6. Publish release

### 2. Deploy Website Updates
```bash
# Deploy to Vercel (now that we removed the large files)
vercel --prod
```

### 3. Test the Download
After deploying, test at your website URL:
- Windows users should download the 137MB installer
- macOS/Linux users should see "Coming Soon" message

## Future: Adding macOS and Linux Support

When you build macOS and Linux versions, upload them to the same GitHub release:
- `Attrition-Setup-1.0.9.dmg` (for macOS)
- `Attrition-Setup-1.0.9.AppImage` (for Linux)

Then update the JavaScript to set `isAvailable = true` for those platforms.

## File Sizes
- Windows installer: 137MB (fits within GitHub's 2GB release limit)
- Vercel deployment: Now under 100MB limit (no large files included)
