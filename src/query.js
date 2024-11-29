function query(){

    const xml = new XMLHttpRequest();

    word = document.getElementById('wordquery').value;
    dfs = [];

    xml.open("GET", `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=_________`, true);
    xml.onload = (err) => {
        if (xml.readyState === 4) {
            if (xml.status === 200) {

                var r = JSON.parse(xml.responseText);
                var rn = r.length;

                var x = 1;
                const prs = r[0]['hwi']['prs'][0]['mw'];

                def = '';

                for(var i = 0; i < rn; i++){

                    if (r[i]['fl'] in ['phrase', 'biographical name']) break;

                    r[i]['hwi']['hw'] = r[i]['hwi']['hw'].split('*').join('');
                    if (r[i]['hwi']['hw'].toLowerCase() != word.toLowerCase()) break;
                    
                    dfs.push([x,r[i]['hwi']['hw'] ,r[i]['fl'],r[i]['shortdef'][0]])
                    x++;
                    if(x == 6) break;
                }

                def += `<p class='df'> <b> ${word} </b> (${prs}): `;

                for(i in dfs){
                    //document.getElementById('defs').innerHTML += `<button class='dfsbuttons' id=dfsbutton${dfs[i][0]} value=${dfs[i][0]}> ${dfs[i][0]} </button>`;
                    //document.getElementById(`dfsbutton${dfs[i][0]}`).addEventListener("click",function(){alert(`dfsbutton${dfs[i][0]}`)});
                    def += `<b>${dfs[i][0]}.</b>  <i>${dfs[i][2]}</i> ${dfs[i][3]} `
                }
                def += `</p>`;
                //document.getElementById('defs').innerHTML = '';
                document.getElementById('defs').innerHTML += def;

            } else {
                console.error(xml.statusText);
            }
        }
    };
    xml.onerror = (err) => {
        console.error(xml.statusText);
    };
    xml.send();

    const xml2 = new XMLHttpRequest();

    xml2.open("GET", `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=_________`, true);
    xml2.onload = (err) => {
        if (xml2.readyState === 4) {
            if (xml2.status === 200) {
                var rs = JSON.parse(xml2.responseText);
            } else {
                console.error(xml2.statusText);
            }
        }
    };
    xml2.onerror = (err) => {
        console.error(xml2.statusText);
    };
    xml2.send();
    
}


    /*
    (async () =>
    {
        
    const app = new PIXI.Application();
    await app.init({ antialias: true, width:500, height:500 });
    await PIXI.Assets.load('EudoxusSans-ExtraBold.ttf');

    document.getElementById('canvas').appendChild(app.canvas);
    app.renderer.background.color = 0xFEFFFB;
    const graphics = new PIXI.Graphics();
    document.getElementById("see").addEventListener("click", wordquery);

    

    function wordquery (){
        let word = document.querySelector('#word').value;
        if (word == "") return;

        xml.open("GET", `https://dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=c6faa39e-f147-4084-99f5-d4c7e451b5ce`, true);
        xml.onload = (err) => {
        if (xml.readyState === 4) {
            if (xml.status === 200) {

                var r = JSON.parse(xml.responseText);
                var r_num = 0;
                var vars = [];

                r.forEach(element => {
                    if(element['meta']){
                        r_num++;
                        vars.push(element['meta']['syns'][0].slice(0,7));
                    } 
                });

                if (r_num == 0) return;

                let hyp = 120;
                let hyp2 = 160;
                let pad = 20;
                let org = {x:225, y:250};

                const one = new PIXI.Text({
                     text: '1', 
                     style:{
                        fontFamily:'LibreBaskerville-Regular'
                     }
                });

                one.x = org.x - 7;
                one.y = org.y - 15;
                app.stage.addChild(one);

                var label;

                document.getElementById('main').innerHTML += `<div class='th' id='th1'> 1 ${word}</p>`

                for (let i = 0; i < vars[0].length; i++) {

                    document.getElementById('main').innerHTML += `<div class='th' id='th${i+2}'> ${i+2} ${vars[0][i]}</p>`

                    let theta = i * 2*Math.PI/vars[0].length;

                    graphics.moveTo(Math.floor(org.x+pad*Math.cos(theta)), Math.floor(org.y+pad*Math.sin(theta)));
                    graphics.lineTo(Math.floor(org.x+hyp*Math.cos(theta)), Math.floor(org.y+hyp*Math.sin(theta)));

                    graphics.moveTo(Math.floor(org.x+hyp*Math.cos(theta)), Math.floor(org.y+hyp*Math.sin(theta)));
                    graphics.lineTo(Math.floor(org.x+hyp2*Math.cos(theta-Math.PI/18)), Math.floor(org.y+hyp2*Math.sin(theta-Math.PI/18)));
                    graphics.moveTo(Math.floor(org.x+hyp*Math.cos(theta)), Math.floor(org.y+hyp*Math.sin(theta)));
                    graphics.lineTo(Math.floor(org.x+hyp2*Math.cos(theta+Math.PI/18)), Math.floor(org.y+hyp2*Math.sin(theta+Math.PI/18)));

                    graphics.stroke({ width: 3, color: 0x1C1C1C });

                    label = new PIXI.Text({
                        text: `${i+2}`, 
                        style:{
                           fontFamily:'LibreBaskerville-Regular'
                        }
                   });

                   label.x = Math.floor(org.x+0.8*hyp*Math.cos(theta+Math.PI/18)) - Math.ceil(10/(1+Math.abs(theta-Math.PI)));
                   label.y = Math.floor(org.y+0.8*hyp*Math.sin(theta+Math.PI/18)) - Math.ceil(25/(1+Math.abs(theta-Math.PI)));
                   app.stage.addChild(label);

                label = new PIXI.Text({
                    text: `${2*i+vars[0].length+2}`, 
                    style:{
                       fontFamily:'LibreBaskerville-Regular'
                    }
             
                });

                label.x = Math.floor(org.x+1.1*hyp2*Math.cos(theta-Math.PI/18)) - 15 + Math.ceil(1.5*Math.abs(theta-Math.PI));
                label.y = Math.floor(org.y+1.1*hyp2*Math.sin(theta-Math.PI/18)) - 15;
                if(i == 1 && vars[0].length == 2) label.x += 12;
                app.stage.addChild(label);

                label = new PIXI.Text({
                    text: `${2*i+vars[0].length+3}`, 
                    style:{
                       fontFamily:'LibreBaskerville-Regular'
                    }
             
                });

                label.x = Math.floor(org.x+1.1*hyp2*Math.cos(theta+Math.PI/18)) - 15 + Math.ceil(1.5*Math.abs(theta-Math.PI));
                label.y = Math.floor(org.y+1.1*hyp2*Math.sin(theta+Math.PI/18)) - 15;
                if(i == 1 && vars[0].length == 2) label.x += 12;
                app.stage.addChild(label);

                }

                app.stage.addChild(graphics);                

            } else {
            console.error(xml.statusText);
            }
        }
        };
        xml.onerror = (err) => {
            console.error(xml.statusText);
        };
        xml.send();
    }

    

})();

*/
