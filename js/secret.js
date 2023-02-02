document.addEventListener('click', musicPlay);
function musicPlay() {
  document.getElementById('player').volume = 0.05;
  document.getElementById('player').play();
  document.removeEventListener('click', musicPlay);
}


const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const notes = [
  {f:262,d:.5,t:"Hap",p:p1},
  {f:262,d:.5,t:"py&nbsp;",p:p1},
  {f:294,d:1,t:"Birth",p:p1},
  {f:262,d:1,t:"day&nbsp;",p:p1},
  {f:349,d:1,t:"To&nbsp;",p:p1},
  {f:330,d:2,t:"You",p:p1},
  
  {f:262,d:.5,t:"Hap",p:p2},
  {f:262,d:.5,t:"py&nbsp;",p:p2},
  {f:294,d:1,t:"Birth",p:p2},
  {f:262,d:1,t:"day&nbsp;",p:p2},
  {f:392,d:1,t:"To&nbsp;",p:p2},
  {f:349,d:2,t:"You",p:p2},
  
  {f:262,d:.5,t:"Hap",p:p3},
  {f:262,d:.5,t:"py&nbsp;",p:p3},
  {f:523,d:1,t:"Birth",p:p3},
  {f:440,d:1,t:"day&nbsp;",p:p3},
  {f:349,d:1,t:"Dear&nbsp;",p:p3},
  {f:330,d:1,t:"Apo",p:p3},
  {f:294,d:3,t:"lline",p:p3},
  
  {f:466,d:.5,t:"Hap",p:p4},
  {f:466,d:.5,t:"py&nbsp;",p:p4},
  {f:440,d:1,t:"Birth",p:p4},
  {f:349,d:1,t:"day&nbsp;",p:p4},
  {f:392,d:1,t:"To&nbsp;",p:p4},
  {f:349,d:6,t:"Youuu",p:p4},
];

//DOM
notes.map((n) => createSpan(n));

function createSpan(n){
  n.sp = document.createElement("span");
  n.sp.innerHTML = n.t;
  n.p.appendChild(n.sp);
}

// SOUND
let speed = inputSpeed.value;
let flag = false;
let sounds = [];

class Sound{
  constructor(freq,dur,i){
    this.stop = true;
    this.frequency = freq;// la frecuencia
    this.waveform = "triangle";// la forma de onda
    this.dur = dur;// la duración en segundos
    this.speed = this.dur*speed;
    this.initialGain = .15;
    this.index = i;
    this.sp = notes[i].sp
  }
  
  cease(){
    this.stop = true;
    this.sp.classList.remove("jump");
    //this.sp.style.animationDuration = `${this.speed}s`;
    if(this.index < sounds.length-1){sounds[this.index+1].play();}
    if(this.index == sounds.length-1){flag = false;}
  }
  
  play(){
   // crea un nuevo oscillator
   this.oscillator = audioCtx.createOscillator();
   // crea un nuevo nodo de ganancia 
   this.gain = audioCtx.createGain();
   // establece el valor inicial del volumen del sonido 
   this.gain.gain.value = this.initialGain;
   // establece el tipo de oscillator  
   this.oscillator.type = this.waveform;
   // y el valor de la frecuencia 
   this.oscillator.frequency.value = this.frequency;
   // el volumen del sonido baja exponencialmente     
   this.gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + this.speed);
   // conecta el oscillator con el nodo de ganancia 
   this.oscillator.connect(this.gain);
   // y la ganancia con el dispositivo de destino
   this.gain.connect(audioCtx.destination);
   // inicia el oscillator 
   this.oscillator.start(audioCtx.currentTime);
   this.sp.setAttribute("class", "jump");
   this.stop = false;
   // para el oscillator después de un tiempo (this.speed) 
   this.oscillator.stop(audioCtx.currentTime + this.speed); 
   this.oscillator.onended = ()=> {this.cease();}
  }  
}

for(let i=0; i < notes.length; i++){
  let sound = new Sound(notes[i].f, notes[i].d,i);
  sounds.push(sound);
}


// EVENTS
wishes.addEventListener("click",function(e){
  if(e.target.id != "inputSpeed" && !flag){
  sounds[0].play();
  flag = true;}
  },false);
                        
                        
inputSpeed.addEventListener("input",function(e){
  speed = this.value;
  sounds.map((s) => {
    s.speed = s.dur*speed
  });
},false)

// CANVAS
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let cw = canvas.width = window.innerWidth,
  cx = cw / 2;
let ch = canvas.height = window.innerHeight,
  cy = ch / 2;

