const loader = document.querySelector('.loader');
/* const loaderbook = document.querySelector('.loaderbook'); */


//Smoothly make the loader disappear and change its z-index to something lower than the buttons
window.addEventListener('load', () => {

  loader.classList.add('fading-out');

  document.body.classList.remove('no-scroll');

  // Activate Bootstrap scrollspy on the main nav element
  const mainNav = document.body.querySelector('#mainNav');
  if (mainNav) {
      new bootstrap.ScrollSpy(document.body, {
          target: '#mainNav',
          offset: 74,
      });
  };

})

var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
        }

        setTimeout(function() {
        that.tick();
        }, delta);
    };

    window.onload = function() {
        var elements = document.getElementsByClassName('typewrite');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
              new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
        document.body.appendChild(css);
    };


document.querySelector('#background-video').playbackRate = 0.5;


function modifier(sChemin, sPropriete, sVal) {
  var bFind = false,
      aStyleSheets = document.styleSheets,
      exp_reg =  new RegExp(sChemin, "gi");
  //console.log(aStyleSheets);
  // si la css est externe et d'un autre nom de domaine
  // cssRules: lève une DOMException: "The operation is insecure."
  // code: 18
  // message: "The operation is insecure."
  // name: "SecurityError"
  //
  for(var i = 0; i < aStyleSheets.length; ++i){
    try{
      var aCssRules =  aStyleSheets[i].cssRules;
      for(var j = 0; j < aCssRules.length; ++j){
        console.log(aCssRules[j].selectorText);
        if(exp_reg.test(aCssRules[j].selectorText)){
          aCssRules[j].style[sPropriete] = sVal;
          console.log("Trouvé", aCssRules[j].style[sPropriete]);
          bFind = true;
        }//if
      }//for

    }catch(error) {
      //cssRules: lève une DOMException: "The operation is insecure."
      //console.log(error);
      continue
    }
  }

  return bFind;
}



var subnavContent = document.querySelectorAll(".subnav-content");
var subnavHover = document.querySelectorAll(".subnav:hover");

window.onscroll = function() {
  "use strict";
  if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
    console.log(modifier(".subnav:hover", "background-color", "#FFD700"));
    for (var i = 0; i < subnavContent.length; i++) {
      subnavContent[i].classList.add("scrolled");
    }
  } else {
    console.log(modifier(".subnav:hover", "background-color", "#000"));
    for (var i = 0; i < subnavContent.length; i++) {
      subnavContent[i].classList.remove("scrolled");
    }
  }
};


function validateForm(form) {
  var x = document.forms["form-signup"]["winnie"].value;
  if ( x == "" || x == null ){// if the honeypot was ignored, it's a hu-mon
  
  }
  else{// the honeypot was filled in, it's a robot
    form.action="html/Void.html"// link directly to thank you without actually processing form    
    return false;
  }
}



const lore = document.querySelector('.lore');
const cross = document.querySelector('.cross');
const lorebutt = document.getElementById("lore-button");


lorebutt.addEventListener('click', function() {

  //checking if there is a class 
  if (lore.classList.contains('fading-out')) {
    for (const element of document.querySelectorAll(".lore")) {
      element.style.zIndex = -1;
    }
    //restart animation rotate
    lore.classList.remove('fading-out');
    void lore.offsetWidth;
  }
  
  document.body.classList.add('no-scroll');
  lore.classList.add('fading-in');

});

let rippleDiv;

cross.addEventListener("mouseenter", (e) => {
  //get the coordinates of the cursor
  const left = e.clientX - e.target.getBoundingClientRect().left;
  const top = e.clientY - e.target.getBoundingClientRect().top;

  rippleDiv = document.createElement("div");
  rippleDiv.classList.add("ripple");
  rippleDiv.style.left = `${left}px`;
  rippleDiv.style.top = `${top}px`;

  cross.prepend(rippleDiv);
});

cross.addEventListener("mouseleave", () => {
  cross.removeChild(rippleDiv);
});

cross.addEventListener('click', function() {

  //checking if there is a class 
  if (lore.classList.contains('fading-in')) {
  for (const element of document.querySelectorAll(".lore")) {
    element.style.zIndex = 9999;
  }
  //restart animation rotate
  lore.classList.remove('fading-in');
  void lore.offsetWidth;
}
  
  document.body.classList.remove('no-scroll');
  lore.classList.add('fading-out');

  // Activate Bootstrap scrollspy on the main nav element
  const mainNav = document.body.querySelector('#mainNav');
  if (mainNav) {
      new bootstrap.ScrollSpy(document.body, {
          target: '#mainNav',
          offset: 74,
      });
  };

});



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

$('#emailAddress').on('input', validate);


$(document).ready(function(){
  $("p").hover(function(){
    $(this).css("background-color", "yellow");
    }, function(){
    $(this).css("background-color", "pink");
  });
}); */