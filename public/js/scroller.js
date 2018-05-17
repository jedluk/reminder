const scroller = document.getElementById("scroller");
let toggleUp = false;

window.addEventListener('scroll', () => {
  if (document.body.clientHeight - (window.pageYOffset + window.innerHeight) < 200) {
    scroller.firstChild.nextSibling.className = "fas fa-arrow-up";
    toggleUp = true;
  } 
})

scroller.addEventListener("click", () => {
  toggleUp ? scrollUp() : scrollDown();
});

const scrollDown = () => {
  window.scrollBy({
    top: document.querySelector(".row").clientHeight + 75,
    left: 0,
    behavior: "smooth"
  });
}

const scrollUp = () => {
  console.log('setting false')
  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth"
  });
  setTimeout(() => {
    scroller.firstChild.nextSibling.className = "fas fa-arrow-down";
    toggleUp = false;
  }, 1000)
}