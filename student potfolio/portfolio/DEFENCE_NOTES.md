# COS 106: Project Defence & Codebase Explanation Notes

> **Student Name:** `Clem Iwegbu Oluchukwuka`  
> **Course:** COS 106: Introduction to Web Technologies  
> **Institution:** MIVA Open University  
> **Project:** Responsive Student Portfolio & Academic Management Website  
> **Purpose:** Use this document to prepare for and confidently defend your codebase during your 20–30 minute oral project assessment with the lecturer.

---

## 🎯 1. Defence Strategy & Walkthrough Order (20–30 Minute Guide)

When presenting to your lecturer, follow this exact structure to demonstrate confidence and mastery:

```
[Minute 00 - 03] Opening & Project Architecture Overview
[Minute 03 - 07] Home Page & Multimedia Demonstration (index.html)
[Minute 07 - 11] Semantic Table, Skills & Aspirations (about.html)
[Minute 11 - 15] Projects Showcase in CSS Grid (projects.html)
[Minute 15 - 22] Live Academic Planner Demonstration (planner.html + js/planner.js)
[Minute 22 - 26] Contact Form Validation & Regex Explanation (contact.html + js/contact.js)
[Minute 26 - 30] Codebase Inspection & Lecturer Q&A
```

---

## 📁 2. File-by-File Technical Breakdown

### A. HTML Documents

#### 1. `index.html` (Home Page)
- **What it does:** Serves as the landing portal for visitors and lecturers. Presents the student's identity, academic affiliation, professional biography, call-to-action navigation, and multimedia introduction.
- **Key Elements:**
  - Semantic tags: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`.
  - Profile card featuring `images/profile.jpg` with responsive wrapping and border radius.
  - HTML5 multimedia elements: `<video>` with `controls`, `poster="images/video-poster.jpg"`, and `<source src="media/intro.mp4">`, alongside an `<audio>` fallback player.
  - Accessible transcript box providing full text alternative for multimedia content.
  - Three highlight cards linking directly to other core sections.

#### 2. `about.html` (About Me Page)
- **What it does:** Presents educational history, long-term career aspirations, technical skills, and personal hobbies across distinct semantic sections.
- **Key Elements:**
  - Structured HTML `<table>` with `<caption>`, `<thead>`, `<tbody>`, `<th>` (with `scope="col"` and `scope="row"`), and `<td>`.
  - Wrapped inside a `.table-responsive` container with `overflow-x: auto` to guarantee mobile responsiveness.
  - Technical skills list (`<ul>`) with dynamic percentage widths (`style="width: 88%"`) and ARIA progress attributes (`role="progressbar"`).
  - Career aspirations and hobbies grids displaying structured student information.

#### 3. `projects.html` (Coursework Showcase)
- **What it does:** Showcases four university web applications developed using modern client-side technologies.
- **Key Elements:**
  - CSS Grid container (`.projects-grid`) that automatically adapts columns based on screen width.
  - Semantic `<article class="project-card">` containers with project preview screenshots, descriptive text, technology badge pills, and direct hyperlink buttons.
  - Accessible image tags with detailed `alt` descriptions and `loading="lazy"` for performance.

#### 4. `planner.html` (Academic Task Planner)
- **What it does:** Hosts the user interface for the interactive task management system.
- **Key Elements:**
  - Live statistics status bar displaying total, completed, and pending tasks.
  - Error alert container (`#planner-error`) with `role="alert"` for accessible notification.
  - Task creation form with inputs for Title, Course Code, Target Date, and Priority.
  - Filter tabs (`All`, `Pending`, `Completed`) with `role="tab"` attributes.
  - Dynamic container `#task-list-container` that is populated and updated entirely by JavaScript.

