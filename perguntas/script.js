//Principais variaveis
const questaoData = JSON.parse(localStorage.getItem('questaoData'))
let numPergunta = 0; 
let acertos = 0;
let minute = questaoData.tempo; 
let second = 0; 
let cron;
let totalR
       
//Banco de dados? NÃO
let data = await fetch('https://docs.google.com/spreadsheets/d/1Q0KVNUwzLHKFT9HzdzEB9qbuEwX2KYwBPllTGX1zxIE/gviz/tq?tqx=out:json').then(res => res.text()).then(text => JSON.parse(text.substr(47).slice(0, -2)));
const numeros = []
var nSA

while(typeof data != 'object'){
    data = await fetch('https://docs.google.com/spreadsheets/d/1Q0KVNUwzLHKFT9HzdzEB9qbuEwX2KYwBPllTGX1zxIE/gviz/tq?tqx=out:json').then(res => res.text()).then(text => JSON.parse(text.substr(47).slice(0, -2)));
}
if(typeof data === 'object') {
    for(var i = 0; i <= data.table.rows.length -1; i++){
        numeros[i] = i
    }
    const selecionados = selecionarAleatorio(numeros,questaoData.qntQ);
    nSA = selecionados
    proxima(numPergunta)
}else{
    throw new Error('Sem conexão com a planilha dos dados');
}

//clique alternativa
const escolhida = []

document.querySelectorAll('.inputs li').forEach(alternativa => { 
    alternativa.addEventListener('click', () => { 
        Swal.fire({ 
            title:'Confirmar alternativa?',
            text:`${alternativa.innerText}`,
            showCancelButton:true, 
            confirmButtonText:'SIM', 
            cancelButtonText:'NÃO'
        }).then((pass) => { 
            if (pass.isConfirmed) {
                definirTR(true)
                escolhida[numPergunta-1] = {a:alternativa.id,t:`${totalR}`}
                proxima(numPergunta)
            }
        })
    })
})

//Inserção da perguntas
function proxima(num) {
    if(num === 0) {
        start()
    }
    if(num != questaoData.qntQ) {
        document.querySelector('.numQuestoes h4').innerHTML = `Questões ${numPergunta+1} de ${questaoData.qntQ}`
        document.querySelector('.questoes h2').innerHTML = data.table.rows[nSA[numPergunta]].c[0].v
        
        document.querySelectorAll('.inputs li').forEach(alternativa => { 
            if(alternativa.id === "alt1"){
                alternativa.innerHTML = data.table.rows[nSA[numPergunta]].c[2].v
            }
            if(alternativa.id === "alt2"){
                alternativa.innerHTML = data.table.rows[nSA[numPergunta]].c[3].v
            }
            if(alternativa.id === "alt3"){
                alternativa.innerHTML = data.table.rows[nSA[numPergunta]].c[4].v
            }
            if(alternativa.id === "alt4"){
                alternativa.innerHTML = data.table.rows[nSA[numPergunta]].c[5].v
            }
            if(alternativa.id === "alt5"){
                alternativa.innerHTML = data.table.rows[nSA[numPergunta]].c[6].v
            }            
        })
    numPergunta++
    }else{    
        definirTR()
        Swal.fire({ 
            title:'Chegou ao fim do questionário',
            text: `As ${questaoData.qntQ} questões foram finalizadas em ${totalR}`,
            confirmButtonText:'OK'
        })
        finalizar()
    }
}
//Inserção perguntas erradas e certas e os dados
const divElemento=[],div1Elemento=[],h2Elemento=[],div2Elemento=[],spanElemento=[],div3Elemento=[],liElemento=[],ulElemento=[],liElemento1=[],liElemento2=[],liElemento3=[],liElemento4=[],liElemento5=[],brElemento=[]

