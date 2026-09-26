/**
 * Kent John G. Quimzon - Portfolio Script
 * Handles single-page view switching, dark/light theme toggle, and forms.
 */

document.addEventListener("DOMContentLoaded", () => {
  const navTabs = document.querySelectorAll(".nav-tab");
  const pageViews = document.querySelectorAll(".page-view");
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const navLinks = document.getElementById("nav-links");
  const themeToggleBtn = document.getElementById("theme-toggle");

  // --- Theme Toggle Logic ---
  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("light-mode");
      const isLight = document.body.classList.contains("light-mode");
      localStorage.setItem("portfolio-theme", isLight ? "light" : "dark");
    });
  }

  /**
   * Switches the active view/page without vertical scrolling.
   * @param {string} targetId - The section ID to activate.
   */
  function switchPage(targetId) {
    if (!targetId) targetId = "home";

    const cleanId = targetId.replace("#", "");
    const targetSection = document.getElementById(cleanId);
    if (!targetSection) return;

    // Hide all page views
    pageViews.forEach((view) => {
      view.classList.remove("active");
    });

    // Show active target section
    targetSection.classList.add("active");

    // Update navbar link states
    navTabs.forEach((tab) => {
      const pageAttr = tab.getAttribute("data-page");
      if (pageAttr === cleanId) {
        tab.classList.add("active");
      } else {
        tab.classList.remove("active");
      }
    });

    // Reset window scroll position
    window.scrollTo({ top: 0, behavior: "instant" });

    // Close mobile drawer if open
    if (navLinks && navLinks.classList.contains("open")) {
      navLinks.classList.remove("open");
      if (hamburgerBtn) hamburgerBtn.setAttribute("aria-expanded", "false");
    }
  }

  // --- Click Event Listeners for Navigation ---
  navTabs.forEach((tab) => {
    tab.addEventListener("click", (event) => {
      event.preventDefault();
      const pageId = tab.getAttribute("data-page");
      history.pushState(null, "", `#${pageId}`);
      switchPage(pageId);
    });
  });

  // --- Mobile Navigation Menu Handler ---
  if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      hamburgerBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  // --- Handle Browser Back/Forward Buttons ---
  window.addEventListener("popstate", () => {
    const currentHash = window.location.hash.substring(1) || "home";
    switchPage(currentHash);
  });

  // --- Initial Page Load ---
  const initialHash = window.location.hash.substring(1);
  switchPage(initialHash || "home");

  // --- Contact Form Handling ---
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thank you! Your message has been sent successfully.");
      contactForm.reset();
    });
  }
});