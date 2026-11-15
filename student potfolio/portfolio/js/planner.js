/**
 * ==============================================================================
 * COS 106: Introduction to Web Technologies
 * File: js/planner.js
 * Description: Academic Planner & Task Management Logic
 * Author: Clem Iwegbu Oluchukwuka
 * Course: BSc Data Science, 100 Level, MIVA Open University
 * 
 * Key Concepts Demonstrated:
 * - JavaScript Arrays & Array of Objects
 * - LocalStorage API (setItem, getItem, JSON.stringify, JSON.parse)
 * - DOM Manipulation (createElement, appendChild, innerHTML, textContent)
 * - Event Handling (addEventListener for form submit, click, change)
 * - Named Functions (addTask, toggleTask, deleteTask, renderTasks)
 * - Input validation & dynamic UI feedback
 * ==============================================================================
 */

// Global constant for localStorage key
const STORAGE_KEY = "cos106_academic_tasks";

/**
 * Tasks array: Holds all task objects in memory.
 * Each task has the structure:
 * {
 *   id: number,          // Unique timestamp-based ID
 *   title: string,       // Task title/description
 *   course: string,      // Course code (e.g., COS 106)
 *   dueDate: string,     // YYYY-MM-DD
 *   priority: string,    // "High", "Medium", "Low"
 *   completed: boolean   // Completion flag
 * }
 */
let tasks = [];

// Filter state: "all", "pending", "completed"
let currentFilter = "all";

// Wait for DOM to finish loading before initializing planner
document.addEventListener("DOMContentLoaded", function () {
  console.log("Academic Planner initialized.");

  // DOM Elements
  const taskForm = document.getElementById("task-form");
  const filterButtons = document.querySelectorAll(".filter-btn");

  // Load existing tasks from localStorage (or set up default sample tasks)
  loadTasksFromStorage();

  // Attach submit event listener to the task creation form
  if (taskForm) {
    taskForm.addEventListener("submit", addTask);
  }

  // Setup filter button listeners
  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      currentFilter = button.getAttribute("data-filter");
      renderTasks();
    });
  });

  // Render initial tasks onto the page
  renderTasks();
});

/**
 * -----------------------------------------------------------------------------
 * 1. addTask(event)
 * -----------------------------------------------------------------------------
 * WHAT IT DOES:
 * - Prevents default form submission that would reload the browser.
 * - Extracts and trims user input values (title, course, date, priority).
 * - Validates that the task title is NOT empty; if empty, shows a visible error banner.
 * - Creates a new task object with a unique timestamp ID.
 * - Appends the object to the global 'tasks' array.
 * - Saves the updated array to localStorage.
 * - Re-renders the list and clears the form inputs.
 * 
 * WHY WE WROTE IT THIS WAY:
 * Demonstrates event.preventDefault(), object creation, array manipulation (push),
 * input validation, and user feedback.
 */
function addTask(event) {
  event.preventDefault(); // Stop page from reloading

  const titleInput = document.getElementById("task-title");
  const courseInput = document.getElementById("task-course");
  const dateInput = document.getElementById("task-date");
  const priorityInput = document.getElementById("task-priority");
  const errorBanner = document.getElementById("planner-error");

  const titleValue = titleInput ? titleInput.value.trim() : "";
  const courseValue = courseInput ? courseInput.value : "COS 106";
  const dateValue = dateInput ? dateInput.value : "";
  const priorityValue = priorityInput ? priorityInput.value : "Medium";

  // Validate: Reject empty input with visible error message
  if (titleValue === "") {
    showPlannerError("Please enter a task description. The title cannot be blank.");
    if (titleInput) titleInput.focus();
    return;
  }

  // Clear any existing error message
  hidePlannerError();

  // Create new task object
  const newTask = {
    id: Date.now(), // Generate unique ID using current timestamp
    title: titleValue,
    course: courseValue,
    dueDate: dateValue || "No deadline set",
    priority: priorityValue,
    completed: false
  };

  // Add to array
  tasks.push(newTask);

  // Persist to browser localStorage
  saveTasksToStorage();

  // Update DOM
  renderTasks();

  // Reset form inputs for next entry
  titleInput.value = "";
  if (dateInput) dateInput.value = "";
  titleInput.focus();
}

