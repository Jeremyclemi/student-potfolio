/**
 * ==============================================================================
 * COS 106: Introduction to Web Technologies
 * File: js/contact.js
 * Description: Client-side Contact Form Validation & Feedback
 * Author: Clem Iwegbu Oluchukwuka
 * Course: BSc Data Science, 100 Level, MIVA Open University
 * 
 * Key Concepts Demonstrated:
 * - Form Event Handling (submit event, preventDefault)
 * - Named Function: validateForm
 * - Regular Expressions (Email validation pattern, Digits-only phone test)
 * - Inline DOM error rendering and input class toggling
 * - Success banner presentation and form clearing (.reset())
 * - Accessibility: aria-live polite announcements and focus management
 * ==============================================================================
 */

// Wait for the DOM to load before binding event listeners
document.addEventListener("DOMContentLoaded", function () {
  console.log("Contact form script initialized.");

  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    // Attach submit listener using addEventListener (NO inline onclick/onsubmit)
    contactForm.addEventListener("submit", validateForm);

    // Optional: Real-time validation cleanup on input change
    setupInputClearListeners();
  }
});

/**
 * -----------------------------------------------------------------------------
 * 1. validateForm(event)
 * -----------------------------------------------------------------------------
 * WHAT IT DOES:
 * - Stops the browser from submitting the form and refreshing the page.
 * - Extracts and trims values from Name, Email, Phone, and Message inputs.
 * - Checks that NO field is left blank.
 * - Validates Email format using a standard regular expression.
 * - Validates Phone contains digits only (allows 10-15 numeric digits).
 * - Displays inline error messages directly under failing fields.
 * - If ALL checks pass, hides errors, shows a success banner, and clears the form.
 * 
 * WHY WE WROTE IT THIS WAY:
 * Demonstrates defensive programming, thorough regex pattern matching,
 * clear user feedback, and DOM updates.
 */
function validateForm(event) {
  // Prevent standard HTTP form post and page refresh
  event.preventDefault();

  // Grab form input elements
  const nameInput = document.getElementById("contact-name");
  const emailInput = document.getElementById("contact-email");
  const phoneInput = document.getElementById("contact-phone");
  const messageInput = document.getElementById("contact-message");

  // Grab inline error placeholder elements
  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const phoneError = document.getElementById("phone-error");
  const messageError = document.getElementById("message-error");

  // Grab success banner element
  const successBanner = document.getElementById("form-success");

  // Extract trimmed string values
  const nameValue = nameInput ? nameInput.value.trim() : "";
  const emailValue = emailInput ? emailInput.value.trim() : "";
  const phoneValue = phoneInput ? phoneInput.value.trim() : "";
  const messageValue = messageInput ? messageInput.value.trim() : "";

  // Reset all previous error states
  clearAllErrors();
  if (successBanner) {
    successBanner.classList.remove("visible");
  }

  // Track overall validation status
  let isValid = true;
  let firstInvalidInput = null;

  // ---------------------------------------------------------------------------
  // Check 1: Name validation (Must not be empty)
  // ---------------------------------------------------------------------------
  if (nameValue === "") {
    showFieldError(nameInput, nameError, "Full name is required.");
    isValid = false;
    if (!firstInvalidInput) firstInvalidInput = nameInput;
  } else if (nameValue.length < 2) {
    showFieldError(nameInput, nameError, "Name must be at least 2 characters long.");
    isValid = false;
    if (!firstInvalidInput) firstInvalidInput = nameInput;
  }

  // ---------------------------------------------------------------------------
  // Check 2: Email validation (Must not be empty & must match email format)
  // ---------------------------------------------------------------------------
  // Regex explanation:
  // ^[^\s@]+    : Starts with 1 or more non-whitespace, non-@ characters
  // @           : Contains exactly an '@' symbol
  // [^\s@]+     : Followed by domain name without whitespace or @
  // \.          : A literal period
  // [^\s@]{2,}$ : Domain extension of at least 2 letters (e.g. .com, .edu, .ng)
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (emailValue === "") {
    showFieldError(emailInput, emailError, "Email address is required.");
    isValid = false;
    if (!firstInvalidInput) firstInvalidInput = emailInput;
  } else if (!emailPattern.test(emailValue)) {
    showFieldError(emailInput, emailError, "Please enter a valid email address (e.g. name@example.com).");
    isValid = false;
    if (!firstInvalidInput) firstInvalidInput = emailInput;
  }

  // ---------------------------------------------------------------------------
  // Check 3: Phone Number validation (Must not be empty & digits only)
  // ---------------------------------------------------------------------------
  // Regex explanation:
  // ^\d{10,15}$ : Exactly between 10 and 15 continuous numeric digits (0-9)
  const digitsOnlyPattern = /^\d+$/;

  if (phoneValue === "") {
    showFieldError(phoneInput, phoneError, "Phone number is required.");
    isValid = false;
    if (!firstInvalidInput) firstInvalidInput = phoneInput;
  } else if (!digitsOnlyPattern.test(phoneValue)) {
    showFieldError(phoneInput, phoneError, "Phone number must contain digits only (no spaces, dashes, or letters).");
    isValid = false;
    if (!firstInvalidInput) firstInvalidInput = phoneInput;
  } else if (phoneValue.length < 10 || phoneValue.length > 15) {
    showFieldError(phoneInput, phoneError, "Phone number should be between 10 and 15 digits.");
    isValid = false;
    if (!firstInvalidInput) firstInvalidInput = phoneInput;
  }

  // ---------------------------------------------------------------------------
  // Check 4: Message validation (Must not be empty)
  // ---------------------------------------------------------------------------
  if (messageValue === "") {
    showFieldError(messageInput, messageError, "Please enter your message.");
    isValid = false;
    if (!firstInvalidInput) firstInvalidInput = messageInput;
  } else if (messageValue.length < 10) {
    showFieldError(messageInput, messageError, "Message must be at least 10 characters long.");
    isValid = false;
    if (!firstInvalidInput) firstInvalidInput = messageInput;
  }

  // ---------------------------------------------------------------------------
  // If invalid, focus on the first offending field to aid usability
  // ---------------------------------------------------------------------------
  if (!isValid) {
    if (firstInvalidInput) {
      firstInvalidInput.focus();
    }
    return;
  }

  // ---------------------------------------------------------------------------
  // Submission Success
  // ---------------------------------------------------------------------------
  // If all validation rules pass:
  if (successBanner) {
    successBanner.innerHTML = `
      <span>✅</span>
      <div>
        <strong>Message sent successfully!</strong>
        <p>Thank you, <em>${escapeHTML(nameValue)}</em>. Your inquiry has been received and I will respond to <em>${escapeHTML(emailValue)}</em> promptly.</p>
      </div>
    `;
    successBanner.classList.add("visible");
  }

  // Clear form inputs
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.reset();
  }

  // Scroll success banner into view smoothly
  if (successBanner) {
    successBanner.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
}

