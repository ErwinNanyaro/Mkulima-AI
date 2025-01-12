document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.getElementById("menu-button");
  const menu = document.getElementById("menu");
  const links = document.querySelectorAll("#menu ul li a");
  const sections = document.querySelectorAll("main section");

  // Toggle menu visibility
  menuButton.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });

  // Show corresponding section on link click
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // Prevent default behavior
      const targetId = this.getAttribute("href").substring(1);

      // Hide all sections
      sections.forEach((section) => {
        section.classList.add("hidden");
      });

      // Show target section
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.classList.remove("hidden");
      }

      // Hide the menu
      menu.classList.add("hidden");
    });
  });
});
