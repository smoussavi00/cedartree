gradient = ['#1e1e1d', '#231e1c', '#281d1b', '#2c1d19', '#311c18', '#361c17', '#3b1c16', '#3f1b15', '#441b14', '#491a12', '#4e1a11', '#521a10', '#57190f', '#5c190e', '#61180d', '#66180b', '#6a180a', '#6f1709', '#741708', '#791607', '#7d1606', '#821604', '#871503', '#8c1502', '#901401', '#951500', '#981801', '#9c1a01', '#9f1d02', '#a22003', '#a62303', '#a92604', '#ac2905', '#b02c05', '#b32f06', '#b63107', '#ba3407', '#bd3708', '#c03a09', '#c43d09', '#c7400a', '#ca430b', '#ce450b', '#d1480c', '#d54b0c', '#d84e0d', '#db510e', '#df540e', '#e2570f', '#e55a10', '#e75d10', '#e8610f', '#e9650f', '#e9690e', '#ea6d0e', '#ea710d', '#eb750d', '#ec790c', '#ec7d0c', '#ed810b', '#ed850b', '#ee890a', '#ef8c0a', '#ef9009', '#f09409', '#f09808', '#f19c08', '#f2a008', '#f2a407', '#f3a807', '#f3ac06', '#f4b006', '#f5b405', '#f5b805', '#f6bc04', '#f5be0a', '#f4bf12', '#f2c01a', '#f1c122', '#f0c22b', '#efc333', '#edc43b', '#ecc543', '#ebc54b', '#e9c653', '#e8c75b', '#e7c863', '#e6c96c', '#e4ca74', '#e3cb7c', '#e2cc84', '#e0cd8c', '#dfce94', '#decf9c', '#dcd0a4', '#dbd1ad', '#dad2b5', '#d9d3bd', '#d7d4c5', '#d6d5cd'];

modstate = 0;

const xrange = document.getElementById("x-range");
const xsq = document.getElementById("xsq");
const pos = document.getElementById("pos");

const pr1 = document.getElementById("pr-1");
const pr2 = document.getElementById("pr-2");
const pr3 = document.getElementById("pr-3");
const pr4 = document.getElementById("pr-4");
const pr5 = document.getElementById("pr-5");

const selector = document.getElementById("selector");
const ld = document.getElementById("level-day");
const lm = document.getElementById("level-month");
const ly = document.getElementById("level-year");

const m1 = document.getElementById("mod-1");
const m2 = document.getElementById("mod-2");
const m3 = document.getElementById("mod-3");

window.onload = positiongen();

xrange.addEventListener("input",displaychange);

ld.addEventListener("mouseenter", function(){ levelhover("day");});
lm.addEventListener("mouseenter", function(){ levelhover("month");});
ly.addEventListener("mouseenter", function(){ levelhover("year");});

selector.addEventListener("mouseleave", function(){ levelhover("");});

m1.addEventListener("click",function(){modchange(1);});
m2.addEventListener("click",function(){modchange(2);});
m3.addEventListener("click",function(){modchange(3);});

m1.addEventListener("mouseenter",function(){modhover(1,true);});
m2.addEventListener("mouseenter",function(){modhover(2,true);});
m3.addEventListener("mouseenter",function(){modhover(3,true);});

m1.addEventListener("mouseleave",function(){modhover(1,false);});
m2.addEventListener("mouseleave",function(){modhover(2,false);});
m3.addEventListener("mouseleave",function(){modhover(3,false);});

function displaychange(){
    x = xrange.value-1;
    xsq.style.backgroundColor = gradient[x];
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

function levelhover(lv){
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

function modchange(m){
    
    xsq.innerHTML = '';
    m1.style.backgroundColor = '#2b2b29';
    m2.style.backgroundColor = '#2b2b29';
    m3.style.backgroundColor = '#2b2b29';
    mc = document.getElementById(`mod-${m}`);
    if(modstate != m) { 
        xsq.innerHTML += `<img src="assets/mod-${m}b.png" width="90%" height="auto">`;
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
