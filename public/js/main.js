gradient = ['#1e1e1d', '#231e1c', '#281d1b', '#2c1d19', '#311c18', '#361c17', '#3b1c16', '#3f1b15', '#441b14', '#491a12', '#4e1a11', '#521a10', '#57190f', '#5c190e', '#61180d', '#66180b', '#6a180a', '#6f1709', '#741708', '#791607', '#7d1606', '#821604', '#871503', '#8c1502', '#901401', '#951500', '#981801', '#9c1a01', '#9f1d02', '#a22003', '#a62303', '#a92604', '#ac2905', '#b02c05', '#b32f06', '#b63107', '#ba3407', '#bd3708', '#c03a09', '#c43d09', '#c7400a', '#ca430b', '#ce450b', '#d1480c', '#d54b0c', '#d84e0d', '#db510e', '#df540e', '#e2570f', '#e55a10', '#e75d10', '#e8610f', '#e9650f', '#e9690e', '#ea6d0e', '#ea710d', '#eb750d', '#ec790c', '#ec7d0c', '#ed810b', '#ed850b', '#ee890a', '#ef8c0a', '#ef9009', '#f09409', '#f09808', '#f19c08', '#f2a008', '#f2a407', '#f3a807', '#f3ac06', '#f4b006', '#f5b405', '#f5b805', '#f6bc04', '#f5be0a', '#f4bf12', '#f2c01a', '#f1c122', '#f0c22b', '#efc333', '#edc43b', '#ecc543', '#ebc54b', '#e9c653', '#e8c75b', '#e7c863', '#e6c96c', '#e4ca74', '#e3cb7c', '#e2cc84', '#e0cd8c', '#dfce94', '#decf9c', '#dcd0a4', '#dbd1ad', '#dad2b5', '#d9d3bd', '#d7d4c5', '#d6d5cd'];
modstate = 0;
level = 'day';
x = 1;

window.onload = function() {

    y = []

    levelswitch('day');
    maineventsetup();

    ygt().then(data => {y = data;});

};

function levelswitch(lv, y=[]){
    if(lv != 'day' && !y) return;
    const core = document.getElementById("core");
    core.innerHTML = '';
    if(lv == 'day'){
        level = 'day';
        fetch('/snip/day.html') 
        .then(response => response.text())
        .then(html => {
          document.getElementById("core").innerHTML = html;
        })
        .then(positiongen)
        .then(dayeventsetup)
        .then(xsqst)
        .then(modst)
        .catch(error => {
          console.error('Error loading day level:', error);
        }); 
    }
    if(lv == 'month'){
        level = 'month';
        fetch('/snip/month.html') 
        .then(response => response.text())
        .then(html => {
          document.getElementById("core").innerHTML = html;
        })
        .then(function(){monthgen(y)})
        .catch(error => {
          console.error('Error loading month level:', error);
        }); 
    }
    if(lv == 'year'){
        level = 'year';
        fetch('/snip/year.html') 
        .then(response => response.text())
        .then(html => {
          document.getElementById("core").innerHTML = html;
        })
        .then(function(){yeargen(y)})
        .catch(error => {
          console.error('Error loading year level:', error);
        }); 
    }
}

function maineventsetup(){
    document.getElementById("selector").addEventListener("mouseleave", function(){ levelhover("");});

    document.getElementById("level-day").addEventListener("mouseenter", function(){ levelhover("day");});
    document.getElementById("level-month").addEventListener("mouseenter", function(){ levelhover("month");});
    document.getElementById("level-year").addEventListener("mouseenter", function(){ levelhover("year");});
    
    document.getElementById("level-day").addEventListener("click", function(){levelswitch("day");});
    document.getElementById("level-month").addEventListener("click", function(){levelswitch("month",y);});
    document.getElementById("level-year").addEventListener("click", function(){levelswitch("year",y);});

    document.getElementById("upper-settings").addEventListener("click", function(){window.location.href = "/settings";});
}

function dayeventsetup(){

    const m1 = document.getElementById("mod-1");
    const m2 = document.getElementById("mod-2");
    const m3 = document.getElementById("mod-3");

    document.getElementById("x-range").addEventListener("input",displaychange);

    m1.addEventListener("click",function(){modchange(1);});
    m2.addEventListener("click",function(){modchange(2);});
    m3.addEventListener("click",function(){modchange(3);});

    m1.addEventListener("mouseenter",function(){modhover(1,true);});
    m2.addEventListener("mouseenter",function(){modhover(2,true);});
    m3.addEventListener("mouseenter",function(){modhover(3,true);});

    m1.addEventListener("mouseleave",function(){modhover(1,false);});
    m2.addEventListener("mouseleave",function(){modhover(2,false);});
    m3.addEventListener("mouseleave",function(){modhover(3,false);});

}

