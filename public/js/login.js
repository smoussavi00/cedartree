const show1 = document.getElementById('show-1');

show1.addEventListener("click",passwtoggle);

function passwtoggle() {
  var p = document.getElementById("passw");
  if (p.type === "password") {
    p.type = "text";
  } else {
    p.type = "password";
  }
}