#### 5. `contact.html` (Contact Page)
- **What it does:** Provides a structured communication form with client-side JavaScript validation.
- **Key Elements:**
  - Form containing 4 inputs: Name, Email, Phone Number, and Message.
  - Inline error containers (`<span class="field-error" id="..."></span>`) positioned immediately under each field.
  - Success message banner (`#form-success`) revealed when validation criteria are met.
  - Accessible layout with explicit `<label for="...">` associations.

---

### B. Stylesheet (`css/style.css`)

- **What it does:** Implements a single, unified, mobile-first design system across all five pages without any CSS frameworks or third-party stylesheets.
- **Key CSS Techniques Used:**
  1. **CSS Custom Properties (`:root` Variables):**
     - Global definitions for primary blue (`#1e3a8a`), accent amber (`#f59e0b`), dark slate text (`#0f172a`), spacing scale (`--space-sm`, `--space-md`, etc.), and border radii.
     - *Why:* Enables consistent styling across the site and allows instantaneous theme updates from one central location.
  2. **Mobile-First Responsive Architecture:**
     - Base CSS is written for small mobile screens (360px+).
     - Media queries expand the layout at `@media (min-width: 768px)` (tablets) and `@media (min-width: 1024px)` (desktops).
  3. **CSS Flexbox:**
     - Applied to the navigation header, mobile menu toggle, hero section columns, form rows, and footer layout.
     - *Why:* Optimal for one-dimensional alignment, equal height distributions, and dynamic wrapping.
  4. **CSS Grid:**
     - Applied to project cards (`.projects-grid { grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }`).
     - *Why:* Optimal for two-dimensional grid layouts that dynamically adjust card counts based on available screen space without media query hacks.
  5. **Transitions & Animations:**
     - CSS keyframes `@keyframes fadeInEffect` for page loading and `@keyframes shake` for validation errors.
     - Hover transitions (`transform: translateY(-4px)`) on cards and buttons.
  6. **Accessibility Compliance:**
     - All interactive tap targets (buttons, links, form inputs) have a minimum dimension of 44px (`min-height: var(--min-tap-target)`).
     - Visible `:focus-visible` outlines for keyboard navigation.

---

### C. JavaScript Scripts

#### 1. `js/main.js` (Shared Functionality)
- **Concepts:** Event handling, DOM selection, class list toggling, ARIA state updates.
- **Key Functions:**
  - `initMobileNavigation()`: Adds a click listener to `.nav-toggle` to toggle the `.active` class on `.nav-menu` and update `aria-expanded="true/false"`. Also closes the menu when clicking outside or selecting a link.
  - `highlightActiveNavLink()`: Detects `window.location.pathname`, extracts the current page filename, and ensures the corresponding navigation link has the `.active` class and `aria-current="page"`.
  - `initScrollAnimations()`: Adds `.fade-in` to `<main>` upon `DOMContentLoaded` for smooth rendering.
  - `updateFooterYear()`: Dynamically injects `new Date().getFullYear()` into `#current-year` to keep copyright info up-to-date.

#### 2. `js/planner.js` (Academic Task Planner Logic)
- **Concepts:** JavaScript Arrays, Objects, `localStorage` API, dynamic DOM node creation, event handling, input validation.
- **Key Functions:**
  - `addTask(event)`:
    - Calls `event.preventDefault()` to block form submission.
    - Reads and trims `#task-title`.
    - **Rejects empty input** by displaying a visible error banner in `#planner-error`.
    - Creates a task object `{ id: Date.now(), title, course, dueDate, priority, completed: false }`.
    - Pushes the object to the global `tasks` array.
    - Calls `saveTasksToStorage()` and `renderTasks()`.
  - `toggleTask(taskId)`:
    - Finds the target task in `tasks` using `tasks.find(item => item.id === numericId)`.
    - Inverts the boolean flag: `task.completed = !task.completed`.
    - Saves to `localStorage` and triggers `renderTasks()`.
  - `deleteTask(taskId)`:
    - Removes the item from the array using `tasks.filter(item => item.id !== numericId)`.
    - Updates `localStorage` and re-renders the DOM immediately.
  - `renderTasks()`:
    - Clears `#task-list-container.innerHTML = ""`.
    - Filters tasks based on `currentFilter` (`"all"`, `"pending"`, `"completed"`).
    - Iterates over filtered tasks, creating elements via `document.createElement()`.
    - Applies the `.completed` class (which triggers CSS `text-decoration: line-through`).
    - Binds change events to checkboxes and click events to delete buttons.
    - Updates the live statistics counter (`#stat-total`, `#stat-completed`, `#stat-pending`).
  - `saveTasksToStorage()`: Serializes the `tasks` array with `JSON.stringify()` into browser storage under key `"cos106_academic_tasks"`.
  - `loadTasksFromStorage()`: Deserializes stored JSON with `JSON.parse()` or initializes sensible default coursework tasks if storage is empty.

