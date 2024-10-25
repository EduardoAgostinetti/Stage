$(document).ready(function () {
    const authToken = localStorage.getItem('token');

    if (!authToken) {
        let account = `<h2>Erro 404</h2>`;
        $("#account").html(account);
    } else {
        let account = `
        <div class="account-container">
          <h2>Configurações</h2>
          <div class="toggle-buttons">
              <button class="personalData-btn active" onclick="toggleFormAccount('personalData')">Dados Pessoais</button>
              <button class="Security-btn" onclick="toggleFormAccount('Security')">Segurança</button>
          </div>   
          <br><br>
        <div class="personalData">
            <div class="account-links">
                <div class="toggle-buttons-account">
                    <button class="change-btn" type="submit" onclick="toggleFormAccount('yourData')">Seus Dados > </button><br><br>
                </div> 
            </div>
        </div>
        <div class="security">
            <div class="account-links">
                <div class="toggle-buttons-account">
                    <button class="change-btn" type="submit" onclick="toggleFormAccount('')">Brevemente > </button><br><br>
                </div>
            </div>
         </div>
            <form id="nicknameForm" class="nickname-form">
                <div class="form-group">
                    <input type="text" id="nicknameOld" required disabled="true">
                </div>
                <div class="form-group">
                    <input type="text" id="nicknameChange" required placeholder=" ">
                    <label for="nicknameChange">Novo Nome</label>
                </div>
                <div class="form-group">
                    <input type="text" id="confirmNickname" required placeholder=" ">
                    <label for="confirmNickname">Confirmar Nome</label>
                </div>
                <input type="submit" value="Alterar">
                <div class="toggle-buttons-account">
                    <button type="button" onclick="toggleFormAccount('personalData')"> < Voltar </button>
                </div>
            </form>
            <form id="usernameForm" class="username-form">
                <div class="form-group">
                    <input type="text" id="usernameOld" required disabled="true">
                </div>
                <div class="form-group">
                    <input type="text" id="usernameChange" required placeholder=" ">
                    <label for="usernameChange">Novo Nome de Usuário</label>
                </div>
                <div class="form-group">
                    <input type="text" id="confirmUsername" required placeholder=" ">
                    <label for="confirmUsername">Confirmar Nome de Usuário</label>
                </div>
                <input type="submit" value="Alterar">
                <div class="toggle-buttons-account">
                    <button type="button" onclick="toggleFormAccount('personalData')"> < Voltar </button>
                </div>
            </form>
            <form id="passwordForm" class="password-form">
                <div class="form-group">
                    <input type="password" id="passwordChange" required placeholder=" "  minlength="6" autocomplete="new-password">
                    <label for="passwordChange">Nova Senha</label>
                </div>
                <div class="form-group">
                    <input type="password" id="confirmPassword" required placeholder=" " minlength="6" autocomplete="new-password">
                    <label for="confirmPassword">Confirmar Senha</label>
                </div>
                <input type="submit" value="Alterar">
                <div class="toggle-buttons-account">
                    <button type="button" onclick="toggleFormAccount('personalData')"> < Voltar </button>
                </div>
            </form>
            <form id="yourdataForm" class="yourdata-form">
                <div class="form-group">
                    <input type="text" id="usernameData" required disabled="true">
                    <label for="usernameData">Nome de Usuário</label>
                </div>
                <div class="form-group">
                    <input type="text" id="nicknameData" required disabled="true">
                    <label for="nicknameData">Apelido</label>
                </div>
                <div class="form-group">
                    <input type="text" id="emailData" required disabled="true">
                    <label for="emailData">E-mail</label>
                </div>
                <div class="toggle-buttons-account">
                    <button type="button" onclick="toggleFormAccount('personalData')"> < Voltar </button>
                </div>
            </form>
        </div>
        <script>
        toggleFormAccount('personalData');
        window.onload = populateAccount();
        </script>
    `;
        $("#account").html(account);

    }
});

function populateAccount() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        document.querySelector('#usernameData').value = user.username || '';
        document.querySelector('#nicknameData').value = user.nickname || '';
        document.querySelector('#emailData').value = user.email || '';
        document.querySelector('#nicknameOld').value = user.nickname || '';
        document.querySelector('#usernameOld').value = user.username || '';
    } else {
        console.error('Nenhum dado de usuário encontrado no localStorage');
    }
}


function toggleFormAccount(formType) {
    const personalDataDiv = document.querySelector('.personalData');
    const securityDiv = document.querySelector('.security');
    const personalDataBtn = document.querySelector('.personalData-btn');
    const securityBtn = document.querySelector('.Security-btn');
    const nicknameForm = document.querySelector('.nickname-form');
    const usernameForm = document.querySelector('.username-form');
    const passwordForm = document.querySelector('.password-form');
    const yourdataForm = document.querySelector('.yourdata-form');

    personalDataDiv.style.display = 'none';
    securityDiv.style.display = 'none';
    nicknameForm.style.display = 'none';
    usernameForm.style.display = 'none';
    passwordForm.style.display = 'none';
    yourdataForm.style.display = 'none';

    personalDataBtn.classList.remove('active');
    securityBtn.classList.remove('active');

    if (formType === 'personalData') {
        personalDataDiv.style.display = 'block';
        personalDataBtn.classList.add('active');
    } else if (formType === 'Security') {
        securityDiv.style.display = 'block';
        securityBtn.classList.add('active');
    } else if (formType === 'nicknameForm'){
        nicknameForm.style.display = 'block';
    } else if (formType === 'usernameForm'){
        usernameForm.style.display = 'block';
    } else if (formType === 'passwordForm'){
        passwordForm.style.display = 'block';
    } else if (formType === 'yourData'){
        yourdataForm.style.display = 'block';
    }
}
