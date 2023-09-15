document.getElementById('login-form').addEventListener('click', function(event) {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === '1234' && password === '1234') {
    
    setTimeout(function(){window.location.href = './home/index.html';},200)
    alert('Login bem-sucedido!');
  } else {
    alert('Usuário ou senha inválidos. Tente novamente.');
  }
}
)