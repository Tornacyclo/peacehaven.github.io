const loader = document.querySelector('.loader');
const loaderbook = document.querySelector('.loader');

window.addEventListener('load', () => {

    loader.classList.add('fondu-out');
    loaderbook.classList.add('fondu-out');
    document.body.classList.remove('no-scroll');

})

/* setTimeout(() => {

  loader.classList.add('fondu-out');
  loaderbook.classList.add('fondu-out');
  document.body.classList.remove('no-scroll');

}, 5000) */
