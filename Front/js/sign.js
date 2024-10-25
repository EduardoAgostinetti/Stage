$(document).ready(function () {
    let sign = `
      <div class="login-container">
          <h2>HelpDesk</h2>
          <div class="toggle-buttons">
              <button class="login-btn active" onclick="toggleForm('login')">Entrar</button>
              <button class="register-btn" onclick="toggleForm('register')">Cadastrar</button>
          </div>
          <form id="loginForm" class="login-form">
              <div class="form-group">
                  <input type="text" id="userLogin" required placeholder=" " autocomplete="username">
                  <label for="userLogin">E-mail ou Nome de Usuário</label>
              </div>
              <div class="form-group">
                  <input type="password" id="passwordLogin" required placeholder=" " minlength="6" autocomplete="current-password">
                  <label for="passwordLogin">Senha</label>
              </div>
              <input type="submit" value="Entrar">

              <div class="toggle-buttons">
                  <button type="button" class="forgot-btn" onclick="toggleForm('forgot')">Esqueceu a Senha?</button>
              </div>
          </form>
          <form id="registerForm" class="register-form">
              <div class="form-group">
                  <input type="text" id="nicknameRegister" required placeholder=" ">
                  <label for="nicknameRegister">Nome Completo</label>
              </div>
              <div class="form-group">
                  <input type="text" id="usernameRegister" required placeholder=" " autocomplete="username"> 
                  <label for="usernameRegister">Nome de Usuário</label>
              </div>
              <div class="form-group">
                  <input type="email" id="emailRegister" required placeholder=" ">
                  <label for="emailRegister">E-mail</label>
              </div>
              <div class="form-group">
                  <input type="password" id="passwordRegister" required placeholder=" " minlength="6" autocomplete="new-password">
                  <label for="passwordRegister">Senha</label>
              </div>
              <div class="form-group">
                  <input type="password" id="confirmPasswordRegister" required placeholder=" " minlength="6" autocomplete="new-password">
                  <label for="confirmPasswordRegister">Confirmar Senha</label>
              </div>
              <div class="form-group-checkbox">
                  <input type="checkbox" id="acceptTerms" required>
                  <label for="acceptTerms">Eu concordo com os <a href="#">Termos e Condições</a></label>
              </div>
              <input type="submit" value="Cadastrar">
          </form>
          
          <form id="forgotForm" class="forgot-form">
              <div class="form-group">
                  <input type="email" id="emailForgot" required placeholder=" ">
                  <label for="emailForgot">E-mail</label>
              </div>
              <input type="submit" value="Recuperar">
          </form>

          <form id="activeForm" class="forgot-form">
              <div class="form-group">
                  <input type="email" id="emailActive" required placeholder=" ">
                  <label for="emailActive">E-mail</label>
              </div>
              <input type="submit" value="Ativar">
          </form>

          <form id="forgotForm2" class="forgot-form2">
              <div class="form-group">
                  <input type="email" id="emailForgot2" required placeholder=" " autocomplete="email">
                  <label for="emailForgot2">E-mail</label>
              </div>
              <div class="form-group">
                  <input type="password" id="passwordForgot2" required placeholder=" " minlength="6" autocomplete="new-password">
                  <label for="passwordForgot2">Nova Senha</label>
              </div>
              <div class="form-group">
                  <input type="password" id="confirmPasswordForgot2" required placeholder=" " minlength="6" autocomplete="new-password">
                  <label for="confirmPasswordForgot2">Confirmar Nova Senha</label>
              </div>
              <div class="form-group">
                  <input type="text" id="codeForgot2" required placeholder=" ">
                  <label for="codeForgot2">Código</label>
              </div>
              <input type="submit" value="Alterar Senha">
          </form>
      </div>
      <script>
            let mode = getQueryParam('mode');
            if (mode === 'in') {
                toggleForm('login');
            } else if (mode === 'up') {
                toggleForm('register');
            } else {
                toggleForm('login');
            }
      </script>
  `;
    $("#sign").html(sign);

    

    document.getElementById('loginForm').addEventListener('submit', async function (event) {

        event.preventDefault();
        showLoadingSign();
        const username = document.getElementById('userLogin').value;
        const password = document.getElementById('passwordLogin').value;
        const url = "http://localhost:3000/auth/sign-in";
        const data = {
            username: username,
            password: password
        }
        const token = null;

        const result = postData(url, data, token);
        result.then(response => {
            const { result: message, success, user, token } = response;
            console.log(response);
        
            if (success) {
                // Armazenar dados no localStorage
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('token', token);
        
                // Redirecionar para outra página
                window.location.href = "./index.html";
            } else {
                alert(message);
            }
        }).catch(error => {
            console.error("Ocorreu um erro:", error);
            alert("Ocorreu um erro. Verifique o console para detalhes.");
        });
        
        hideLoadingSign();
        
    });

    document.getElementById('registerForm').addEventListener('submit', async function (event) {
        event.preventDefault();

        showLoadingSign();

        const nicknameRegister = document.getElementById('nicknameRegister').value.trim();
        const usernameRegister = document.getElementById('usernameRegister').value.trim();
        const emailRegister = document.getElementById('emailRegister').value.trim();
        const passwordRegister = document.getElementById('passwordRegister').value.trim();
        const confirmPasswordRegister = document.getElementById('confirmPasswordRegister').value.trim();

        const url = "http://localhost:3000/auth/sign-up";
        const data = {
            nickname: nicknameRegister,
            username: usernameRegister,
            email: emailRegister,
            password: passwordRegister,
            confirmPassword: confirmPasswordRegister,
        }
        const token = null;

        const result = postData(url, data, token);
        result.then(response => {
            const { result: message, success } = response;

            if(success){
                alert(message);
                toggleForm('login');
            }else{
                alert(message);
            }
          }).catch(error => {
            alert("Ocorreu um erro:", error);
          });

        hideLoadingSign();
    });

    document.getElementById('forgotForm').addEventListener('submit', async function (event) {
        event.preventDefault();

        showLoadingSign();

        const emailForgot = document.getElementById('emailForgot').value.trim();

        const url = "http://localhost:3000/auth/insertCode";
        const data = {
            email: emailForgot
        }
        const token = null;

        const result = postData(url, data, token);
        result.then(response => {
            const { result: message, success } = response;
            console.log(response);
            if(success){
                alert(message);
                toggleForm('forgot2');
            }else{
                alert(message);
            }
          }).catch(error => {
            alert("Ocorreu um erro:", error);
          });

        hideLoadingSign();
    });

    document.getElementById('forgotForm2').addEventListener('submit', async function (event) {
        event.preventDefault();

        showLoadingSign();

        const emailForgot2 = document.getElementById('emailForgot2').value.trim();
        const passwordForgot2 = document.getElementById('passwordForgot2').value.trim();
        const confirmPasswordForgot2 = document.getElementById('confirmPasswordForgot2').value.trim();
        const codeForgot2 = document.getElementById('codeForgot2').value.trim();

        const url = "http://localhost:3000/auth/forgotPassword";
        const data = {
            email: emailForgot2,
            password: passwordForgot2,
            confirmPassword: confirmPasswordForgot2,
            code: codeForgot2
        }
        const token = null;

        const result = postData(url, data, token);
        result.then(response => {
            const { result: result, success } = response;
            console.log(response);
            if(success){
                alert(response.result);
                toggleForm('login');
            }else{
                alert(response.result);
            }
          }).catch(error => {
            alert("Ocorreu um erro:", error);
          });

        hideLoadingSign();
    });

});