function finalizar(tE) {
    pause()
    localStorage.clear()
     document.querySelector('.conteudo').style.marginTop="10%"
    document.querySelector('.bloco').innerHTML = "<div class='parteIF'></div><div class='parteQ'><div>";
    
    //Caso o tempo acabe
    let numQts
    if(tE === undefined) {
        numQts = questaoData.qntQ-1
    }else{
        definirTR()
        numQts = tE -2
    }
    
    //CRIAÇÃO DOS ELEMENTOS PARA O FINAL DE RESPOSTAS    
    for(var i = 0; i <= numQts;){
        divElemento[i] = document.createElement('div');
        divElemento[i].className = 'resp';
        
        div1Elemento[i] = document.createElement('div');
        div1Elemento[i].className = 'topoFinal';
        
        div2Elemento[i] = document.createElement('div');
        div2Elemento[i].className = 'perguntaFinal';
        h2Elemento[i] = document.createElement('h2');
        
        div3Elemento[i] = document.createElement('div');
        div3Elemento[i].className = 'tempoFinal';
        spanElemento[i] = document.createElement('span');
        
        ulElemento[i] = document.createElement('ul');
        liElemento1[i] = document.createElement('li');
        liElemento2[i] = document.createElement('li');
        liElemento3[i] = document.createElement('li');
        liElemento4[i] = document.createElement('li');
        liElemento5[i] = document.createElement('li');
        
        brElemento[i] = document.createElement('br');
        i++
    }
    
    //ALINHANDO AS DIVS
    for(var i = 0; i <= numQts;){
       document.querySelector('.parteQ').appendChild(brElemento[i])
       document.querySelector('.parteQ').insertBefore(divElemento[i],brElemento[i])
        
        divElemento[i].appendChild(ulElemento[i])
        ulElemento[i].appendChild(liElemento1[i])
        ulElemento[i].appendChild(liElemento2[i])
        ulElemento[i].appendChild(liElemento3[i])
        ulElemento[i].appendChild(liElemento4[i])
        ulElemento[i].appendChild(liElemento5[i])
        divElemento[i].insertBefore(div1Elemento[i],ulElemento[i])
        div1Elemento[i].appendChild(div3Elemento[i])
        div1Elemento[i].insertBefore(div2Elemento[i],div3Elemento[i])
        div2Elemento[i].appendChild(h2Elemento[i])
        div3Elemento[i].appendChild(spanElemento[i])
        i++
    }
        
    //Inserindo as variaveis 
    for(var i = 0; i <= numQts;){
       h2Elemento[i].innerText= data.table.rows[nSA[i]].c[0].v
       spanElemento[i].innerText= escolhida[i].t
       liElemento1[i].innerText= data.table.rows[nSA[i]].c[2].v
       liElemento2[i].innerText= data.table.rows[nSA[i]].c[3].v
       liElemento3[i].innerText= data.table.rows[nSA[i]].c[4].v
       liElemento4[i].innerText= data.table.rows[nSA[i]].c[5].v
       liElemento5[i].innerText= data.table.rows[nSA[i]].c[6].v
       i++
    }
    validar(numQts)
    escritaIf(questaoData.qntQ-1,numQts)
}
function escritaIf(qT,nQ) {
    if(qT === nQ) {
        document.querySelector('.parteIF').innerHTML = `<button>Voltar ao Inicio</button></br></br></br></br><h2>Das ${questaoData.qntQ} questões, você acertou ${acertos} e finalizou em ${totalR} de ${questaoData.tempo}min</h2></br></br>`
    }else{
        document.querySelector('.parteIF').innerHTML = `<button>Voltar ao Inicio</button></br></br></br></br><h2>Das ${questaoData.qntQ} questões, você fez ${nQ+1}, então você NÃO FINALIZOU dentro do tempo limite (${questaoData.tempo}min)</h2></br></br>`
    }
    document.querySelector('.parteIF button').addEventListener('click', () => {window.location.href='./../index.html'})
}    
//validacao
function validar(numQts) {
    for(var i = 0; i <= numQts;){
        if(data.table.rows[nSA[i]].c[1].v === escolhida[i].a) {
            //Alternativas Corretas
            acertos++
            if(escolhida[i].a === "alt1") {
                liElemento1[i].classList.add('correct')
            }
            else if(escolhida[i].a === "alt2") {
                liElemento2[i].classList.add('correct')
            }
            else if(escolhida[i].a === "alt3") {
                liElemento3[i].classList.add('correct')
            }
            else if(escolhida[i].a === "alt4") {
                liElemento4[i].classList.add('correct')
            }
            else if(escolhida[i].a === "alt5") {
                liElemento5[i].classList.add('correct')
            }
        }else{
            //Alternativa Errada
            if(escolhida[i].a === "alt1") {
                    liElemento1[i].classList.add('notCorrect')
            }
            else if(escolhida[i].a === "alt2") {
                    liElemento2[i].classList.add('notCorrect')
            }
            else if(escolhida[i].a === "alt3") {
                    liElemento3[i].classList.add('notCorrect')
            }
            else if(escolhida[i].a === "alt4") {
                    liElemento4[i].classList.add('notCorrect')
            }
            else if(escolhida[i].a === "alt5") {
                    liElemento5[i].classList.add('notCorrect')
            }
            //Alternativa Correta
            if(data.table.rows[nSA[i]].c[1].v === "alt1") {
                liElemento1[i].classList.add('correct')
            }
            if(data.table.rows[nSA[i]].c[1].v === "alt2") {
                liElemento2[i].classList.add('correct')
            }
            if(data.table.rows[nSA[i]].c[1].v === "alt3") {
                liElemento3[i].classList.add('correct')
            }
            if(data.table.rows[nSA[i]].c[1].v === "alt4") {
                liElemento4[i].classList.add('correct')
            }
            if(data.table.rows[nSA[i]].c[1].v === "alt5") {
                liElemento5[i].classList.add('correct')
            }
        }
        i++
    }
}

