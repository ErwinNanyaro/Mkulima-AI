// Smooth scrolling for menu links
document.querySelectorAll(".menu-content a").forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault(); // Prevent the default link action
    const targetId = this.getAttribute("href").slice(1); // Get the target section ID
    document.getElementById(targetId).scrollIntoView({ behavior: "smooth" }); // Smooth scroll to the section
  });
});
