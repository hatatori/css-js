// texto1 = `
//     .p-1{ padding:10px }    
//     .m-1{ margin:10px }
//     .bg-red{ background-color: #e74c3c }
//     .inset-0{ top: 0px; right: 0px; bottom: 0px; left: 0px };
// `

// texto2 = `
//     .btn{ .p-1 }
//     .btn2{ .p-1 .m-1 .inset-0 .bg-red }
//     .btn2{ .m-1 }
// `

function rep(texto1, texto2){
    a = texto1.match(/\..+?\}/g)
    obj = []
    for(i of a){
        try{
        b = i.slice(0,i.indexOf("{"))
        c = i.slice(i.indexOf("{")+1,i.indexOf("}")).trim()
        obj[b] = c
        }catch(e){}
    }

    
    for(i in obj){
        try{
            r = new RegExp(i+"\\b","g")
            texto2 = texto2.replaceAll(i,obj[i]+";")
        }catch(e){}
    }

    return texto2
}

async function go(urla,urlb, stylediv){
    t1 = await fetch(urla)
    t1 = await t1.text()

    t2 = await fetch(urlb)
    t2 = await t2.text()

    // r3.innerHTML = rep(t1,t2)
    document.querySelector("#"+stylediv).innerHTML = rep(t1,t2)
}

// go("tailwind.css","style2.css","r3")