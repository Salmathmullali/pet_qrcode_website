# 🐾 Goldy's Funny Digital Pet Portfolio

> **"Professional Good Boy. Part-Time Trouble Maker."**

Welcome to the official personal portfolio website of **Goldy**, an energetic, food-loving Golden Retriever! This project is a playful, cartoon-inspired, interactive digital identity card designed to bring smiles while demonstrating modern, polished front-end web development with pure **HTML5, CSS3, and vanilla JavaScript**.

---

## 🌟 Live Demo & Preview

- **Design Style**: Clean white aesthetic, pastel green (`#72C898` / `#A8E6CF`) primary accents, dark navy blue (`#0F1D38`) typography, cheerful yellow touches (`#FFD166`), and cartoon doodles.
- **Interactions**: Scroll-triggered animations, cartoon bone showers, retro CRT TV surveillance wall, interactive doorbell, snoot boop warnings, Web Audio sound synthesis, and celebratory treat counter.

---

## 🐶 Portfolio Sections

1. **Hero Section — Meet Goldy**:
   - Sequence-animated greeting: *"Hi, I'm"* drifts in from the left, Goldy rises smoothly from below wearing cool black sunglasses, followed by the prominent **GOLDY** title and punchy caption.
   - Smooth CSS heartbeat animation (subtle scaling with zero distortion).
   - Floating cartoon hearts, stars, paw prints, and interactive quote bubble.
2. **Who Am I?**:
   - Introduction written entirely in Goldy's humorous voice.
   - 4 Interactive Personality Cards:
     - 💤 *Professional Napper* (98% Master Level)
     - 🍖 *Expert Treat Hunter* (300m Cheese Radar)
     - 👁️ *Full-Time Hooman Supervisor* (Bathroom Security Officer)
     - 👟 *Part-Time Shoe Inspector* (Sneaker Diplomat)
3. **Where Do I Live? (My Crib)**:
   - Custom SVG cartoon dog house illustration with chimney smoke puffs and welcome mat.
   - Joyful portrait of Goldy sitting proudly beside his house.
   - Playful official canine residence card: *"123 Golden Paw Lane, Tennis Ball Valley"*.
   - Exact caption: *"My house, my rules. My humans just pay the bills."*
   - Interactive Doorbell: Click to trigger an authentic two-tone chime and happy dog bounce!
4. **What I Love the Most!**:
   - Huge cartoon bone watermark in the background.
   - Gentle falling-bone animation raining down at varied speeds and sizes.
   - Centerpiece retro TV monitor featuring **Goldy looking left and right** (`leftandright.mp4`).
   - Funny quotes:
     - *"Treats? I heard treats!"*
     - *"Chicken is my love language."*
     - *"I can hear a snack wrapper from three rooms away."*
   - Interactive *"Make It Rain Bones!"* button for instant bone confetti.
5. **My Personal Space (Boundaries)**:
   - Grumpy Goldy portrait with Defcon Grumpy badge and comic steam cloud.
   - Comic warning headline: **"DO NOT TOUCH MY MOUTH!"**
   - Subtext: *"I'm adorable, but I have boundaries. Please respect my personal space."*
   - Interactive *"Test Snoot Boop"* button with screen shake and humorous warning warnings!
6. **Goldy Is a Little Lost!**:
   - Emotional yet playful safety card with Goldy's microchip ID and identifying quirks.
   - Prominent *"Help Goldy / Contact My Humans"* button.
   - Accessible modal dialog with placeholder hotline, email, and interactive sighting alert form.
7. **Final Section — TV Wall (Thanks for Visiting!)**:
   - Retro surveillance monitor grid (4 CRT TVs with scanlines and channel labels) playing Goldy's video.
   - Prominent text: **"THANKS FOR CHECKING ME OUT!"**
   - Subtext: *"Now give me a treat. You know I deserve one."*
   - Interactive Treat Counter: Click to feed Goldy, triggering flying cartoon treats and celebratory sound chimes!

