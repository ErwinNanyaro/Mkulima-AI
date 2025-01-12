document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.querySelector(".menu-button");
  const menu = document.querySelector(".menu");
  const links = document.querySelectorAll(".menu a");
  const sections = document.querySelectorAll("main section");

  // Toggle menu visibility
  menuButton.addEventListener("click", function () {
    menu.classList.toggle("hidden");
  });

  // Handle menu item clicks
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);

      // Hide all sections
      sections.forEach((section) => {
        section.classList.add("hidden");
      });

      // If "Home" is clicked, do nothing
      if (targetId === "home") {
        return;
      }

      // Show the target section
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.classList.remove("hidden");
      }

      // Close the menu
      menu.classList.add("hidden");
    });
  });
});
