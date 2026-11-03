/* =========================================
   SMILE TAXI - SHARED HEADER LOADER
   Works on GitHub Pages and local Live Server
========================================= */
(function () {
    const isGitHubPages = window.location.hostname === "chandanac1120.github.io";
    const siteBase = isGitHubPages ? "/smile/" : "/";

    function sitePath(path) {
        return siteBase + String(path).replace(/^\/+/, "");
    }

    async function loadHeader() {
        const headerContainer = document.getElementById("siteHeader");

        if (!headerContainer) {
            console.warn("Smile Taxi header placeholder #siteHeader was not found on this page.");
            return;
        }

        try {
            const response = await fetch(sitePath("header.html"), { cache: "no-cache" });
            if (!response.ok) {
                throw new Error("header.html request failed with status " + response.status);
            }

            headerContainer.innerHTML = await response.text();

            // Shared header image and logo link must always point inside the project.
            const logo = headerContainer.querySelector(".st-logo");
            const logoImage = headerContainer.querySelector(".st-logo img");

            if (logo) logo.href = sitePath("index.html");
            if (logoImage) {
                logoImage.src = sitePath("assets/images/taxi.png");
                logoImage.onerror = function () {
                    console.error("Smile Taxi logo could not be loaded:", logoImage.src);
                };
            }

            // Correct all shared navigation destinations from one place.
            const routes = {
                "HOME": "index.html",
                "ABOUT": "pages/about.html",
                "SERVICES": "pages/services.html",
                "RENTALS": "rentals.html",
                "CONTACT": "contact.html",
                "AREAS WE SERVE": "areas.html",
                "BOOK NOW": "enquiry.html"
            };

            headerContainer.querySelectorAll(".st-nav a").forEach(function (link) {
                const label = link.textContent.trim().replace(/\s+/g, " ").toUpperCase();
                if (routes[label]) link.href = sitePath(routes[label]);
            });

            const bookButton = headerContainer.querySelector(".st-book");
            if (bookButton) bookButton.href = sitePath("enquiry.html");

            // Mark the active navigation item, including the /smile/ homepage URL.
            function normalizePath(path) {
                return path.replace(/\/+$/, "") || "/";
            }

            let currentPath = normalizePath(window.location.pathname);
            const projectRoot = normalizePath(siteBase);
            if (currentPath === projectRoot) currentPath = sitePath("index.html");

            headerContainer.querySelectorAll(".st-nav a").forEach(function (link) {
                const linkPath = normalizePath(new URL(link.href, window.location.origin).pathname);
                const active = linkPath === currentPath;
                link.classList.toggle("active", active);
                if (active) link.setAttribute("aria-current", "page");
                else link.removeAttribute("aria-current");
            });

            console.info("Smile Taxi shared header loaded.");
        } catch (error) {
            console.error("Smile Taxi header loading error:", error);
            headerContainer.innerHTML =
                '<p class="header-load-error">Navigation could not load. Please refresh the page.</p>';
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", loadHeader, { once: true });
    } else {
        loadHeader();
    }
})();

/* =========================================
   SHARED MOBILE MENU
   Delegated click handling works after header injection
========================================= */
document.addEventListener("click", function (event) {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;

    const menuButton = target.closest("#menuToggle");
    const nav = document.getElementById("mainNavigation");
    const button = document.getElementById("menuToggle");
    if (!nav || !button) return;

    if (menuButton) {
        const isOpen = nav.classList.toggle("open");
        button.setAttribute("aria-expanded", String(isOpen));
        button.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark" aria-hidden="true"></i>'
            : '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
        return;
    }

    if (target.closest("#mainNavigation a") || !target.closest("#mainNavigation")) {
        nav.classList.remove("open");
        button.setAttribute("aria-expanded", "false");
        button.innerHTML = '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
    }
});
