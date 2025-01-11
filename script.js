document.addEventListener("DOMContentLoaded", () => {
  const menuLinks = document.querySelectorAll("#menu ul li a");

  menuLinks.forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();

      // Hide all sections
      const sections = document.querySelectorAll("section");
      sections.forEach(section => section.classList.add("hidden"));

      // Show the clicked section
      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.classList.remove("hidden");
      }
    });
  });
});
