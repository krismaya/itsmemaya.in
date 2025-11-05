# Maya Krishnan - Personal Profile Website

A modern, animated one-pager profile website showcasing professional journey, projects, and recent content from Medium and LinkedIn.

## Features

- **Modern Design**: Clean, professional design that doesn't look like a traditional resume
- **Dark/Light Theme**: Toggle between dark and light modes with persistent preference
- **Smooth Animations**: CSS keyframe animations, scroll-triggered effects, and particle backgrounds
- **Medium Integration**: Automatically fetches and displays your latest Medium blog posts via RSS
- **Responsive**: Fully responsive design that works on all devices
- **Interactive Elements**: Hover effects, smooth scrolling, and dynamic content loading
- **Performance Optimized**: Debounced scroll events and lazy loading

## Tech Stack

- **HTML5**: Semantic structure
- **CSS3**: Modern animations, Grid, Flexbox
- **Vanilla JavaScript**: No frameworks, lightweight and fast
- **Font Awesome**: Icons
- **RSS2JSON API**: Medium blog post integration

## Quick Start

1. **Clone or Download**
   ```bash
   cd /path/to/itsmemaya.in
   ```

2. **Open in Browser**
   - Simply open `index.html` in your web browser
   - Or use a local server for development:
     ```bash
     # Python 3
     python3 -m http.server 8000

     # Or using Node.js
     npx serve
     ```
   - Navigate to `http://localhost:8000`

## Customization Guide

### 1. Update Personal Information

**index.html** - Edit the following sections:

```html
<!-- Hero Section - Line 19-30 -->
<h1 class="hero-title">
    <span class="wave">👋</span>
    Hi, I'm <span class="highlight">Your Name</span>
</h1>
<p class="hero-subtitle">Your Title | Your Expertise | Your Passion</p>
<p class="hero-description">
    Your personal description here...
</p>
```

**Social Links** - Update URLs (lines 33-44):
```html
<a href="YOUR_LINKEDIN_URL" target="_blank">...</a>
<a href="YOUR_MEDIUM_URL" target="_blank">...</a>
<a href="YOUR_GITHUB_URL" target="_blank">...</a>
```

### 2. Customize About Section

**index.html** - Lines 54-83:
- Update the bio paragraphs with your own story
- Modify expertise tags to reflect your skills

### 3. Update Projects

**index.html** - Lines 91-162:
- Replace project cards with your own projects
- Update icons, titles, descriptions, and tech badges
- Add or remove project cards as needed

### 4. Configure Medium Feed

**script.js** - Line 115:
```javascript
const mediumUsername = 'YOUR_MEDIUM_USERNAME';
```

Replace `YOUR_MEDIUM_USERNAME` with your actual Medium username (without the @).

### 5. Customize Colors

**styles.css** - Lines 7-22:

Edit CSS variables to match your brand:
```css
:root {
    --accent-primary: #6366f1;    /* Primary color */
    --accent-secondary: #8b5cf6;  /* Secondary color */
    /* ... more variables */
}
```

### 6. Add LinkedIn Integration

The website has a placeholder for LinkedIn posts. To fully integrate:

**Option 1**: Add LinkedIn Badge
```html
<!-- In the linkedin-content section -->
<script src="https://platform.linkedin.com/badges/js/profile.js" async defer type="text/javascript"></script>
<div class="badge-base LI-profile-badge" data-locale="en_US" data-size="large" data-theme="light" data-type="HORIZONTAL" data-vanity="YOUR-LINKEDIN-ID" data-version="v1"></div>
```

**Option 2**: Manually add recent posts as blog cards

## Project Structure

```
itsmemaya.in/
│
├── index.html          # Main HTML structure
├── styles.css          # All styles and animations
├── script.js           # JavaScript functionality
└── README.md          # Documentation (this file)
```

## Features Breakdown

### Theme Toggle
- Persistent theme preference using localStorage
- Smooth transitions between themes
- Dynamic icon changes

### Particle Background
- Randomly generated particles in hero section
- CSS animations for floating effect
- Responsive and performant

### Medium Blog Integration
- Fetches latest posts via RSS2JSON API
- Displays 6 most recent articles
- Fallback content if API fails
- Formatted dates and excerpts

### Animations
- Fade-in effects on scroll
- Slide-up animations for cards
- Hover transformations
- Parallax scrolling in hero section
- Loading spinners for async content

### Responsive Design
- Mobile-first approach
- Breakpoints: 768px, 480px
- Touch-friendly interactive elements
- Optimized typography scaling

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Tips

1. **Optimize Images**: If you add images, use WebP format and lazy loading
2. **Minify Files**: For production, minify CSS and JS
3. **CDN**: Consider using a CDN for Font Awesome
4. **Caching**: Enable browser caching for static assets

## Deployment

### GitHub Pages
1. Push to GitHub repository
2. Enable GitHub Pages in repository settings
3. Select main branch
4. Your site will be live at `https://yourusername.github.io/repo-name`

### Netlify
1. Sign up at netlify.com
2. Drag and drop your project folder
3. Site deployed instantly with custom domain support

### Vercel
```bash
npm i -g vercel
vercel
```

## Customization Examples

### Change Animation Speed
```css
/* styles.css */
.blog-card {
    transition: all 0.5s ease; /* Change from 0.3s to 0.5s */
}
```

### Add More Sections
```html
<!-- index.html - Before footer -->
<section id="contact" class="contact section">
    <div class="container">
        <h2 class="section-title">Get In Touch</h2>
        <!-- Your contact content -->
    </div>
</section>
```

### Modify Particle Count
```javascript
// script.js - Line 28
const particleCount = 50; // Increase from 30
```

## Troubleshooting

**Medium posts not loading?**
- Check browser console for errors
- Verify Medium username in script.js
- API might be rate-limited (fallback will show)

**Animations not working?**
- Ensure JavaScript is enabled
- Check for browser console errors
- Clear cache and refresh

**Theme not persisting?**
- Check if localStorage is enabled
- Try in a different browser
- Clear site data and try again

## Future Enhancements

- Add blog post search/filter
- Implement contact form
- Add testimonials section
- Create project detail modals
- Add reading progress indicator
- Implement PWA features

## License

This project is open source and available for personal use. Feel free to customize and use for your own profile.

## Credits

- Icons: [Font Awesome](https://fontawesome.com/)
- RSS Integration: [RSS2JSON](https://rss2json.com/)

## Contact

- Medium: [@krismaya1](https://medium.com/@krismaya1)
- LinkedIn: [mayakrishnan-r](https://www.linkedin.com/in/mayakrishnan-r/)
- GitHub: [krismaya](https://github.com/krismaya)

---

Built with passion for AI and technology | 2025