#### 3. `js/contact.js` (Form Validation Logic)
- **Concepts:** Form events, DOM error insertion, input state toggling, Regular Expressions (RegEx), form clearing.
- **Key Functions:**
  - `validateForm(event)`:
    - Attached via `contactForm.addEventListener("submit", validateForm)` (zero inline HTML onclicks).
    - Prevents default page reloading with `event.preventDefault()`.
    - Reads and trims all 4 fields (Name, Email, Phone, Message).
    - Resets previous error highlights and messages via `clearAllErrors()`.
    - Enforces 4 strict rules:
      1. **Name:** Must not be blank and must be at least 2 characters.
      2. **Email:** Tested against `/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/` to confirm valid username, `@`, domain name, and domain extension.
      3. **Phone:** Tested against `/^\d+$/` to confirm **digits only** (rejects letters, hyphens, and spaces) and length between 10 and 15 digits.
      4. **Message:** Must not be blank and must have at least 10 characters.
    - If any test fails: inserts inline error message into `#<field>-error`, adds `.input-error` class to the input, and focuses on the first failing field.
    - If all tests pass: reveals `#form-success` with custom greeting, resets the form using `contactForm.reset()`, and smoothly scrolls the banner into view.

---

## ❓ 3. Top 5 Likely Questions from the Lecturer (With Defendable Answers)

### Question 1: "Why did you choose Flexbox for the navigation and hero section, but CSS Grid for the projects showcase?"
> **Answer:**  
> "Flexbox is inherently a **one-dimensional** layout model, making it ideal for distributing items in a single direction (such as spreading navigation links horizontally across the header, aligning the hamburger toggle, or stacking content on mobile).  
> In contrast, CSS Grid is a **two-dimensional** layout model capable of coordinating both rows and columns simultaneously. For the projects showcase, CSS Grid (`repeat(auto-fit, minmax(300px, 1fr))`) allows the cards to automatically wrap and distribute available horizontal space evenly across 1, 2, or 3 columns without requiring cumbersome manual media query recalculations."

---

### Question 2: "How does the Academic Planner save tasks across browser refreshes, and what do JSON.stringify and JSON.parse do?"
> **Answer:**  
> "We use the browser's native **Web Storage API (`localStorage`)**. Browser localStorage only accepts plain string key-value pairs; it cannot directly store JavaScript objects or arrays.  
> - `JSON.stringify(tasks)` converts our in-memory JavaScript array of task objects into a structured text string so that `localStorage.setItem()` can store it.  
> - When the page is reloaded, `localStorage.getItem()` retrieves that text string, and `JSON.parse()` reconstructs it back into a live JavaScript array of objects that our code can push, filter, and render."

---