function toggleForm(formType) {
    if (formType === 'login') {
        document.getElementById('activeForm').style.display = 'none';
        document.getElementById('forgotForm2').style.display = 'none';
        document.getElementById('loginForm').style.display = 'block';
        document.getElementById('registerForm').style.display = 'none';
        document.getElementById('forgotForm').style.display = 'none';
        document.querySelector('.login-btn').classList.add('active');
        document.querySelector('.register-btn').classList.remove('active');
    } else if (formType === 'register') {
        document.getElementById('activeForm').style.display = 'none';
        document.getElementById('forgotForm2').style.display = 'none';
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('forgotForm').style.display = 'none';
        document.getElementById('registerForm').style.display = 'block';
        document.querySelector('.login-btn').classList.remove('active');
        document.querySelector('.register-btn').classList.add('active');
    } else if (formType === 'forgot') {
        document.getElementById('activeForm').style.display = 'none';
        document.getElementById('forgotForm2').style.display = 'none';
        document.getElementById('forgotForm').style.display = 'block';
        document.getElementById('registerForm').style.display = 'none';
        document.getElementById('loginForm').style.display = 'none';
        document.querySelector('.login-btn').classList.remove('active');
        document.querySelector('.register-btn').classList.remove('active');
    } else if (formType === 'forgot2') {
        document.getElementById('activeForm').style.display = 'none';
        document.getElementById('forgotForm2').style.display = 'block';
        document.getElementById('forgotForm').style.display = 'none';
        document.getElementById('registerForm').style.display = 'none';
        document.getElementById('loginForm').style.display = 'none';
        document.querySelector('.login-btn').classList.remove('active');
        document.querySelector('.register-btn').classList.remove('active');
    } else if (formType === 'active') {
        document.getElementById('forgotForm2').style.display = 'none';
        document.getElementById('forgotForm').style.display = 'none';
        document.getElementById('registerForm').style.display = 'none';
        document.getElementById('activeForm').style.display = 'block';
        document.getElementById('loginForm').style.display = 'none';
        document.querySelector('.login-btn').classList.remove('active');
        document.querySelector('.register-btn').classList.remove('active');
        
    }
}

function showLoadingSign() {
    
    var overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; 
    overlay.style.zIndex = '1000';
    document.body.appendChild(overlay);

    var loading = document.createElement('div');
    loading.id = 'loading';
    
    
    loading.style.position = 'fixed';
    loading.style.top = '50%';
    loading.style.left = '50%';
    loading.style.transform = 'translate(-50%, -50%)';
    loading.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    loading.style.padding = '20px';
    loading.style.borderRadius = '8px';
    loading.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.2)';
    loading.style.zIndex = '1001';

    var loadingIcon = document.createElement('div');
    loadingIcon.className = 'loading-icon';
    loadingIcon.innerHTML = '<i class="fa fa-spinner fa-spin"></i>';
    
    var loadingText = document.createElement('div');
    loadingText.className = 'loading-text';
    loadingText.textContent = 'Carregando...';
    
    loading.appendChild(loadingIcon);
    loading.appendChild(loadingText);
    
    document.body.appendChild(loading);
    
    loading.style.display = 'block';

}

function hideLoadingSign() {
    var loading = document.getElementById('loading');
    if (loading) {
        loading.parentNode.removeChild(loading);
    }

    // Remove o overlay também
    var overlay = document.querySelector('.overlay');
    if (overlay) {
        overlay.parentNode.removeChild(overlay);
    }
}



