const q1 = document.querySelector('#quadrante1')
const q2 = document.querySelector('#quadrante2')
const q3 = document.querySelector('#quadrante3')
const q4 = document.querySelector('#quadrante4')
const fixo = " 2s ease-out forwards"
var dataObj 

localStorage.clear()
document.querySelectorAll('.conteudo button').forEach(click => { 
    click.addEventListener('click', () => {         
        if(click.id === "01") {
            dataObj = {qntQ:5,tempo:1}
            q1.style.animation=`go-left${fixo}`
            q2.style.animation=`go-bottom${fixo}`
            q3.style.animation=`go-bottom${fixo}`
            q4.style.animation=`go-bottom${fixo}`
        }
        else if(click.id === "02"){
            dataObj = {qntQ:10,tempo:3}
            q2.style.animation=`go-left${fixo}`
            q1.style.animation=`go-bottom${fixo}`
            q3.style.animation=`go-bottom${fixo}`
            q4.style.animation=`go-bottom${fixo}`
        }
        else if(click.id === "03"){
            dataObj = {qntQ:20,tempo:5}
            q3.style.animation=`go-left${fixo}`
            q4.style.animation=`go-bottom${fixo}`
            q2.style.animation=`go-bottom${fixo}`
            q1.style.animation=`go-bottom${fixo}`
        }
        else if(click.id === "04"){
            dataObj = {qntQ:30,tempo:7}
            q4.style.animation=`go-left${fixo}`
            q3.style.animation=`go-bottom${fixo}`
            q2.style.animation=`go-bottom${fixo}`
            q1.style.animation=`go-bottom${fixo}`
        }
        document.querySelector('.titulos').style.animation=`go-bottom${fixo}`
        localStorage.setItem("questaoData",JSON.stringify(dataObj));
        setTimeout(function(){window.location.href = '../questoes/index.html';},1999)
    })
})
