const show1 = document.getElementById('show-1');
const show2 = document.getElementById('show-2');

const npassw = document.getElementById("new-passw");
const npasswconf = document.getElementById("new-passw-conf");

const req1 = document.getElementById("req-1");
const req2 = document.getElementById("req-2");
const req3 = document.getElementById("req-3");
const req4 = document.getElementById("req-4");

var r1, r2, r3, r4 = false;

show1.addEventListener("click",function(){passwtoggle(1)});
show2.addEventListener("click",function(){passwtoggle(2)});

npassw.addEventListener("keyup",function(){requirements(); matching();});
npasswconf.addEventListener("keyup",matching);

document.getElementById("reset-button").addEventListener("click",procreset);
document.addEventListener('keydown', function(event) { if (event.key === 'Enter') procreset(); });

function procreset(){
  if(r1 && r2 && r3 && r4){
    var data = {
      password: npassw.value
    };
    /*
    fetch('/reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      window.location.href = "/login";
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    */
  } else {
    blink();
  }
}

function requirements(){

  if(npassw.value.length >= 8){ 
    req1.style.backgroundColor = '#d6d5cd';
    r1 = true;
  } else {
    req1.style.backgroundColor = '#121211';
    r1 = false;
  }
  
  if(/[a-z]/.test(npassw.value)){
    req2.style.backgroundColor = '#d6d5cd';
    r2 = true;
  } else {
    req2.style.backgroundColor = '#121211';
    r2 = false;
  }

  if(/\d/.test(npassw.value)){
    req3.style.backgroundColor = '#d6d5cd';
    r3 = true;
  } else {
    req3.style.backgroundColor = '#121211';
    r3 = false;
  }
}

function matching(){
  if(npassw.value == npasswconf.value && npassw.value){
    req4.style.backgroundColor = '#d6d5cd';
    r4 = true;
  } else {
    req4.style.backgroundColor = '#121211';
    r4 = false;
  }
}

function passwtoggle(x) {
  if(x == 1) var p = document.getElementById("new-passw");
  if(x == 2) var p = document.getElementById("new-passw-conf");

  if (p.type === "password") {
    p.type = "text";
  } else {
    p.type = "password";
  }
}

function blink(){
  if(!r1){ 
    req1.style.backgroundColor = '#121211';
    setTimeout(function(){req1.style.backgroundColor = '#d6d5cd';}, 250);
    setTimeout(function(){req1.style.backgroundColor = '#121211';}, 500);
    setTimeout(function(){req1.style.backgroundColor = '#d6d5cd';}, 750);
    setTimeout(function(){req1.style.backgroundColor = '#121211';}, 1000);
  } 
  if(!r2){ 
    req2.style.backgroundColor = '#121211';
    setTimeout(function(){req2.style.backgroundColor = '#d6d5cd';}, 250);
    setTimeout(function(){req2.style.backgroundColor = '#121211';}, 500);
    setTimeout(function(){req2.style.backgroundColor = '#d6d5cd';}, 750);
    setTimeout(function(){req2.style.backgroundColor = '#121211';}, 1000);
  }
  if(!r3){ 
    req3.style.backgroundColor = '#121211';
    setTimeout(function(){req3.style.backgroundColor = '#d6d5cd';}, 250);
    setTimeout(function(){req3.style.backgroundColor = '#121211';}, 500);
    setTimeout(function(){req3.style.backgroundColor = '#d6d5cd';}, 750);
    setTimeout(function(){req3.style.backgroundColor = '#121211';}, 1000);
  }
  if(!r4){ 
    req4.style.backgroundColor = '#121211';
    setTimeout(function(){req4.style.backgroundColor = '#d6d5cd';}, 250);
    setTimeout(function(){req4.style.backgroundColor = '#121211';}, 500);
    setTimeout(function(){req4.style.backgroundColor = '#d6d5cd';}, 750);
    setTimeout(function(){req4.style.backgroundColor = '#121211';}, 1000);
  }
}