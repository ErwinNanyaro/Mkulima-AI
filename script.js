// Add functionality to show/hide sections
document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".menu a");
  const sections = document.querySelectorAll("main section");

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // Prevent default link behavior
      const targetId = this.getAttribute("href").substring(1);

      // Hide all sections
      sections.forEach((section) => {
        section.classList.add("hidden");
      });

      // Show the target section
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.classList.remove("hidden");
      }
    });
  });

  // Hide all sections on page load (to keep the home page empty)
  sections.forEach((section) => {
    section.classList.add("hidden");
  });
});
