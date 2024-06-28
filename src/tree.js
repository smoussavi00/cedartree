
(async () =>
    {

    const app = new PIXI.Application();
    await app.init({ antialias: true, width:300, height:300 });
    document.getElementById('canvas').appendChild(app.canvas);

    //app.renderer.background.color = 0xFEFFFB;
    app.renderer.background.color = 0xFF0000;

    const graphics = new PIXI.Graphics();
    graphics.rect(70, 50, 100, 100);
    graphics.fill(0x1c1c1c);

    app.stage.addChild(graphics);

    const xml = new XMLHttpRequest();

    document.getElementById("see").addEventListener("click", wordquery);


    function wordquery (){
        let word = document.querySelector('#word').value;
        if (word == "") return;

        xml.open("GET", `https://dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=c6faa39e-f147-4084-99f5-d4c7e451b5ce`, true);
        xml.onload = (err) => {
        if (xml.readyState === 4) {
            if (xml.status === 200) {
            console.log(xml.responseText);

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