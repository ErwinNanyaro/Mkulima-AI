// Smooth scrolling for menu links
document.querySelectorAll(".menu-content a").forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault(); // Prevent the default link action
    const targetId = this.getAttribute("href").slice(1); // Get the target section ID
    document.getElementById(targetId).scrollIntoView({ behavior: "smooth" }); // Smooth scroll to the section
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("menu-button");
  const menu = document.getElementById("menu");
  const links = menu.querySelectorAll("a");
  const sections = document.querySelectorAll("main > section");

  // Toggle menu visibility
  menuButton.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });

  // Handle menu link clicks
  links.forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();

      // Hide all sections
      sections.forEach(section => section.classList.add("hidden"));

      // Show the clicked section
      const sectionId = event.target.getAttribute("data-section");
      const targetSection = document.getElementById(sectionId);
      if (targetSection) {
        targetSection.classList.remove("hidden");
      }

      // Hide the menu
      menu.classList.add("hidden");
    });
  });
});
