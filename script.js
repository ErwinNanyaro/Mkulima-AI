document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.getElementById("menu-button");
  const menu = document.getElementById("menu");
  const links = document.querySelectorAll("#menu ul li a");
  const sections = document.querySelectorAll("main section");

  menuButton.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);

      sections.forEach((section) => {
        section.classList.add("hidden");
      });

      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.classList.remove("hidden");
      }

      menu.classList.add("hidden");
    });
  });
});
