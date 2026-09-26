/**
 * Kent John G. Quimzon - Portfolio Script
 * Handles single-page view switching, navigation state, and form handlers.
 */

document.addEventListener("DOMContentLoaded", () => {
  const navTabs = document.querySelectorAll(".nav-tab");
  const pageViews = document.querySelectorAll(".page-view");
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const navLinks = document.getElementById("nav-links");

  /**
   * Switches the active view/page without vertical scrolling.
   * @param {string} targetId - The section ID to activate (e.g. "home", "about").
   */
  function switchPage(targetId) {
    if (!targetId) targetId = "home";

    // Normalize target ID in case '#' is present
    const cleanId = targetId.replace("#", "");

    // Check if the section exists
    const targetSection = document.getElementById(cleanId);
    if (!targetSection) return;

    // 1. Hide all pages
    pageViews.forEach((view) => {
      view.classList.remove("active");
    });

    // 2. Show the targeted page
    targetSection.classList.add("active");

    // 3. Update navbar active tab states
    navTabs.forEach((tab) => {
      const pageAttr = tab.getAttribute("data-page");
      if (pageAttr === cleanId) {
        tab.classList.add("active");
      } else {
        tab.classList.remove("active");
      }
    });

    // 4. Scroll to top of page cleanly
    window.scrollTo({ top: 0, behavior: "instant" });

    // 5. Close mobile navigation menu if open
    if (navLinks && navLinks.classList.contains("open")) {
      navLinks.classList.remove("open");
      hamburgerBtn.setAttribute("aria-expanded", "false");
    }
  }

  // --- Click Event Listeners for Navigation ---
  navTabs.forEach((tab) => {
    tab.addEventListener("click", (event) => {
      event.preventDefault();
      const pageId = tab.getAttribute("data-page");
      
      // Update browser location hash without triggering jump
      history.pushState(null, "", `#${pageId}`);
      switchPage(pageId);
    });
  });

  // --- Handle Mobile Drawer Menu ---
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

  // --- Initial Page Load Handling ---
  const initialHash = window.location.hash.substring(1);
  if (initialHash) {
    switchPage(initialHash);
  } else {
    switchPage("home");
  }

  // --- Form Submission Handler ---
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thank you! Your message has been sent successfully.");
      contactForm.reset();
    });
  }
});