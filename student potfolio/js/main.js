/**
 * ==============================================================================
 * COS 106: Introduction to Web Technologies
 * File: js/main.js
 * Description: Shared JavaScript functionality across all pages
 * Author: Clem Iwegbu Oluchukwuka
 * Course: BSc Data Science, 100 Level, MIVA Open University
 * 
 * Key Concepts Demonstrated:
 * - DOM Selection (document.querySelector, document.querySelectorAll)
 * - Event Handling (addEventListener for click, resize, DOMContentLoaded)
 * - Class Manipulation (classList.add, classList.remove, classList.toggle)
 * - ARIA accessibility state updates (setAttribute)
 * ==============================================================================
 */

// Wait until the HTML document is fully loaded before running script logic
document.addEventListener("DOMContentLoaded", function () {
  console.log("COS 106 Portfolio: Shared scripts initialized.");

  // Initialize all shared components
  initMobileNavigation();
  highlightActiveNavLink();
  initScrollAnimations();
  updateFooterYear();
});

/**
 * -----------------------------------------------------------------------------
 * 1. Mobile Navigation Toggle
 * -----------------------------------------------------------------------------
 * WHAT IT DOES:
 * - Listens for clicks on the hamburger button (.nav-toggle).
 * - Toggles the 'active' class on the menu (.nav-menu) to open/close it.
 * - Updates the 'aria-expanded' attribute for accessibility screen readers.
 * - Closes the menu automatically if the user clicks any navigation link.
 * 
 * WHY WE WROTE IT THIS WAY:
 * Mobile screens have limited horizontal space. Hiding the menu behind a
 * toggle button gives users a clean interface while keeping all five pages
 * reachable in one tap.
 */
function initMobileNavigation() {
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Safeguard: Check if both elements exist on the page before attaching listeners
  if (!navToggle || !navMenu) {
    return;
  }

  // Toggle navigation open/closed on button click
  navToggle.addEventListener("click", function () {
    const isExpanded = navToggle.getAttribute("aria-expanded") === "true";

    // Toggle CSS classes for hamburger animation and menu visibility
    navToggle.classList.toggle("open");
    navMenu.classList.toggle("active");

    // Update accessibility attribute
    navToggle.setAttribute("aria-expanded", !isExpanded);
  });

  // Automatically close mobile menu when a user clicks any navigation link
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  // Close menu if user clicks anywhere outside the header
  document.addEventListener("click", function (event) {
    const isClickInside = navToggle.contains(event.target) || navMenu.contains(event.target);
    if (!isClickInside && navMenu.classList.contains("active")) {
      navMenu.classList.remove("active");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

/**
 * -----------------------------------------------------------------------------
 * 2. Active Navigation Link Detection
 * -----------------------------------------------------------------------------
 * WHAT IT DOES:
 * - Reads current URL filename (e.g. index.html, about.html, planner.html).
 * - Matches it against each link's href attribute.
 * - Ensures the active link has the 'active' class and 'aria-current="page"'.
 * 
 * WHY WE WROTE IT THIS WAY:
 * Helps the user know exactly which page they are currently visiting, providing
 * clear visual orientation.
 */
function highlightActiveNavLink() {
  const currentPath = window.location.pathname;
  const pageFilename = currentPath.substring(currentPath.lastIndexOf("/") + 1) || "index.html";
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach(function (link) {
    const linkHref = link.getAttribute("href");

    // Match filename or treat root as index.html
    if (linkHref === pageFilename || (pageFilename === "" && linkHref === "index.html")) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    } else {
      link.classList.remove("active");
      link.removeAttribute("aria-current");
    }
  });
}

/**
 * -----------------------------------------------------------------------------
 * 3. Subtle Page Load Fade-in Animation
 * -----------------------------------------------------------------------------
 * WHAT IT DOES:
 * Adds a '.fade-in' class to main content sections when loaded.
 * 
 * WHY WE WROTE IT THIS WAY:
 * Demonstrates smooth CSS transition triggers via JavaScript for a polished,
 * modern user experience.
 */
function initScrollAnimations() {
  const mainContent = document.querySelector("main");
  if (mainContent) {
    mainContent.classList.add("fade-in");
  }
}

/**
 * -----------------------------------------------------------------------------
 * 4. Dynamic Footer Copyright Year
 * -----------------------------------------------------------------------------
 * WHAT IT DOES:
 * Finds the element with ID 'current-year' and sets its text to the current year.
 * 
 * WHY WE WROTE IT THIS WAY:
 * Prevents the website from showing an outdated copyright year without needing
 * manual updates every January.
 */
function updateFooterYear() {
  const yearElement = document.getElementById("current-year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}
