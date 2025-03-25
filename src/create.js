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

show1.addEventListener("click",function(){passwtoggle(1)});
show2.addEventListener("click",function(){passwtoggle(2)});

passw.addEventListener("keyup",function(){requirements(); matching();});
passwconf.addEventListener("keyup",matching);
email.addEventListener("keyup",validemail);

function passwtoggle(x) {
  if(x == 1) var p = document.getElementById("passw");
  if(x == 2) var p = document.getElementById("passw-conf");

  if (p.type === "password") {
    p.type = "text";
  } else {
    p.type = "password";
  }
}

function validemail(){
  if(email.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)){
    req1.style.backgroundColor = '#e2e1dc';
  } else req1.style.backgroundColor = '#181817';

}

function requirements(){

  if(passw.value.length >= 8) req2.style.backgroundColor = '#e2e1dc';
  else req2.style.backgroundColor = '#181817';
  
  if(/[a-z]/.test(passw.value)) req3.style.backgroundColor = '#e2e1dc';
  else req3.style.backgroundColor = '#181817';

  if(/\d/.test(passw.value)) req4.style.backgroundColor = '#e2e1dc';
  else req4.style.backgroundColor = '#181817';

}

function matching(){
  if(passw.value == passwconf.value) req5.style.backgroundColor = '#e1e1dc';
  else req5.style.backgroundColor = '#181817';
}