/**
 * -----------------------------------------------------------------------------
 * 2. Helper: showFieldError
 * -----------------------------------------------------------------------------
 * Highlights an invalid input field with red styling and inserts the error message.
 */
function showFieldError(inputElement, errorElement, message) {
  if (inputElement) {
    inputElement.classList.add("input-error");
    inputElement.setAttribute("aria-invalid", "true");
  }
  if (errorElement) {
    errorElement.textContent = message;
  }
}

/**
 * -----------------------------------------------------------------------------
 * 3. Helper: clearAllErrors
 * -----------------------------------------------------------------------------
 * Resets all error messages and border highlights.
 */
function clearAllErrors() {
  const errorFields = document.querySelectorAll(".field-error");
  const inputs = document.querySelectorAll(".form-group-contact input, .form-group-contact textarea");

  errorFields.forEach(function (el) {
    el.textContent = "";
  });

  inputs.forEach(function (input) {
    input.classList.remove("input-error");
    input.removeAttribute("aria-invalid");
  });
}

/**
 * -----------------------------------------------------------------------------
 * 4. Helper: setupInputClearListeners
 * -----------------------------------------------------------------------------
 * Removes error state dynamically as soon as the user starts correcting a field.
 */
function setupInputClearListeners() {
  const fields = [
    { input: document.getElementById("contact-name"), error: document.getElementById("name-error") },
    { input: document.getElementById("contact-email"), error: document.getElementById("email-error") },
    { input: document.getElementById("contact-phone"), error: document.getElementById("phone-error") },
    { input: document.getElementById("contact-message"), error: document.getElementById("message-error") }
  ];

  fields.forEach(function (field) {
    if (field.input && field.error) {
      field.input.addEventListener("input", function () {
        if (field.input.classList.contains("input-error")) {
          field.input.classList.remove("input-error");
          field.input.removeAttribute("aria-invalid");
          field.error.textContent = "";
        }
      });
    }
  });
}

/**
 * Helper to escape HTML characters in strings for safe DOM insertion
 */
function escapeHTML(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
