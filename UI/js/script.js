const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  links.forEach((link) => {
    link.classList.toggle('fade');
  });
});
/*
function updateFunction() {
  location.replace('edit-delete-article.html');
}
function postFunction() {
  location.replace('view-articles.html');
}
*/
