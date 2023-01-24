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

}, 5000)

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

const validate = () => {
  const $result = $('#result');
  const email = $('#emailAddress').val();
  $result.text('');

  if (validateEmail(email)) {
    $result.text(email + ' is valid :)');
    $result.css('color', 'green');
  } else {
    $result.text(email + ' is not valid :(');
    $result.css('color', 'red');
  }
  return false;
}

$('#emailAddress').on('input', validate); */