### Question 3: "Explain how your validateForm function works and how you check for valid emails and digits-only phone numbers."
> **Answer:**  
> "In `js/contact.js`, the `validateForm` function intercepts the `submit` event using `addEventListener`. It first calls `event.preventDefault()` to stop the browser from refreshing the page.  
> Next, it extracts the input values and trims any leading or trailing whitespace.  
> - For the email, we test the string against the regular expression `^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/`. This pattern ensures there is a user identifier before the `@`, a domain name after the `@`, and a valid domain extension of at least 2 characters after a period.  
> - For the phone number, the prompt required **digits only**. We test against the regex `/^\d+$/`, which strictly matches numeric characters from 0 through 9, rejecting any letters, dashes, or punctuation.  
> If an error occurs, we set the text content of the dedicated inline error `<span>` under that specific input and apply an `.input-error` border. Only when all inputs pass do we display the success alert and clear the form using `form.reset()`."

---

### Question 4: "Why is event.preventDefault() used in your form handlers?"
> **Answer:**  
> "By default, when an HTML `<form>` is submitted or a submit button is clicked, the browser executes its native behavior: it attempts an HTTP GET or POST request to the URL specified in the `action` attribute and reloads the page.  
> Because our portfolio is an entirely client-side web application without a backend server, allowing that reload would wipe out our JavaScript runtime state and reset the user's view. Calling `event.preventDefault()` cancels the browser's default submission behavior, giving our JavaScript functions full control to validate inputs, update the DOM, and save data to `localStorage` without any interruption."

---

### Question 5: "What are semantic HTML5 elements, and why did you use them instead of generic div tags?"
> **Answer:**  
> "Semantic elements (such as `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, and `<footer>`) clearly describe their purpose and the meaning of the content they contain to both the browser and the developer.  
> We use them instead of generic `<div>` tags for three primary reasons:  
> 1. **Accessibility (a11y):** Assistive technologies like screen readers use semantic tags as navigational landmarks, allowing visually impaired users to jump directly to the main content or navigation menu.  
> 2. **Search Engine Optimization (SEO):** Search crawlers can parse semantic documents more effectively, recognizing primary headings, articles, and navigation hierarchies.  
> 3. **Code Maintainability:** Semantic code is far cleaner and easier for teams or assessing lecturers to read and audit than nested 'div-soup'."

---

## 💡 4. Bonus Defence Questions (For Higher Marks)

### Bonus Question 1: "How does your mobile hamburger menu work without jQuery or external libraries?"
> **Answer:**  
> "In `js/main.js`, we query the `.nav-toggle` button and the `.nav-menu`. When clicked, `classList.toggle('active')` toggles a CSS class on the menu. In `css/style.css`, `.nav-menu` is hidden by default on mobile (`display: none`), and `.nav-menu.active` switches it to `display: block` with a subtle slide-down animation. We also update the accessibility attribute `aria-expanded` between `true` and `false` so screen readers are always synchronized with the visual state."

### Bonus Question 2: "What is mobile-first design and how is it reflected in your stylesheet?"
> **Answer:**  
> "Mobile-first design means writing CSS rules for the smallest screen sizes (like mobile smartphones) as the default baseline styling, without wrapping them in media queries. Then, as the viewport expands to larger screens, we use `min-width` media queries (e.g. `@media (min-width: 768px)` and `@media (min-width: 1024px)`) to layer on multi-column layouts, expanded navigation bars, and larger typography. This ensures faster loading and optimal rendering on mobile devices."

---

## 🏁 5. Quick Pre-Defence Checklist for the Student

Before joining your defence call:
1. Open the hosted GitHub Pages link on your computer and on your mobile phone.
2. Confirm that all navigation links (`Home`, `About Me`, `Projects`, `Academic Planner`, `Contact`) navigate smoothly.
3. Add a sample task in the planner, toggle it complete (observe the strike-through), delete it, and refresh the browser to prove that `localStorage` retained the data.
4. Go to the Contact page, hit submit while blank to demonstrate that all 4 inline error messages fire. Then enter an invalid email (e.g. `test@`) to prove regex validation, and enter letters in the phone field to prove digits-only rejection. Finally, enter valid data and observe the success banner.
5. Have your code editor open to `style.css`, `planner.js`, and `contact.js` so you can show the exact functions when asked.