let requestId = null;

const colors = ["#93DFB8","#FFC8BA","#E3AAD6","#B5D8EB","#FFBDD8"];

class Particle{
  constructor(){
    this.x = Math.random() * cw;
    this.y = Math.random() * ch;
    this.r = 15 + ~~(Math.random() * 20);//radius of the circumcircle
    this.l = 3 + ~~(Math.random() * 2);//polygon sides
    this.a = 2*Math.PI/this.l;// angle between polygon vertices
    this.rot = Math.random()*Math.PI;// polygon rotation
    this.speed = .05 + Math.random()/2;
    this.rotSpeed = 0.005 + Math.random()*.005;
    this.color = colors[~~(Math.random() * colors.length)];
  }
  update(){
    if(this.y < -this.r){
      this.y = ch + this.r;
      this.x = Math.random() * cw;
    }
    this.y -= this.speed;
  }
  draw(){
    ctx.save();
    ctx.translate(this.x,this.y);
    ctx.rotate(this.rot);
    ctx.beginPath();
    for( let i = 0; i < this.l; i++ ){
		let x = this.r * Math.cos( this.a*i );
		let y = this.r * Math.sin( this.a*i );
		ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = this.color;
    ctx.stroke();
    
    ctx.restore();
  }
  
}

let particles = [];
for(let i = 0; i < 20; i++){
let p = new Particle();
particles.push(p)
}



function Draw() {
requestId = window.requestAnimationFrame(Draw);
//ctx.globalAlpha=0.65;
ctx.clearRect(0,0,cw,ch);
particles.map((p) => {
  p.rot += p.rotSpeed;
  p.update();
  p.draw();
})

}


function Init() {
	if (requestId) {
		window.cancelAnimationFrame(requestId);
		requestId = null;
}


cw = canvas.width = window.innerWidth,cx = cw / 2;
ch = canvas.height = window.innerHeight,cy = ch / 2;

//particles.map((p) => p.update());
Draw();
};

setTimeout(function() {
		Init();
		window.addEventListener('resize', Init, false);
}, 15);



let W = window.innerWidth;
let H = window.innerHeight;
const context = canvas.getContext("2d");
const maxConfettis = 150;
const particles2 = [];

const possibleColors = [
  "DodgerBlue",
  "OliveDrab",
  "Gold",
  "Pink",
  "SlateBlue",
  "LightBlue",
  "Gold",
  "Violet",
  "PaleGreen",
  "SteelBlue",
  "SandyBrown",
  "Chocolate",
  "Crimson"
];

function randomFromTo(from, to) {
  return Math.floor(Math.random() * (to - from + 1) + from);
}

function confettiParticle() {
  this.x = Math.random() * W; // x
  this.y = Math.random() * H - H; // y
  this.r = randomFromTo(11, 33); // radius
  this.d = Math.random() * maxConfettis + 11;
  this.color =
    possibleColors[Math.floor(Math.random() * possibleColors.length)];
  this.tilt = Math.floor(Math.random() * 33) - 11;
  this.tiltAngleIncremental = Math.random() * 0.07 + 0.05;
  this.tiltAngle = 0;

  this.draw = function() {
    context.beginPath();
    context.lineWidth = this.r / 2;
    context.strokeStyle = this.color;
    context.moveTo(this.x + this.tilt + this.r / 3, this.y);
    context.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 5);
    return context.stroke();
  };
}

function Draw() {
  const results = [];

  // Magical recursive functional love
  requestAnimationFrame(Draw);

  context.clearRect(0, 0, W, window.innerHeight);

  for (var i = 0; i < maxConfettis; i++) {
    results.push(particles2[i].draw());
  }

  let particle = {};
  let remainingFlakes = 0;
  for (var i = 0; i < maxConfettis; i++) {
    particle = particles2[i];

    particle.tiltAngle += particle.tiltAngleIncremental;
    particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2;
    particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;

    if (particle.y <= H) remainingFlakes++;

    // If a confetti has fluttered out of view,
    // bring it back to above the viewport and let if re-fall.
    if (particle.x > W + 30 || particle.x < -30 || particle.y > H) {
      particle.x = Math.random() * W;
      particle.y = -30;
      particle.tilt = Math.floor(Math.random() * 10) - 20;
    }
  }

  return results;
}

window.addEventListener(
  "resize",
  function() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  },
  false
);

// Push new confetti objects to `particles2[]`
for (var i = 0; i < maxConfettis; i++) {
  particles2.push(new confettiParticle());
}

// Initialize
canvas.width = W;
canvas.height = H;
Draw();

// 