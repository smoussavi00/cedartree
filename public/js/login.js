const show1 = document.getElementById('show-1');

show1.addEventListener("click",passwtoggle);

document.getElementById("signin-button").addEventListener("click",procsignin);
document.addEventListener('keydown', function(event) { if (event.key === 'Enter') procsignin(); });

document.getElementById("upper-forgot").addEventListener("click", function() {
  window.location.href = "/forgot";
});

document.getElementById("upper-create").addEventListener("click", function() {
  window.location.href = "/create";
});

function procsignin() {

  clearerror();

  var email = document.getElementById("email").value;
  var passw = document.getElementById("passw").value;

  if (email === "" || passw === "") {
    throwerror("empty fields");
    return;
  }
  if (!email.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
    throwerror("invalid email");
    return;
  } 

  
  var data = {
    email: email,
    password: passw
  };
  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => { return response.json(); })
  .then(data => {
    if(data.message == "goodlogin"){
      window.location.href = "/main";
    } else if(data.message == "badpass"){
      throwerror("invalid password");
    } else if(data.message == "unverified"){
      throwerror("email not verified");
    } else if(data.message == "bademail"){
      throwerror("email not found");
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });

}

function passwtoggle() {
  var p = document.getElementById("passw");
  if (p.type === "password") {
    p.type = "text";
  } else {
    p.type = "password";
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