/**
 * -----------------------------------------------------------------------------
 * 2. toggleTask(taskId)
 * -----------------------------------------------------------------------------
 * WHAT IT DOES:
 * - Searches the 'tasks' array for the task matching the provided taskId.
 * - Inverts its 'completed' boolean value (false -> true, or true -> false).
 * - Saves the array to localStorage.
 * - Re-renders the DOM to show the strike-through effect and updated counters.
 * 
 * WHY WE WROTE IT THIS WAY:
 * Shows how to locate an item in an array by ID and toggle object state dynamically.
 */
function toggleTask(taskId) {
  const numericId = Number(taskId);
  const task = tasks.find(item => item.id === numericId);

  if (task) {
    task.completed = !task.completed;
    saveTasksToStorage();
    renderTasks();
  }
}

/**
 * -----------------------------------------------------------------------------
 * 3. deleteTask(taskId)
 * -----------------------------------------------------------------------------
 * WHAT IT DOES:
 * - Filters the 'tasks' array to remove the task with the given taskId.
 * - Saves the updated array to localStorage.
 * - Calls renderTasks() to immediately reflect the deletion in the DOM.
 * 
 * WHY WE WROTE IT THIS WAY:
 * Array.prototype.filter() is the cleanest, non-mutating way to remove an element
 * from an array based on a condition.
 */
function deleteTask(taskId) {
  const numericId = Number(taskId);

  // Filter out the task with this ID
  tasks = tasks.filter(item => item.id !== numericId);

  // Persist change and re-render
  saveTasksToStorage();
  renderTasks();
}

/**
 * -----------------------------------------------------------------------------
 * 4. renderTasks()
 * -----------------------------------------------------------------------------
 * WHAT IT DOES:
 * - Clears existing HTML inside #task-list-container.
 * - Filters the tasks based on currentFilter ('all', 'pending', 'completed').
 * - Iterates over tasks and constructs DOM elements using document.createElement.
 * - Applies strike-through styling to completed tasks.
 * - Attaches change/click event listeners for completing and deleting each task.
 * - Updates the live statistics counter (Total, Completed, Pending).
 * 
 * WHY WE WROTE IT THIS WAY:
 * Demonstrates full programmatic DOM manipulation and dynamic UI synchronization.
 */
function renderTasks() {
  const listContainer = document.getElementById("task-list-container");
  if (!listContainer) return;

  // Clear existing items
  listContainer.innerHTML = "";

  // Apply current filter
  const filteredTasks = tasks.filter(function (task) {
    if (currentFilter === "pending") return !task.completed;
    if (currentFilter === "completed") return task.completed;
    return true; // "all"
  });

  // If no tasks match the filter, show friendly empty state
  if (filteredTasks.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.className = "task-empty-state";
    emptyState.innerHTML = `
      <p>📝 No tasks found in this view.</p>
      <small style="color: var(--text-muted);">Add a new task using the form above!</small>
    `;
    listContainer.appendChild(emptyState);
    updateStatsCounter();
    return;
  }

  // Build task elements
  filteredTasks.forEach(function (task) {
    const taskItem = document.createElement("div");
    taskItem.className = `task-item ${task.completed ? "completed" : ""}`;
    taskItem.setAttribute("data-id", task.id);

    // Left section: Checkbox and Task Details
    const leftSection = document.createElement("div");
    leftSection.className = "task-item-left";

    // Completed Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";
    checkbox.checked = task.completed;
    checkbox.setAttribute("aria-label", `Mark task "${task.title}" as ${task.completed ? "pending" : "completed"}`);

    // Event listener to toggle completion
    checkbox.addEventListener("change", function () {
      toggleTask(task.id);
    });

    // Details wrapper
    const details = document.createElement("div");
    details.className = "task-details";

    const titleEl = document.createElement("span");
    titleEl.className = "task-title";
    titleEl.textContent = task.title;

    const metaEl = document.createElement("div");
    metaEl.className = "task-meta";
    metaEl.innerHTML = `
      <span class="task-course-badge">${escapeHTML(task.course)}</span>
      <span class="task-date">📅 Due: ${escapeHTML(task.dueDate)}</span>
      <span class="badge ${task.priority === "High" ? "badge-accent" : "badge-primary"}">${escapeHTML(task.priority)}</span>
    `;

    details.appendChild(titleEl);
    details.appendChild(metaEl);

    leftSection.appendChild(checkbox);
    leftSection.appendChild(details);

    // Right section: Delete Button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn-delete-task";
    deleteBtn.setAttribute("type", "button");
    deleteBtn.setAttribute("aria-label", `Delete task "${task.title}"`);
    deleteBtn.innerHTML = "🗑️ Delete";

    // Event listener to delete task
    deleteBtn.addEventListener("click", function () {
      deleteTask(task.id);
    });

    // Assemble task item
    taskItem.appendChild(leftSection);
    taskItem.appendChild(deleteBtn);

    // Append to container
    listContainer.appendChild(taskItem);
  });

  // Update live stats display
  updateStatsCounter();
}

