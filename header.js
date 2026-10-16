
document.addEventListener("DOMContentLoaded", async () => {
  const placeholder = document.getElementById("siteHeader");
  if (!placeholder) return;

  // Support both GitHub Pages and local Live Server.
  const base = location.hostname === "chandanac1120.github.io"
    ? "/smile/"
    : "/";

  try {
    const response = await fetch(base + "header.html");
    if (!response.ok) throw new Error("Header could not load");

    placeholder.innerHTML = await response.text();

    // Correct navigation paths for every page.
    const pages = {
      "home": "index.html",
      "about": "pages/about.html",
      "services": "pages/services.html",
      "fleet": "index.html#fleet",
      "tours": "pages/tour.html",
      "areas we serve": "areas.html"
    };

    document.querySelectorAll("#mainNavigation a").forEach(link => {
      const label = link.textContent.trim().toLowerCase();
      const page = pages[label];

      if (page) link.href = base + page;

      link.classList.remove("active");

      const target = new URL(link.href);
      const current = location.pathname.replace(/\/+$/, "");
      const destination = target.pathname.replace(/\/+$/, "");

      if (
        !target.hash &&
        current === destination
      ) {
        link.classList.add("active");
      }
    });

    // Mobile menu open / close.
    const menuButton = document.getElementById("menuToggle");
    const navigation = document.getElementById("mainNavigation");

    if (menuButton && navigation) {
      menuButton.setAttribute("aria-expanded", "false");

      menuButton.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("open");

        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.innerHTML = isOpen
          ? '<i class="fa-solid fa-xmark"></i>'
          : '<i class="fa-solid fa-bars"></i>';
      });

      navigation.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
          navigation.classList.remove("open");
          menuButton.setAttribute("aria-expanded", "false");
          menuButton.innerHTML = '<i class="fa-solid fa-bars"></i>';
        });
      });
    }
  } catch (error) {
    console.error("Header loading failed:", error);
  }
});
