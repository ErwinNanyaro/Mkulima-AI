document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.getElementById("menu-button");
  const menu = document.getElementById("menu");
  const links = document.querySelectorAll(".menu a");
  const sections = document.querySelectorAll("main section");

  // Toggle menu visibility
  menuButton.addEventListener("click", function () {
    menu.classList.toggle("show");
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

      // Show the selected section
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.classList.remove("hidden");
      }

      // Close the menu
      menu.classList.remove("show");
    });
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const urbanToggle = document.getElementById('urban-projects-toggle');
  const ruralToggle = document.getElementById('rural-projects-toggle');
  const urbanProjects = document.getElementById('urban-projects');
  const ruralProjects = document.getElementById('rural-projects');

  // Toggle Urban Projects
  urbanToggle.addEventListener('click', (e) => {
    e.preventDefault();
    urbanProjects.classList.toggle('hidden');
    ruralProjects.classList.add('hidden'); // Ensure rural is hidden
  });

  // Toggle Rural Projects
  ruralToggle.addEventListener('click', (e) => {
    e.preventDefault();
    ruralProjects.classList.toggle('hidden');
    urbanProjects.classList.add('hidden'); // Ensure urban is hidden
  });
});
