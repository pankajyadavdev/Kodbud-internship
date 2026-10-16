"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    const currentYear = document.getElementById("currentYear");

    // Update the copyright year automatically
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // Mobile navigation
    if (menuToggle && navMenu) {
        function closeMenu() {
            navMenu.classList.remove("is-open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
        }

        function toggleMenu() {
            const isOpen = navMenu.classList.toggle("is-open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );
        }

        menuToggle.addEventListener("click", toggleMenu);

        // Close the menu after selecting a navigation link
        navMenu.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        // Close the menu with the Escape key
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeMenu();
                menuToggle.focus();
            }
        });

        // Close the mobile menu when returning to desktop width
        window.addEventListener("resize", () => {
            if (window.innerWidth > 700) {
                closeMenu();
            }
        });
    }
});