---

## 📁 File Structure

```text
dog_portfolio/
├── index.html          # Semantic HTML5 layout with accessibility tags
├── style.css           # Custom CSS3 styles, variables, cartoon borders & keyframes
├── script.js           # Vanilla JS: Web Audio API, IntersectionObserver, animations
├── README.md           # Documentation & publishing guide
└── assets/             # Local optimized media assets
    ├── goldy-cool.png      # Hero portrait with sunglasses
    ├── goldy-grumpy.png    # Grumpy portrait for Personal Space
    ├── goldy-joyful.png    # Joyful portrait for Home & Lost section
    ├── leftandright.mp4    # Goldy looking left and right video
    └── normal.mp4          # Goldy video for TV Wall grid
```

> **Note**: All asset references use relative paths (`assets/...`), ensuring 100% compatibility across local machines and online static hosting platforms like GitHub Pages.

---

## 🚀 How to Run Locally

You do not need to install any heavy framework, Node dependencies, or database. You can run the website using any of the following lightweight methods:

### Option 1: Direct Browser Open (Double Click)
Simply double-click `index.html` or drag and drop it into any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari).

### Option 2: Using Python (Recommended for Video Autoplay)
If Python is installed on your computer:
```bash
# Navigate to the project directory in your terminal:
cd dog_portfolio

# Start a local HTTP server:
python -m http.server 8000
```
Then open your browser and navigate to:
```
http://localhost:8000
```

### Option 3: Using VS Code Live Server Extension
1. Open the `dog_portfolio` folder in **Visual Studio Code**.
2. Install the **Live Server** extension by Ritwick Dey.
3. Right-click `index.html` and click **"Open with Live Server"**.

### Option 4: Using Node.js `npx serve`
```bash
npx serve .
```

---

## 🌐 Publishing to GitHub Pages (Free Hosting)

Publishing this website online for free so you can showcase it on your portfolio or LinkedIn takes less than 2 minutes:

### Step 1: Create a GitHub Repository
1. Log in to [GitHub](https://github.com/).
2. Click **New Repository** (top right `+` icon).
3. Name your repository (for example: `goldy-portfolio` or `dog_portfolio`).
4. Keep it **Public** and leave "Initialize with README" unchecked.
5. Click **Create repository**.

### Step 2: Push Your Project to GitHub
In your local project folder (`dog_portfolio`), run:
```bash
git init
git add .
git commit -m "Initial commit: Goldy's Funny Digital Pet Portfolio"
git branch -M main
git remote add origin https://github.com/<YOUR-GITHUB-USERNAME>/<YOUR-REPO-NAME>.git
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repository on GitHub.
2. Click on **Settings** (tab on the top right).
3. In the left navigation sidebar, click on **Pages** (under the "Code and automation" section).
4. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch`.
   - **Branch**: Select `main` branch and `/ (root)` folder.
5. Click **Save**.
6. Wait 1 to 2 minutes. GitHub will generate your live URL:
   ```
   https://<YOUR-GITHUB-USERNAME>.github.io/<YOUR-REPO-NAME>/
   ```

---

## ♿ Accessibility & Motion Considerations

- **Reduced Motion Support**: The website includes full `@media (prefers-reduced-motion: reduce)` support. Users who have enabled reduced motion in their system settings will experience static, non-distracting layouts without falling bones or pulsing heartbeats.
- **Synthesized Audio**: Sound effects are built with the browser's native **Web Audio API** (zero heavy external audio files). All audio is muted until interaction or can be globally toggled using the Sound FX button in the corner.
- **Responsive Layout**: Fluidly adapts across all viewport sizes, from 320px mobile screens to large desktop monitors.

---

## 📜 License & Credits

Created with 🐾 love for dog lovers everywhere! Free to use for personal portfolios, educational demos, and creative coding inspiration.
