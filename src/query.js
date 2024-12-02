function query(){

    const xml = new XMLHttpRequest();

    word = document.getElementById('wordquery').value;
    dfs = [];

    xml.open("GET", `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=56`, true);
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
                    def += `<b>${dfs[i][0]}.</b>  <i>${dfs[i][2]}</i> ${dfs[i][3]} `
                } def += `</p>`;
                //document.getElementById('defs').innerHTML = '';
                document.getElementById('defs').innerHTML += def;

                syns = [];

                const xml2 = new XMLHttpRequest();

                xml2.open("GET", `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=c6faa39e-f147-4084-99f5-d4c7e451b5ce`, true);
                xml2.onload = (err) => {
                    if (xml2.readyState === 4) {
                        if (xml2.status === 200) {

                            var rs = JSON.parse(xml2.responseText);
                            rs.forEach(element => {
                                if(element['meta']){
                                    syns.push(element['meta']['syns'][0].slice(0,8));
                                } 
                            });
                            ths = `<div class='th_div'> <p class='th_main'> <b>${word}</b> `;
                            
                            for(var i = 0; i < Math.min(5,rs.length); i++){
                                ths += `${i+1}. <i>${rs[i]['shortdef'][0]}</i>: ${syns[i].join(', ')} `
                            } ths += `</p> `;

                            //ths += `<div class='th_dia'> <center> <i> '${rs[0]['shortdef'][0]}' </i> </center> <img src='diagram.png' class='dia'> <p style='margin:0'>`;

                            
                            let data = {w: word, s: syns[0], n: syns[0].length};
                            let abc = 'ABCDEFGH'

                            fetch("/diagram", {
                                method: "POST",
                                headers: {'Content-Type': 'application/json'}, 
                                body: JSON.stringify(data)
                            }).then( () => {
                                ths += `<div class='th_dia'> <center> <i> '${rs[0]['shortdef'][0]}' </i> </center> <img src='diagram.png' class='dia'> <p style='margin:0'>`;
                                for(var i = 0 ; i < syns[0].length; i++){
                                    ths += `<b>${abc[i]}</b> ${syns[0][i]} `
                                }
                                ths += '</p> </div> </div>';
                                document.getElementById('defs').innerHTML += ths;
                            });


                        } else {
                            console.error(xml2.statusText);
                        }
                    }
                };
                xml2.onerror = (err) => {
                    console.error(xml2.statusText);
                };
                xml2.send();



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