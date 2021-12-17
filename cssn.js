fs = require('fs')

var myags = process.argv.slice(2);

function grava(file, txt){ fs.writeFileSync(file,txt) }
function ler(file){ return fs.readFileSync(file,'utf-8') }

console.log('myArgs: ', myags)

// texto1 = ler('style1.css')
// texto2 = ler('style2.css')

texto1 = ler(myags[0])
texto2 = ler(myags[1])

function rep(texto1, texto2){

    texto1 = texto1.replace(/\s{2,}/g," ")
    texto1 = texto1.replace(/ \{/g,"{")
    texto2 = texto2.replace(/\s{2,}/g," ")
    

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

    propriedades_existentes = texto2
    propriedades_existentes = propriedades_existentes.match(/\{.+?\}/g).join("").split("}{").join("").slice(1,-1).replace(/\s{2,}/g,"").split(" ").join("")
    propriedades_existentes = propriedades_existentes.split(".").slice(1).map(e=>"."+e)
    propriedades_existentes = propriedades_existentes.filter((b,c)=>propriedades_existentes.indexOf(b) == c)

    // propriedades_existentes = propriedades_existentes.map(e=>"\r\t"+e)

    // console.log(propriedades_existentes)

    for(i of propriedades_existentes){
        r = new RegExp(i,"g")
        texto2 = texto2.replace(r,obj[i]+";")
        texto2 = texto2.replace(";;",";")
        texto2 = texto2.replace(";;",";")
    }
    texto2 = texto2
    .replace(/\}/g,"}\n\n")
    .replace(/\{/g,"{\n")
    .replace(/;/g,";\n")
    .replace(/^ /gm,"")
    .replace(/\n{3,}/gm,"\n")
    .replace(/\n\n$/g,"")
    .replace(/undefined;\n/g,"")
    
    return texto2
}

z = rep(texto1, texto2)
grava(myags[2],z)

