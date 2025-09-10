# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Space Empire is a temporary promotional webpage for an MMO space game currently in development. This is a static website built with vanilla HTML, CSS, and JavaScript with no build process or external dependencies.

## Architecture

### File Structure
- `index.html` - Single-page application with semantic HTML5 sections (hero, features, gameplay, download)
- `styles.css` - CSS with custom properties for theming, CSS Grid/Flexbox for layout, and keyframe animations
- `script.js` - Vanilla JavaScript for interactivity, smooth scrolling, particle effects, and scroll-triggered animations
- `README.md` - Comprehensive project documentation

### Key Design Patterns
- **CSS Custom Properties**: Color theming system using CSS variables (--bg, --primary, --accent, etc.)
- **Progressive Enhancement**: Core functionality works without JavaScript, enhanced with interactive features
- **Intersection Observer API**: Used for scroll-triggered counter animations with performance optimization
- **CSS Grid & Flexbox**: Responsive layouts without media queries using auto-fit and minmax()

## Development Commands

### Local Development
```bash
# Method 1: Direct file opening
# Open index.html directly in any modern web browser

# Method 2: Python HTTP server
python -m http.server 8000
# Then visit http://localhost:8000

# Method 3: Node.js serve
npx serve .
```

### Testing
```bash
# No automated tests - manual testing in browsers
# Test in Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
```

## Key Features & Implementation

### Interactive Elements
- **Smooth Scrolling Navigation**: Event listeners on nav links with `scrollIntoView()`
- **Particle System**: Dynamically generated floating particles with CSS animations
- **Parallax Effects**: Scroll-based transform animations on hero section
- **Hover Animations**: CSS transitions on feature cards triggered by JavaScript
- **Counter Animations**: Intersection Observer triggers number counting animations

### Styling System
- **Space Theme**: Dark color scheme with blue/cyan accents and sci-fi aesthetics
- **Gradient Backgrounds**: Multi-layered radial gradients for depth
- **CSS Animations**: Keyframe animations for floating particles and drifting effects
- **Responsive Design**: Grid-based layout that adapts to different screen sizes

## Content Management

### Color Customization
Modify CSS custom properties in `styles.css`:
```css
:root {
  --bg: #080b16;        /* Main background */
  --primary: #7aa2ff;   /* Primary brand color */
  --accent: #16d3e6;    /* Accent color */
  --text: #d7e1ff;      /* Main text */
  --muted: #8ea2d6;     /* Muted text */
}
```

### Content Updates
- Game features: Update feature cards in the `#features` section of `index.html`
- Statistics: Modify the stat numbers in the `#gameplay` section
- Game information: Update hero copy and gameplay descriptions

### Animation Adjustments
- Particle count: Modify the loop in `script.js` (currently creates 8 particles)
- Animation timing: Adjust CSS animation durations and delays
- Parallax intensity: Change multipliers in the scroll event listener (0.1 and 0.15)

## Browser Compatibility

Requires modern browser features:
- CSS Custom Properties
- CSS Grid and Flexbox
- Intersection Observer API
- ES6+ JavaScript features
- CSS backdrop-filter for header blur effect

## Git Workflow

This is a simple git repository with clean working directory. Standard git commands apply for version control.

## Development Status

This is a temporary promotional website. The download functionality shows a placeholder message since the actual game is still in development.
