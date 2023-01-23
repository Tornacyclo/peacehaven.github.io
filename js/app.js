const loader = document.querySelector('.loader');
/* const loaderbook = document.querySelector('.loaderbook'); */


//Smoothly make the loader disappear and change its z-index to something lower than the buttons
window.addEventListener('load', () => {

  loader.classList.add('fondu-out');
  //loaderbook.classList.add('fondu-out');
  document.body.classList.remove('no-scroll');

  setTimeout(() => {

    loader.style.zIndex = "-1";

  }, 1000)

})

/* //Remove the elements that is not required anymore
setTimeout(() => {

  loader.style.display = "none";
  loaderbook.style.display = "none";

}, 5000) */
