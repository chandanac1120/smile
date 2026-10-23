
(async function () {
  const placeholder = document.getElementById("siteHeader");

  if (!placeholder) {
    console.error("siteHeader placeholder not found");
    return;
  }

  const isGitHubPages =
    location.hostname === "chandanac1120.github.io";

  const base = isGitHubPages ? "/smile/" : "/";

  try {
    const response = await fetch(base + "header.html");

    if (!response.ok) {
      throw new Error("Failed to load header.html");
    }

    placeholder.innerHTML = await response.text();

    // Navigation links
    const pages = {
      "home": "index.html",
      "about": "pages/about.html",
      "services": "pages/services.html",
      "rentals": "rentals.html",
      "contact": "contact.html",
      "areas we serve": "areas.html",
      "book now": "enquiry.html"
    };

    placeholder.querySelectorAll("a").forEach(link => {
      const label = link.textContent.trim().toLowerCase();

      if (pages[label]) {
        link.href = base + pages[label];
      } else if (link.classList.contains("st-logo")) {
        link.href = base + "index.html";
      }
    });

    // Active navigation link
    const navigation =
      placeholder.querySelector("#mainNavigation");

    if (navigation) {
      const currentPath =
        location.pathname.replace(/\/+$/, "") || "/";

      navigation.querySelectorAll("a").forEach(link => {
        link.classList.remove("active");

        const target = new URL(link.href);

        const targetPath =
          target.pathname.replace(/\/+$/, "") || "/";

        if (!target.hash && currentPath === targetPath) {
          link.classList.add("active");
        }
      });
    }

    console.log("Smile Taxi header loaded successfully");

  } catch (error) {
    console.error("Header loading failed:", error);
  }
})();

// Mobile menu event delegation
document.addEventListener("click", function (event) {

  const button = event.target.closest("#menuToggle");

  if (button) {
    const header = button.closest(".st-header");
    const navigation =
      header?.querySelector("#mainNavigation");

    if (!navigation) return;

    const isOpen = navigation.classList.toggle("open");

    button.setAttribute("aria-expanded", String(isOpen));

    button.innerHTML = isOpen
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';

    return;
  }

  // Close menu after selecting a link
  const link = event.target.closest("#mainNavigation a");

  if (link) {
    const header = link.closest(".st-header");
    const navigation =
      header?.querySelector("#mainNavigation");

    const menuButton =
      header?.querySelector("#menuToggle");

    navigation?.classList.remove("open");

    if (menuButton) {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.innerHTML =
        '<i class="fa-solid fa-bars"></i>';
    }
  }
});

// Close menu when clicking outside
document.addEventListener("click", function (event) {
  if (event.target.closest("#menuToggle")) return;
  if (event.target.closest("#mainNavigation")) return;

  document.querySelectorAll("#mainNavigation.open")
    .forEach(navigation => {
      navigation.classList.remove("open");

      const header = navigation.closest(".st-header");
      const button = header?.querySelector("#menuToggle");

      if (button) {
        button.setAttribute("aria-expanded", "false");
        button.innerHTML =
          '<i class="fa-solid fa-bars"></i>';
      }
    });
});
