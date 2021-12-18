fs = require('fs')

var myags = process.argv.slice(2);

function grava(file, txt){ fs.writeFileSync(file,txt) }
function ler(file){ return fs.readFileSync(file,'utf-8') }

function extractAllProperties(txt){
    a1 = txt.match(/\{.+?\}/g).join("").split(/\}\{/g).join(" ")
    a1 = a1.replace(/\s{2,}/g," ").split(" ").slice(1,-1)
    a1 = a1.filter((x,z)=>a1.indexOf(x)==z).join(" ")
    return a1.split(" ")
}


// texto1 = ler('style1.css')
// texto2 = ler('style2.css')

texto1 = ler(myags[0])
texto2 = ler(myags[1])

function rep(texto1, texto2){

    texto1 = texto1.replace(/\s{2,}/g," ")
    texto1 = texto1.replace(/ \{/g,"{")
    
    texto2 = texto2.replace(/\s{2,}/g," ")
    texto2 = texto2.replace(/\{ /gm,"\{")
    texto2 = texto2.replace(/ \}/gm,"\}")
    
    texto2 = texto2.replace(/\{/gm,"\{ ")
    texto2 = texto2.replace(/\}/gm," \}")

    t1 = texto1.split("\r\n").join(" ")
    t2 = texto2.split("\r\n").join(" ")

    a = texto1.match(/\..+?\}/g)
    obj = []
    for(i of a){
        try{
        b = i.slice(0,i.indexOf("{"))
        c = i.slice(i.indexOf("{")+1,i.indexOf("}")).trim()
        obj[b] = c
        }catch(e){
            
        }
    }

    propriedades_existentes = extractAllProperties(texto2)
    propriedades_existentes = propriedades_existentes.map(e=>"."+e)

    
    for(i of propriedades_existentes){
        r = new RegExp(i+"\\b","gm")
        texto2 = texto2.replace(r,";"+obj[i])
    }

    texto2 = texto2
    .replace(/\}/gm,"\n}\n\n")
    .replace(/\{/gm,"{\n\t")
    // .replace(/;/gm,";\n\t")
    // .replace(/\n\n$/gm,"")
    .replace(/^ /gm,"")
    .replace(/undefined \n/g,"")
    .replace(/undefined \n/g,"")
    .replace(/undefined;/g,"")
    .replace(/\{\n\t\;/g,"\{\n\t")
    .replace(/;;/g,";\n\t")
    .replace(/\t\}/g,"\}")

    
    return texto2
}

z = rep(texto1, texto2)
grava(myags[2],z)

