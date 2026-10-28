
(async function () {
    const headerContainer = document.getElementById("siteHeader");

    if (!headerContainer) return;

    const isGitHubPages = location.hostname === "chandanac1120.github.io";
    const base = isGitHubPages ? "/smile/" : "/";

    try {
        const response = await fetch(base + "header.html");

        if (!response.ok) {
            throw new Error("Could not load header.html");
        }

        headerContainer.innerHTML = await response.text();

        // Correct links for the website
        const links = headerContainer.querySelectorAll("a");

        links.forEach(function (link) {
            const label = link.textContent.trim().toUpperCase();

            const routes = {
                "HOME": base + "index.html",
                "ABOUT": base + "pages/about.html",
                "SERVICES": base + "pages/services.html",
                "RENTALS": base + "rentals.html",
                "CONTACT": base + "contact.html",
                "AREAS WE SERVE": base + "areas.html",
                "BOOK NOW": base + "enquiry.html"
            };

            if (routes[label]) {
                link.href = routes[label];
            }
        });

        // Active navigation link
        const currentPath = location.pathname.replace(/\/+$/, "") || "/";

        headerContainer.querySelectorAll(".st-nav a").forEach(function (link) {
            const linkPath = new URL(link.href).pathname.replace(/\/+$/, "") || "/";

            if (linkPath === currentPath) {
                link.classList.add("active");
                link.setAttribute("aria-current", "page");
            } else {
                link.classList.remove("active");
                link.removeAttribute("aria-current");
            }
        });

    } catch (error) {
        console.error("Header loading error:", error);
        headerContainer.innerHTML =
            '<p style="padding:12px;color:#b00020;">Navigation could not load. Please refresh.</p>';
    }
})();

// Mobile menu
document.addEventListener("click", function (event) {
    const button = event.target.closest("#menuToggle");
    const nav = document.getElementById("mainNavigation");

    if (!nav) return;

    const menuButton = document.getElementById("menuToggle");

    if (button) {
        const isOpen = nav.classList.toggle("open");

        menuButton.setAttribute("aria-expanded", String(isOpen));

        menuButton.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark" aria-hidden="true"></i>'
            : '<i class="fa-solid fa-bars" aria-hidden="true"></i>';

        return;
    }

    // Close menu after clicking a navigation link
    if (event.target.closest("#mainNavigation a")) {
        nav.classList.remove("open");
        menuButton?.setAttribute("aria-expanded", "false");

        if (menuButton) {
            menuButton.innerHTML =
                '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
        }

        return;
    }

    // Close when clicking outside the menu
    if (!event.target.closest("#mainNavigation")) {
        nav.classList.remove("open");
        menuButton?.setAttribute("aria-expanded", "false");

        if (menuButton) {
            menuButton.innerHTML =
                '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
        }
    }
});
