# Student Portfolio & Academic Management Website

> **Course:** COS 106 – Introduction to Web Technologies  
> **Institution:** MIVA Open University  
> **Student Name:** `Clem Iwegbu Oluchukwuka`  
> **Degree & Level:** `BSc Data Science, 100 Level`  
> **Email:** `o.clem-iwegbu0829@miva.edu.ng`  
> **GitHub Profile:** `[YOUR GITHUB URL]`  
> **Live Site URL:** `[YOUR LIVE SITE LINK]` *(e.g. https://<username>.github.io/<repo-name>/)*  

---

## 📌 Project Overview

This project is a multi-page, fully responsive student portfolio and academic task management web application built strictly in accordance with the COS 106 specification at MIVA Open University.

The entire website is developed using **pure, vanilla web technologies** (Semantic HTML5, Responsive CSS3, and modern ECMAScript/JavaScript). It requires **zero frameworks, zero external libraries, zero build tools, and no npm/Node.js dependencies**. It is designed to run instantly by opening `index.html` in any web browser and deploys seamlessly to GitHub Pages.

---

## 🌟 Key Features by Page

| Page | File | Key Features & Implementation |
|---|---|---|
| **Home** | `index.html` | Professional two-column hero layout, student portrait (`images/profile.jpg`), short biography, call-to-action buttons, HTML5 multimedia video and audio elements with controls, poster image (`images/video-poster.jpg`), and accessible transcription. |
| **About Me** | `about.html` | Education background formatted in an accessible HTML `<table>`, career aspirations cards, technical skills list with proficiency bars and percentages, and personal hobbies/interests. |
| **Projects** | `projects.html` | CSS Grid showcase featuring 4 project cards with preview screenshots, tags, detailed descriptions, and live demo / source code links. |
| **Academic Planner** | `planner.html` | Dynamic task manager powered by JavaScript. Stores tasks in an array of objects, supports adding tasks with validation (rejects blank titles), toggles completed status with visual strike-through, instant deletion, live task counters (Total, Completed, Pending), and `localStorage` persistence. |
| **Contact** | `contact.html` | Interactive contact form with 4 fields (Name, Email, Phone Number, Message). Validates on submit using named function `validateForm` and regex: enforces non-empty fields, valid email pattern, and digits-only phone numbers. Displays inline error messages and a success alert. |

---

## 🛠️ Technologies Used

- **HTML5:** Semantic architecture (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<figure>`, `<table>`, `<form>`).
- **CSS3:**
  - Modern CSS Variables (`:root`) for global color palette and spacing tokens.
  - Mobile-first responsive layouts with media query breakpoints at `768px` and `1024px`.
  - CSS Flexbox for navigation, headers, and hero alignment.
  - CSS Grid for project cards and highlight sections.
  - Smooth hover transitions and keyframe animations (`fadeInEffect`, `slideDown`, `shake`).
  - Accessibility compliance with minimum 44px touch targets and high-contrast color ratios.
- **JavaScript (Vanilla ES6):**
  - Modular scripts without bundling (`js/main.js`, `js/planner.js`, `js/contact.js`).
  - DOM selection and dynamic node creation (`document.createElement`, `appendChild`).
  - Event listeners (`addEventListener`) for clicks, inputs, and form submissions (no inline handlers).
  - Array operations (`push`, `filter`, `find`, `forEach`).
  - Browser `localStorage` API for client-side state preservation across page refreshes.
  - Regular expressions for format and numerical validation.

---

## 📂 Project Folder Structure

```text
portfolio/
├── index.html              # Home page (Hero, Bio, Multimedia Video/Audio)
├── about.html              # About page (Education Table, Skills, Hobbies)
├── projects.html           # Projects showcase (CSS Grid cards)
├── planner.html            # Academic task planner (JavaScript Array + DOM)
├── contact.html            # Contact form (Client-side validation)
├── css/
│   └── style.css           # Single external stylesheet with CSS variables
├── js/
│   ├── main.js             # Shared logic (mobile hamburger, active link, year)
│   ├── planner.js          # Task manager logic (CRUD operations + localStorage)
│   └── contact.js          # Form validation logic (regex checks + DOM errors)
├── images/
│   ├── profile.jpg         # Student portrait placeholder
│   ├── video-poster.jpg    # Video player cover poster
│   ├── project1.png        # GPA Calculator project preview
│   ├── project2.png        # Campus Resource Hub project preview
│   ├── project3.png        # Student Budget Tracker project preview
│   └── project4.png        # Web Tech Cheatsheet project preview
├── media/
│   ├── intro.mp4           # Video introduction file
│   ├── intro.mp3           # Audio voice-over alternative
│   └── intro.wav           # High-quality audio sample
├── README.md               # Project documentation & deployment guide
└── DEFENCE_NOTES.md        # Comprehensive technical defence guide & FAQ
```

---

## 🚀 How to Run Locally

Because this project uses only plain HTML, CSS, and JavaScript, no build process or package installation is required:

### Method 1: Double-Click (Direct Browser Open)
1. Navigate to the project folder on your computer.
2. Double-click `index.html` (or right-click and choose **Open with Google Chrome**, **Microsoft Edge**, or **Firefox**).
3. The site will run with all features intact.

### Method 2: Visual Studio Code Live Server (Recommended)
1. Open the project folder in **Visual Studio Code**.
2. If installed, right-click `index.html` and click **"Open with Live Server"**.
3. The site will open automatically at `http://127.0.0.1:5500`.

### Method 3: Python Built-in HTTP Server
Open your terminal inside the project folder and run:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.

---

## 🌐 How to Deploy to GitHub Pages

Follow these step-by-step instructions to publish this portfolio live to the web for free:

### Step 1: Create a New GitHub Repository
1. Log into your account at [GitHub.com](https://github.com).
2. Click the **"+"** icon in the upper right corner and select **"New repository"**.
3. Name your repository (e.g. `cos106-student-portfolio`).
4. Set visibility to **Public**.
5. Do **not** initialize with a README (you already have this one). Click **"Create repository"**.

### Step 2: Push Your Code to GitHub
Open your computer terminal or command prompt inside this project folder:
```bash
# Initialize git repository (if not already initialized)
git init

# Add all files to staging
git add .

# Create the first commit
git commit -m "feat: complete COS 106 student portfolio and academic management website"

# Rename branch to main
git branch -M main

# Link to your remote GitHub repository
git remote add origin https://github.com/[YOUR_GITHUB_USERNAME]/[YOUR_REPO_NAME].git

# Push the files
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repository on GitHub.
2. Click on **Settings** (tab with the gear icon near the top right).
3. In the left navigation menu, click **Pages** (under the "Code and automation" section).
4. Under **"Build and deployment"** > **"Branch"**:
   - Select `main` from the dropdown branch menu.
   - Leave the folder as `/ (root)`.
   - Click **Save**.
5. Wait 1 to 2 minutes. Refresh the page until GitHub displays the green banner:
   > *"Your site is live at https://[YOUR_GITHUB_USERNAME].github.io/[YOUR_REPO_NAME]/"*

---

## ✏️ Student Replacement Checklist

Before your final submission and defence presentation, customize the placeholder tags:

- [ ] **Name:** Replace `Clem Iwegbu Oluchukwuka` in all HTML files, `README.md`, and `DEFENCE_NOTES.md`.
- [ ] **Course/Level:** Replace `BSc Data Science, 100 Level` with your actual degree and level.
- [ ] **Profile Picture:** Replace `images/profile.jpg` with a professional photo of yourself.
- [ ] **Email Address:** Replace `o.clem-iwegbu0829@miva.edu.ng` with your actual university or personal email.
- [ ] **GitHub Profile:** Replace `[YOUR GITHUB URL]` with your personal GitHub account URL.
- [ ] **High School:** In `about.html`, replace `[YOUR HIGH SCHOOL / COLLEGE]` with your graduating secondary school.
- [ ] **Introduction Video/Audio:** Replace `media/intro.mp4` / `media/intro.mp3` with your personal 30-to-60 second recording if required.
- [ ] **Live Site URL:** Paste your live GitHub Pages link into the header of `README.md`.

---

## 📄 License & Academic Integrity

This project is submitted in partial fulfillment of the academic requirements for **COS 106: Introduction to Web Technologies** at **MIVA Open University**. All code was written for educational assessment and demonstration.
