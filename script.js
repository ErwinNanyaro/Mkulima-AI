document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("menu-button");
  const menu = document.getElementById("menu");
  const sections = document.querySelectorAll("main section");
  const dropdownLinks = document.querySelectorAll("nav .dropdown-menu a");
  const generalLinks = document.querySelectorAll('nav > ul > li > a');
  const urbanProjects = document.getElementById("urban-projects");
  const ruralProjects = document.getElementById("rural-projects");

  // Toggle menu visibility
  menuButton.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });

  // Helper function to show a specific section
  const showSection = (sectionId) => {
    sections.forEach((section) => section.classList.add("hidden")); // Hide all sections
    if (sectionId && document.getElementById(sectionId)) {
      document.getElementById(sectionId).classList.remove("hidden"); // Show the target section
    }
    menu.classList.add("hidden"); // Close the menu
  };

  // Handle general menu links
  generalLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const sectionId = link.getAttribute("data-section");
      showSection(sectionId);
    });
  });

  // Handle dropdown menu links
  dropdownLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const sectionId = link.getAttribute("data-section");
      showSection(sectionId);
    });
  });

  // Toggle Urban Projects
  document.getElementById("urban-projects-toggle")?.addEventListener("click", (e) => {
    e.preventDefault();
    urbanProjects.classList.toggle("hidden");
    ruralProjects.classList.add("hidden"); // Ensure rural projects are hidden
  });

  // Toggle Rural Projects
  document.getElementById("rural-projects-toggle")?.addEventListener("click", (e) => {
    e.preventDefault();
    ruralProjects.classList.toggle("hidden");
    urbanProjects.classList.add("hidden"); // Ensure urban projects are hidden
  });

  // Slideshow Functionality
  const galleryItems = document.querySelectorAll(".gallery-item");
  let currentIndex = 0;

  const updateGallery = () => {
    galleryItems.forEach((item, index) => {
      item.classList.remove("active");
      if (index === currentIndex) {
        item.classList.add("active");
      }
    });
  };

  const nextSlide = () => {
    currentIndex = (currentIndex + 1) % galleryItems.length; // Loop back to the first slide
    updateGallery();
  };

  const prevSlide = () => {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length; // Loop back to the last slide
    updateGallery();
  };

  // Set up automatic slideshow transition
  let slideshowInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds

  // Optional: Add event listeners for manual navigation buttons
  document.getElementById("prev-slide")?.addEventListener("click", () => {
    clearInterval(slideshowInterval); // Pause automatic slideshow on manual interaction
    prevSlide();
    slideshowInterval = setInterval(nextSlide, 5000); // Restart automatic slideshow
  });

  document.getElementById("next-slide")?.addEventListener("click", () => {
    clearInterval(slideshowInterval); // Pause automatic slideshow on manual interaction
    nextSlide();
    slideshowInterval = setInterval(nextSlide, 5000); // Restart automatic slideshow
  });

  // Initialize the gallery
  updateGallery();
});
