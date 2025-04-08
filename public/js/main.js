const gradient = ['#1e1e1d', '#231e1c', '#281d1b', '#2c1d19', '#311c18', '#361c17', '#3b1c16', '#3f1b15', '#441b14', '#491a12', '#4e1a11', '#521a10', '#57190f', '#5c190e', '#61180d', '#66180b', '#6a180a', '#6f1709', '#741708', '#791607', '#7d1606', '#821604', '#871503', '#8c1502', '#901401', '#951500', '#981801', '#9c1a01', '#9f1d02', '#a22003', '#a62303', '#a92604', '#ac2905', '#b02c05', '#b32f06', '#b63107', '#ba3407', '#bd3708', '#c03a09', '#c43d09', '#c7400a', '#ca430b', '#ce450b', '#d1480c', '#d54b0c', '#d84e0d', '#db510e', '#df540e', '#e2570f', '#e55a10', '#e75d10', '#e8610f', '#e9650f', '#e9690e', '#ea6d0e', '#ea710d', '#eb750d', '#ec790c', '#ec7d0c', '#ed810b', '#ed850b', '#ee890a', '#ef8c0a', '#ef9009', '#f09409', '#f09808', '#f19c08', '#f2a008', '#f2a407', '#f3a807', '#f3ac06', '#f4b006', '#f5b405', '#f5b805', '#f6bc04', '#f5be0a', '#f4bf12', '#f2c01a', '#f1c122', '#f0c22b', '#efc333', '#edc43b', '#ecc543', '#ebc54b', '#e9c653', '#e8c75b', '#e7c863', '#e6c96c', '#e4ca74', '#e3cb7c', '#e2cc84', '#e0cd8c', '#dfce94', '#decf9c', '#dcd0a4', '#dbd1ad', '#dad2b5', '#d9d3bd', '#d7d4c5', '#d6d5cd'];
const now = new Date();
const d = now.getDate();
const m = now.getMonth();

var modstate = 0;
var level = '';
var x = 1;

var monthcache = '';
var yearcache = '';

var email;
ds_sample = 120;
dsi_sample = 150;
avg1_sample = 80.7;
avg2_sample = 1.3;

window.onload = async function() {

    await fetch('/api/session')
    .then(response => { return response.json();})
    .then(data => { email = data.email;})
    .catch(error => {console.error('Error fetching session data:', error);});

    emailst();

    y = []

    levelswitch('day');
    maineventsetup();

    ygt_sample().then(data => {y = data;}).then(() => {
        monthcache = monthgen(y);
        yearcache = yeargen(y);
    });

};

function levelswitch(lv, y=[]){

    if(lv == level) return;
    if(lv != 'day' && !y) return;

    if(lv == 'day'){
        level = 'day';
        fetch('/snip/day.html') 
        .then(response => response.text())
        .then(html => {
          corest(html);
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
        corest(monthcache);
    }
    if(lv == 'year'){
        level = 'year';
        corest(yearcache);
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
    document.getElementById("upper-email").addEventListener("click", statgen);
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

    document.getElementById("set").addEventListener("click", dayst);

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

function dayst(){

    y[m][d-1][0] = x;
    y[m][d-1][1] = modstate;

    monthcache = monthgen(y);
    yearcache = yeargen(y);

    levelswitch('month',y);

    // INFUNCTIONAL
    // MAKE DATABASE CALL

}

function xsqst(){
    document.getElementById("xsq").style.backgroundColor = gradient[x-1];
    document.getElementById("x-range").value = x;
}

function modst(){
    if(modstate != 0) modchange(modstate,true);
}

function monthgen(y){

    var gen = '';

    const dayn = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

    for (let i = 1; i <= 35; i++) {
        if(i % 7 == 1) gen += `<div class="m-row" id=mr-${Math.ceil(i / 7)}>`;
        if(i <= dayn){ 
            if(y[m][i-1][1] != 0) gen += `<div class="m-day" style="background-color:${gradient[y[m][i-1][0]]}"> <img src="assets/mod-${y[m][i-1][1]}b.png" width="90%" height="auto"> </div>`;
            else gen += `<div class="m-day" style="background-color:${gradient[y[m][i-1][0]]}"> </div>`;
            if(i % 7 == 0) gen += '</div>';
        } else {
            gen += '<div class="m-day m-fill"></div>';
            if(i % 7 == 0) gen += '</div>';
        }
    }

    return gen;

}

function yeargen(y){

    var gen = '';

    for (let i = 1; i <= 12; i++){

        if(i % 4 == 1) gen += `<div class="y-row" id=yr-${Math.ceil(i / 4)}>`;
        const dayn = new Date(now.getFullYear(), i, 0).getDate();
        gen += `<div class="y-month" id=ym-${i}>`;

        for (let j = 1; j <= 35; j++) {

            if(j % 7 == 1){
                if(j == 1 && i <= 4) gen += `<div class="y-month-row y-month-row-top" id=ymr-${i}-${Math.ceil(j / 7)}>`;
                else gen += `<div class="y-month-row" id=ymr-${i}-${Math.ceil(j / 7)}>`;
            } 
            if(j <= dayn) gen += `<div class="y-day" style="background-color:${gradient[y[i-1][j-1][0]]}"></div>`;
            else gen += '<div class="y-day m-fill"></div>';
            if(j % 7 == 0) gen += '</div>';

        }
        gen += '</div>';
        if(i % 4 == 0) gen += '</div>';
    }

    return gen;

}

function statgen(){
    corest(
        `
        <div id="stats">
            ${email}
             — days set ${ds_sample}
             — days since first day ${dsi_sample}
             — average day ${avg1_sample} & ${avg2_sample}
        </div>
        `
    );
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

function ygt_sample(){
    return fetch('/assets/yearsample2.json')
    .then(response => {
        return response.json(); 
    });
}

function corest(m){
    document.getElementById("core").innerHTML = m;
}

function emailst(){
    document.getElementById("upper-email").innerHTML = email;
}
