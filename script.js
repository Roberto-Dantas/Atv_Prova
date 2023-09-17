let i=0,x=0,v=0;
const login = [
  {user:'Roberto',senha:'54321'},
  {user:'Gustavo',senha:'12345'},
  {user:'Israel',senha:'98765'}
];

document.getElementById('loginAutomatico').addEventListener('click', function(event) {
  let usuario = document.getElementById("username");
  let senha = document.getElementById("password");
  usuario.value= "";
  senha.value= ""; 

  const aleatorio = Math.floor(Math.random() * login.length);

  const intervalUser = setInterval(function() {
    if (i < login[aleatorio].user.length) {
      const letras = login[aleatorio].user.charAt(i);
      usuario.value += letras;
      i++;
    } else {
      clearInterval(intervalUser);
    }
  }, 100);
  const intervalSenha = setInterval(function() {
    if (x < login[aleatorio].senha.length) {
      const letras = login[aleatorio].senha.charAt(x);
      senha.value += letras;
      x++;
    } else {
      clearInterval(intervalSenha);
    }
  }, 100);
  setTimeout(function(){document.querySelector('button').style = "opacity: 0.8;"; setTimeout(end(usuario, senha, 2),500)},1000)
});


document.getElementById('login-form').addEventListener('click', function(event) {
  v = 0 
  let usuario = document.getElementById("username");
  let senha = document.getElementById("password");

  login.forEach(geral => {
    if(geral['user'] == usuario.value){
      v += 1
      if(geral['senha'] == senha.value){
        v += 1
      }
  }
  });
  end(usuario, senha, 1)
});

function end(usuario, senha, num){
  if(num === 1){
    if(v === 2){
      Swal.fire({ 
        title:"Login efetuado com sucesso!!!",
        text:`Seja bem vindo ${usuario.value}`,
        confirmButtonText:'Ok'
      }).then((pass) => { 
        if (pass.isConfirmed) {
          usuario.value = ""
          senha.value = ""
          window.location.href = './home/index.html';
        }
      })
    }
    else{
      Swal.fire({ 
        title:"Usuário ou senha incorretos!!!",
        text:`Não encontramos o Usuário: "${usuario.value}" com a Senha: "${senha.value}" em nosso banco de dados...`,
        confirmButtonText:'Ok'
      })
      usuario.value = ""
      senha.value = ""
    }
  }
  else{
    Swal.fire({ 
      title:"Login efetuado com sucesso!!!",
      text:`Seja bem vindo ${usuario.value}`,
      confirmButtonText:'Ok'
    }).then((pass) => { 
      if (pass.isConfirmed) {
        usuario.value = ""
        senha.value = ""
        window.location.href = './home/index.html';
      }
    })
  }
  
  
}