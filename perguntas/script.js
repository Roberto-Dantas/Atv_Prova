//Principais variaveis
const questaoData = JSON.parse(localStorage.getItem('questaoData'))
let numPergunta = 0; 
let tempo_total = 0;
let minTotal = 0;
let minute = 0
let second = (questaoData.tempo * 60)/questaoData.qntQ
let second_porPergunta = second
while(second >= 60){
    minute = minute +1
    second = second -60
}
second = second+1
let acertos = 0; 
let qts_naoR = 0;
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
    document.getElementById('minute').innerText = returnData(minute); 
    document.getElementById('second').innerText = returnData(second_porPergunta); 
    inicio()
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
                document.getElementById('minute').innerText = returnData(minute); 
        document.getElementById('second').innerText = returnData(second_porPergunta); 
                proxima(numPergunta)
            }
        })
    })
})

function inicio() {
    Swal.fire({ 
            title:`Os ${questaoData.tempo} min, foram divididos em ${questaoData.qntQ} questões.`,
            text:`Cada uma delas terá um limite de ${second-1} seg`,
            confirmButtonText:'Iniciar'
        }).then((pass) => { 
            if (pass.isConfirmed) {
                document.getElementById('minute').innerText = returnData(minute); 
                document.getElementById('second').innerText = returnData(second_porPergunta); 
                proxima(numPergunta)
            }else{
                document.getElementById('minute').innerText = returnData(minute); 
                document.getElementById('second').innerText = returnData(second_porPergunta); 
                proxima(numPergunta)
            }
        })
}

//Inserção da perguntas
function proxima(num) {
    if(num != questaoData.qntQ) {
        start()
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
        pause()
        tempoTot()
        let textFimSwal
        if(qts_naoR == 0) {
            textFimSwal = `As ${questaoData.qntQ} questões foram finalizadas em ${totalR}`
        }
        else{
            textFimSwal = `Foram finalizadas ${questaoData.qntQ - qts_naoR} questões, e não finalizadas: ${qts_naoR} questões, em um total de ${totalR}`
        }
        Swal.fire({ 
            title:'Chegou ao fim do questionário',
            text: textFimSwal,
            confirmButtonText:'OK'
        })
        finalizar()
    }
}
//Inserção perguntas erradas e certas e os dados
const divElemento=[],div1Elemento=[],h2Elemento=[],div2Elemento=[],spanElemento=[],div3Elemento=[],liElemento=[],ulElemento=[],liElemento1=[],liElemento2=[],liElemento3=[],liElemento4=[],liElemento5=[],brElemento=[]

function finalizar(tE){
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
        if(qts_naoR == 0) {
            document.querySelector('.parteIF').innerHTML = `<button>Voltar ao Inicio</button></br></br></br></br><h2>Das ${questaoData.qntQ} questões, você acertou ${acertos} e finalizou em ${totalR} de ${questaoData.tempo}min</h2></br></br>`
        }else{
            document.querySelector('.parteIF').innerHTML = `<button>Voltar ao Inicio</button></br></br></br></br><h2>Das ${questaoData.qntQ} questões, não respondeu ${qts_naoR}</h2><h2>Um total de ${acertos} acertos e não completou o questionário de ${questaoData.tempo}min</h2></br></br>`
        }
    }
    //else{
        //document.querySelector('.parteIF').innerHTML = `<button>Voltar ao Inicio</button></br></br></br></br><h2>Das ${questaoData.qntQ} questões, você fez ${nQ+1}, então você NÃO FINALIZOU dentro do tempo limite (${questaoData.tempo}min)</h2></br></br>`
    //}
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


//Novo temporizador 
function pause() { 
    clearInterval(cron);
}
function timer() { 
    if(minute == 0 && second >= 5) {
        document.querySelector('.tempo').style.backgroundColor = "#fff"
        document.querySelector('.tempo').style.color = "#000"
    }
    if(minute == 0 && second == 5) {
        document.querySelector('.tempo').style.backgroundColor = "red"
        document.querySelector('.tempo').style.color = "#fff"
        
    }
    if(minute == 0 && second == 0) {
        
        document.querySelector('.tempo').style.backgroundColor = "#000"
        document.querySelector('.tempo').style.color = "#fff"
        document.getElementById('minute').innerText = '00'; 
        document.getElementById('second').innerText = '00';
        tempo_total = tempo_total + second_porPergunta
        escolhida[numPergunta-1] = {a:"Usuário não respondeu!",t:"Não respondida"}
        qts_naoR = qts_naoR +1
        Swal.fire({ 
            title:'TEMPO ESGOTADO',
            customClass: { 
                container: 'tempo-esgotado-swal'
            },
            confirmButtonText:'OK',
        })
        proxima(numPergunta)
    }
    else{
        second--
        document.getElementById('minute').innerText = returnData(minute); 
        document.getElementById('second').innerText = returnData(second); 
    }
} 

function tempoTot() {
    if(tempo_total >= 60) {
        tempo_total = tempo_total-60
        minTotal = minTotal +1
        if(tempo_total > 0) {
            tempo_total = `${returnData(minTotal)}min e ${returnData(tempo_total)}seg`
            
        }
        else{
            tempo_total = `${returnData(minTotal)}min`
        }
    }
    else{
        tempo_total = `${returnData(tempo_total)} segundos`
    }
    totalR = tempo_total
}



//TEMPORIZADOR

function definirTR(d) {    
    let totalQs = tempo_total
    totalQs = returnData(totalQs)
    let totalQm = questaoData.tempo-1 - minute
    totalQm = returnData(totalQm)
    
    let min = returnData(minute)
    let sec = returnData(second_porPergunta-second)
    tempo_total = tempo_total + (second_porPergunta -second)
    if(d) {
        totalR = `${min}:${sec}`
        return totalR
    }else{
        totalR = `${totalQs} segundos`
        return totalR
    }       
}
function start() { 
    pause();
    second = second_porPergunta
    cron = setInterval(() => { timer(); }, 1000);
}
function returnData(input) { 
    return input >= 10 ? input : `0${input}`
    return input == 0 ? `0${input}` : input
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
