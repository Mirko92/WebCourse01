// (function() {
//   console.log("I am navbar.js");
// })();


console.log("I am navbar.js");

const navBarItems = [...document.querySelectorAll(
  ".navbar ul li a"
)];

let currentPage = window.location.href.split("/").pop();
if (currentPage.includes("#")) {
  currentPage = currentPage.split("#")[0];
}
console.log("Current page: ", currentPage);

const currentNavBarItem = navBarItems.find(
  x => x.getAttribute("href").endsWith(currentPage) 
);

currentNavBarItem?.classList.add("active-link");