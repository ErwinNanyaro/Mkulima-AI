document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".menu a");
  const sections = document.querySelectorAll("main section");

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
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

  // Hide all sections on page load
  sections.forEach((section) => {
    section.classList.add("hidden");
  });
});
