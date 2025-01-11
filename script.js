// Smooth scrolling for menu links
document.querySelectorAll(".menu-content a").forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault(); // Prevent the default link action
    const targetId = this.getAttribute("href").slice(1); // Get the target section ID
    document.getElementById(targetId).scrollIntoView({ behavior: "smooth" }); // Smooth scroll to the section
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const menuItems = document.querySelectorAll("#menu ul li a");

  menuItems.forEach(item => {
    item.addEventListener("click", event => {
      event.preventDefault();

      // Hide all sections
      const sections = document.querySelectorAll("section");
      sections.forEach(section => section.classList.add("hidden"));

      // Show the clicked section
      const targetId = item.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.classList.remove("hidden");
      }
    });
  });
});
