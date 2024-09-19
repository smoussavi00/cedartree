
(async () =>
    {

    const app = new PIXI.Application();
    await app.init({ antialias: true, width:500, height:500 });
    await PIXI.Assets.load('LibreBaskerville-Regular.otf');

    document.getElementById('canvas').appendChild(app.canvas);

    //app.renderer.background.color = 0xFEFFFB;
    app.renderer.background.color = 0xFEFFFB;

    const graphics = new PIXI.Graphics();

    const xml = new XMLHttpRequest();

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