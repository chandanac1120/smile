
document.addEventListener("DOMContentLoaded", async () => {
  const placeholder = document.getElementById("siteHeader");

  if (!placeholder) return;

  try {
    const response = await fetch("./header.html");

    if (!response.ok) {
      throw new Error("Could not load header.html");
    }

    placeholder.innerHTML = await response.text();

    // Mobile menu
    const menuButton = document.getElementById("menuToggle");
    const navigation = document.getElementById("mainNavigation");

    menuButton?.addEventListener("click", () => {
      if (!navigation) return;

      const isOpen = navigation.classList.toggle("open");

      menuButton.setAttribute("aria-expanded", String(isOpen));

      menuButton.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    });

    // Highlight the correct navigation link
    const currentPath =
      window.location.pathname.replace(/\/+$/, "") || "/";

    document.querySelectorAll("#mainNavigation a").forEach(link => {
      const linkUrl = new URL(link.href);
      const linkPath =
        linkUrl.pathname.replace(/\/+$/, "") || "/";

      const isHome =
        currentPath === "/" ||
        currentPath.endsWith("/index.html");

      const isLinkHome =
        linkPath === "/" ||
        linkPath.endsWith("/index.html");

      // Never highlight links pointing to page sections
      const isSectionLink = linkUrl.hash !== "";

      const shouldBeActive = isSectionLink
        ? false
        : isHome
          ? isLinkHome
          : linkPath === currentPath;

      link.classList.toggle("active", shouldBeActive);
    });

  } catch (error) {
    console.error("Header loading failed:", error);
  }
});
