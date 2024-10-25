$(document).ready(function () {
    let register_employee = `
      <div class="ticket-container">
          <h2>Cadastrar Funcionário</h2>
         
          <form id="register_employee" class="ticket-form">
              <div class="form-group">
                  <input type="text" id="nicknameRegisterEmployee" required placeholder=" ">
                  <label for="nicknameRegister">Nome Completo</label>
              </div>
              <div class="form-group">
                  <input type="text" id="usernameRegisterEmployee" required placeholder=" " autocomplete="username"> 
                  <label for="usernameRegister">Nome de Usuário</label>
              </div>
              <div class="form-group">
                  <input type="email" id="emailRegisterEmployee" required placeholder=" ">
                  <label for="emailRegister">E-mail</label>
              </div>
              <div class="form-group">
                  <input type="password" id="passwordRegisterEmployee" required placeholder=" " minlength="6" autocomplete="new-password">
                  <label for="passwordRegister">Senha</label>
              </div>
              <div class="form-group">
                  <input type="password" id="confirmPasswordRegisterEmployee" required placeholder=" " minlength="6" autocomplete="new-password">
                  <label for="confirmPasswordRegister">Confirmar Senha</label>
              </div>
              <input type="submit" value="Cadastrar Funcionário">

              <a href="index.html">Voltar</a>
          </form>
        </div> 
  `;
    $("#register_employee").html(register_employee);

    document.getElementById('register_employee').addEventListener('submit', async function (event) {
        event.preventDefault();

        showLoading();

        const nicknameRegisterEmployee = document.getElementById('nicknameRegisterEmployee').value.trim();
        const usernameRegisterEmployee = document.getElementById('usernameRegisterEmployee').value.trim();
        const emailRegisterEmployee = document.getElementById('emailRegisterEmployee').value.trim();
        const passwordRegisterEmployee = document.getElementById('passwordRegisterEmployee').value.trim();
        const confirmPasswordRegisterEmployee = document.getElementById('confirmPasswordRegisterEmployee').value.trim();

        const url = "http://localhost:3000/auth/sign-up-employee";
        const data = {
            nickname: nicknameRegisterEmployee,
            username: usernameRegisterEmployee,
            email: emailRegisterEmployee,
            password: passwordRegisterEmployee,
            confirmPassword: confirmPasswordRegisterEmployee,
        }
        const token = null;

        const result = postData(url, data, token);
        result.then(response => {
            const { result: message, success } = response;

            if(success){
                alert(message);
                window.location.reload();
            }else{
                alert(message);
            }
          }).catch(error => {
            alert("Ocorreu um erro:", error);
          });

        hideLoading();
    });

});
