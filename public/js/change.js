const show1 = document.getElementById('show-1');
const show2 = document.getElementById('show-2');
const show3 = document.getElementById('show-3');

const npassw = document.getElementById("new-passw");
const npasswconf = document.getElementById("new-passw-conf");

const req1 = document.getElementById("req-1");
const req2 = document.getElementById("req-2");
const req3 = document.getElementById("req-3");
const req4 = document.getElementById("req-4");

show1.addEventListener("click",function(){passwtoggle(1)});
show2.addEventListener("click",function(){passwtoggle(2)});
show3.addEventListener("click",function(){passwtoggle(3)});

npassw.addEventListener("keyup",function(){requirements(); matching();});
npasswconf.addEventListener("keyup",matching);

function passwtoggle(x) {

    if(x == 1) var p = document.getElementById("old-passw");
    if(x == 2) var p = document.getElementById("new-passw");
    if(x == 3) var p = document.getElementById("new-passw-conf");

    if (p.type === "password") {
        p.type = "text";
    } else {
        p.type = "password";
    }
}

function requirements(){

  if(npassw.value.length >= 8) req1.style.backgroundColor = '#d6d5cd';
  else req1.style.backgroundColor = '#121211';
  
  if(/[a-z]/.test(npassw.value)) req2.style.backgroundColor = '#d6d5cd';
  else req2.style.backgroundColor = '#121211';

  if(/\d/.test(npassw.value)) req3.style.backgroundColor = '#d6d5cd';
  else req3.style.backgroundColor = '#121211';

}

function matching(){
  if(npassw.value == npasswconf.value && npassw.value) req4.style.backgroundColor = '#d6d5cd';
  else req4.style.backgroundColor = '#121211';
}