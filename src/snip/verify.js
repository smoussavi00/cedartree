const digit1 = document.getElementById("digit-1");
const digit2 = document.getElementById("digit-2");
const digit3 = document.getElementById("digit-3");
const digit4 = document.getElementById("digit-4");
const digit5 = document.getElementById("digit-5");
const digit6 = document.getElementById("digit-6");

digit1.addEventListener("input", function() { {digit2.focus(); }});
digit2.addEventListener("input", function() {if (this.value.length === 1) {digit3.focus(); }});
digit3.addEventListener("input", function() {if (this.value.length === 1) {digit4.focus(); }});
digit4.addEventListener("input", function() {if (this.value.length === 1) {digit5.focus(); }});
digit5.addEventListener("input", function() {if (this.value.length === 1) {digit6.focus(); }});
