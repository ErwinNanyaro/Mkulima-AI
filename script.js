document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("menu-button");
  const menu = document.getElementById("menu");
  const menuLinks = document.querySelectorAll("#menu ul li a");

  // Toggle menu visibility
  menuButton.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });

  // Add functionality to menu links
  menuLinks.forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();

      // Hide all sections
      const sections = document.querySelectorAll("main section");
      sections.forEach(section => section.classList.add("hidden"));

      // Show the clicked section
      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.classList.remove("hidden");
      }

      // Hide the menu after clicking a link
      menu.classList.add("hidden");
    });
  });
});