function positiongen(){

    const now = new Date();
    const dayn = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const day = now.getDate();

    for (let i = 1; i <= 35; i++) {
        pr = document.getElementById(`pr-${Math.ceil(i / 7)}`);
        if(i <= dayn){ 
            if(i == day) pr.innerHTML += '<div class="pos-day" id="today"></div>';
            else pr.innerHTML += '<div class="pos-day"></div>';
        } else {
            pr.innerHTML += '<div class="pos-day pos-fill"></div>';
        }
    }
}

function displaychange(){
    document.getElementById("xsq").style.backgroundColor = gradient[xgt()-1];
    x = xgt();
}  

function xsqst(){
    document.getElementById("xsq").style.backgroundColor = gradient[x-1];
    document.getElementById("x-range").value = x;
}

function modst(){
    if(modstate != 0){
        modchange(modstate,true);
    }
}

function monthgen(y){

    const now = new Date();
    const dayn = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const day = now.getDate();
    const month = now.getMonth();

    for (let i = 1; i <= 35; i++) {
        mr = document.getElementById(`mr-${Math.ceil(i / 7)}`);
        if(i <= dayn){ 
            if(i == day){
                if(modstate == 0) mr.innerHTML += `<div class="m-day" style="background-color:${gradient[x-1]}"> </div>`;
                else mr.innerHTML += `<div class="m-day" style="background-color:${gradient[x-1]}"> <img src="assets/mod-${modstate}b.png" width="90%" height="auto"> </div>`;
            } else{
                if(y[month][i-1][1] != 0) mr.innerHTML += `<div class="m-day" style="background-color:${gradient[y[month][i-1][0]]}"> <img src="assets/mod-${y[month][i-1][1]}b.png" width="90%" height="auto"> </div>`;
                else mr.innerHTML += `<div class="m-day" style="background-color:${gradient[y[month][i-1][0]]}"> </div>`;
            }
        } else {
            mr.innerHTML += '<div class="m-day m-fill"></div>';
        }
    }

}

function yeargen(y){

    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth();

    for (let i = 1; i <= 12; i++){
        const dayn = new Date(now.getFullYear(), i, 0).getDate();
        for (let j = 1; j <= 35; j++) {
            ymr = document.getElementById(`ymr-${i}-${Math.ceil(j / 7)}`);
            if(j <= dayn){ 
                if(j == day && i == month+1) ymr.innerHTML += `<div class="y-day" style="background-color:${gradient[x-1]}"></div>`;
                else ymr.innerHTML += `<div class="y-day" style="background-color:${gradient[y[i-1][j-1][0]]}"></div>`;
            } else {
                ymr.innerHTML += '<div class="y-day m-fill"></div>';
            }
        }
    }
}

function levelhover(lv){

    const ld = document.getElementById("level-day");
    const lm = document.getElementById("level-month");
    const ly = document.getElementById("level-year");

    if(!lv){
        ld.style.backgroundColor = '#941400'
        lm.style.backgroundColor = '#e75b10';
        ly.style.backgroundColor = '#f6bd04';
    }
    if(lv == "day"){
        ld.style.backgroundColor = '#941400'
        lm.style.backgroundColor = '#121211';
        ly.style.backgroundColor = '#121211';
    }
    if(lv == "month"){
        ld.style.backgroundColor = '#121211';
        lm.style.backgroundColor = '#e75b10';
        ly.style.backgroundColor = '#121211';
    }
    if(lv == "year"){
        ld.style.backgroundColor = '#121211';
        lm.style.backgroundColor = '#121211';
        ly.style.backgroundColor = '#f6bd04';
    }
}

function modchange(m,modst=false){
    
    document.getElementById("xsq").innerHTML = '';

    document.getElementById("mod-1").style.backgroundColor = '#2b2b29';
    document.getElementById("mod-2").style.backgroundColor = '#2b2b29';
    document.getElementById("mod-3").style.backgroundColor = '#2b2b29';

    mc = document.getElementById(`mod-${m}`);
    if(modstate != m || modst) { 
        document.getElementById("xsq").innerHTML += `<img src="assets/mod-${m}b.png" width="90%" height="auto">`;
        mc.style.backgroundColor = '#41413f';
        modstate = m;
    } else {
        modstate = 0;
    }
}

function modhover(m,hover){
    if(hover){
        if(modstate !=m){
            mc = document.getElementById(`mod-${m}`);
            mc.style.backgroundColor = '#41413f';
        }
    } else {
        if(modstate !=m){
            mc = document.getElementById(`mod-${m}`);
            mc.style.backgroundColor = '#2b2b29';
        }
    }
}

function xgt(){
    return document.getElementById("x-range").value;
}

function ygt(){
    return fetch('/assets/yearsample2.json')
    .then(response => {
        return response.json(); 
    });
}