/**
 * -----------------------------------------------------------------------------
 * 5. updateStatsCounter()
 * -----------------------------------------------------------------------------
 * WHAT IT DOES:
 * Counts total tasks, completed tasks, and calculates pending tasks,
 * then writes them to the respective counters in the DOM.
 */
function updateStatsCounter() {
  const totalCountEl = document.getElementById("stat-total");
  const completedCountEl = document.getElementById("stat-completed");
  const pendingCountEl = document.getElementById("stat-pending");

  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;

  if (totalCountEl) totalCountEl.textContent = total;
  if (completedCountEl) completedCountEl.textContent = completed;
  if (pendingCountEl) pendingCountEl.textContent = pending;
}

/**
 * -----------------------------------------------------------------------------
 * 6. LocalStorage Helpers
 * -----------------------------------------------------------------------------
 * WHAT IT DOES:
 * Persists tasks array to the user's browser storage so tasks remain
 * intact when reloading or returning to the page.
 */
function saveTasksToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (err) {
    console.error("Failed to save tasks to localStorage:", err);
  }
}

function loadTasksFromStorage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      tasks = JSON.parse(stored);
    } else {
      // Default sample tasks if storage is currently empty
      tasks = [
        {
          id: 1,
          title: "Complete COS 106 HTML & CSS Semantic Structure Assignment",
          course: "COS 106",
          dueDate: "2026-11-20",
          priority: "High",
          completed: true
        },
        {
          id: 2,
          title: "Implement JavaScript Task Planner with localStorage support",
          course: "COS 106",
          dueDate: "2026-11-25",
          priority: "High",
          completed: false
        },
        {
          id: 3,
          title: "Prepare for Project Defence Call with course lecturer",
          course: "COS 106",
          dueDate: "2026-11-30",
          priority: "Medium",
          completed: false
        }
      ];
      saveTasksToStorage();
    }
  } catch (err) {
    console.error("Failed to load tasks from localStorage:", err);
    tasks = [];
  }
}

/**
 * -----------------------------------------------------------------------------
 * 7. Error Handling Helpers
 * -----------------------------------------------------------------------------
 */
function showPlannerError(message) {
  const errorBanner = document.getElementById("planner-error");
  if (errorBanner) {
    errorBanner.textContent = message;
    errorBanner.classList.add("visible");
  }
}

function hidePlannerError() {
  const errorBanner = document.getElementById("planner-error");
  if (errorBanner) {
    errorBanner.textContent = "";
    errorBanner.classList.remove("visible");
  }
}

/**
 * Helper to escape HTML characters in dynamic strings to prevent XSS
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