//TEMPORIZADOR
function definirTR(d) {
    let totalQs = 60 - second
    totalQs = returnData(totalQs)
    let totalQm = questaoData.tempo-1 - minute
    totalQm = returnData(totalQm)
    
    if(d) {
        var min
        var sec
        if(minute <= 10) {
            min = `0${minute}`
        }else{
            min = minute
        }
        
        if(sec <= 10) {
            sec = `0${second}`
        }else{
            sec = second
        }
        
        totalR = `${min}:${sec}`
    }else{
        if(totalQm === "00") {
            totalR = `${totalQs} segundos`
        }
    }       
    return totalR
}
function start() { 
    pause(); 
    cron = setInterval(() => { timer(); }, 1000);
}

function pause() { 
    clearInterval(cron);
} 

function timer() { 
    if (second == 0 && minute != 0) { 
        second = 60
        minute-- 
    }
    if(minute == 0 && second == 30) {
        document.querySelector('.tempo').style.backgroundColor = "yellow"
        Swal.fire({ 
            title:`${second} segundos restantes`,
            confirmButtonText:'OK'
        })
    }
    if(minute == 0 && second == 15) {
        document.querySelector('.tempo').style.backgroundColor = "red"
        document.querySelector('.tempo').style.color = "#fff"
        Swal.fire({ 
            title:`${second} segundos restantes`,
            confirmButtonText:'OK'
        })
    }
    if(minute == 0 && second == 0) {
        pause()
        document.querySelector('.tempo').style.backgroundColor = "#000"
        document.querySelector('.tempo').style.color = "#fff"
        document.getElementById('minute').innerText = '00'; 
        document.getElementById('second').innerText = '00';
        Swal.fire({ 
            title:'TEMPO ESGOTADO',
            customClass: { 
                container: 'tempo-esgotado-swal'
            },
            confirmButtonText:'OK',
        })
        finalizar(numPergunta)
    }
    else{
        second--
        document.getElementById('minute').innerText = returnData(minute); 
        document.getElementById('second').innerText = returnData(second); 
    }
} 

function returnData(input) { 
    return input >= 10 ? input : `0${input}` 
}


//Aleatorio

function selecionarAleatorio(vetor, quantidade) {
  const selecionados = [];
  while (selecionados.length < quantidade) {
      const indiceAleatorio = Math.floor(Math.random() * vetor.length);
      const elementoAleatorio = vetor[indiceAleatorio];
      if (!selecionados.includes(elementoAleatorio)) {
          selecionados.push(elementoAleatorio);
      }
  }
  return selecionados;
}
