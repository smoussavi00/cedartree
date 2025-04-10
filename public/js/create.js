const show1 = document.getElementById('show-1');
const show2 = document.getElementById('show-2');

const email = document.getElementById('email');
const passw = document.getElementById("passw");
const passwconf = document.getElementById("passw-conf");

const req1 = document.getElementById("req-1");
const req2 = document.getElementById("req-2");
const req3 = document.getElementById("req-3");
const req4 = document.getElementById("req-4");
const req5 = document.getElementById("req-5");

var r1, r2, r3, r4, r5 = false;

show1.addEventListener("click",function(){passwtoggle(1)});
show2.addEventListener("click",function(){passwtoggle(2)});

passw.addEventListener("keyup",function(){requirements(); matching();});
passwconf.addEventListener("keyup",matching);
email.addEventListener("keyup",validemail);

document.getElementById("create-button").addEventListener("click",proccreate);
document.addEventListener('keydown', function(event) { if (event.key === 'Enter') proccreate(); });

document.getElementById("upper-return").addEventListener("click", function() {
  window.location.href = "/login";
});

document.getElementById("upper-return-2").addEventListener("click", function() {
  window.location.href = "/verify";
});

window.onload = async function(){

  await fetch('/api/session')
  .then(response => { return response.json(); })
  .then(data => { email = data.email; verified = data.verified; })
  .catch(error => {console.error('Error fetching session data:', error);}); 

  if(email && !verified) document.getElementById("upper-right").innerHTML = '<p class="upper-item" id="upper-return-2"> return to verify </p> <p class="upper-item upper-dash"> — </p> <p class="upper-item" id="upper-return"> return to login </p>';

};

function proccreate(){

  if(r1 && r2 && r3 && r4 && r5){
    var data = {
      email: email.value,
      password: passw.value
    };
    
    fetch('/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {return response.json()})
    .then(data => {
      if(data.message == "existsuser") throwerror("email already exists");
      else window.location.href = "/verify";
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    
  } else blink();
}

function validemail(){
  if(email.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)){
    req1.style.backgroundColor = '#d6d5cd';
    r1 = true;
  } else {
    req1.style.backgroundColor = '#121211';
    r1 = false;
  }
}

function requirements(){

  if(passw.value.length >= 8){ 
    req2.style.backgroundColor = '#d6d5cd';
    r2 = true;
  } else {
    req2.style.backgroundColor = '#121211';
    r2 = false;
  }
  
  if(/[a-z]/.test(passw.value)){
    req3.style.backgroundColor = '#d6d5cd';
    r3 = true;
  } else {
    req3.style.backgroundColor = '#121211';
    r3 = false;
  }

  if(/\d/.test(passw.value)){
    req4.style.backgroundColor = '#d6d5cd';
    r4 = true;
  } else {
    req4.style.backgroundColor = '#121211';
    r4 = false;
  }
}

function matching(){
  if(passw.value == passwconf.value && passw.value){
    req5.style.backgroundColor = '#d6d5cd';
    r5 = true;
  } else {
    req5.style.backgroundColor = '#121211';
    r5 = false;
  }
}

function passwtoggle(x) {
  if(x == 1) var p = document.getElementById("passw");
  if(x == 2) var p = document.getElementById("passw-conf");

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
  if(!r5){ 
    req5.style.backgroundColor = '#121211';
    setTimeout(function(){req5.style.backgroundColor = '#d6d5cd';}, 250);
    setTimeout(function(){req5.style.backgroundColor = '#121211';}, 500);
    setTimeout(function(){req5.style.backgroundColor = '#d6d5cd';}, 750);
    setTimeout(function(){req5.style.backgroundColor = '#121211';}, 1000);
  }
}

function throwerror(m) {
  var error = document.getElementById("error");
  error.innerHTML = `<div class="requirement-div" id="requirement-error"> <div class="requirement"> ${m} </div> <div class="ffsq" id="req-error" style="background-color:#d6d5cd"> </div> </div>`;
}

function clearerror() {
  var error = document.getElementById("error");
  error.innerHTML = "";
}