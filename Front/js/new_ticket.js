$(document).ready(function () {
    let novo_ticket = `
      <div class="login-container">
          <h2>Novo Chamado</h2>
          <form id="ticketForm" class="ticket-form">

              <div class="form-group">
              
                    <select id="localTicket" required>
                        <option value="" disabled selected hidden> Local </option>
                        <option value="Administração e Recursos Humanos">Departamento de Administração e Recursos Humanos</option>
                        <option value="Recursos Humanos">Departamento de Recursos Humanos</option>
                        <option value="Compras e Licitações">Departamento de Compras e Licitações</option>
                        <option value="Licitações">Departamento de Licitações</option>
                        <option value="Compras">Departamento de Compras</option>
                        <option value="Obras e Engenharia">Departamento de Obras e Engenharia</option>
                        <option value="Assuntos Jurídicos">Departamento de Assuntos Jurídicos</option>
                        <option value="Tributação">Departamento de Tributação</option>
                        <option value="Gabinete">Departamento do Gabinete</option>
                        <option value="Comunicação">Departamento de Comunicação</option>
                        <option value="Controle Interno">Departamento de Controle Interno</option>
                        <option value="Finanças">Departamento de Finanças</option>
                        <option value="Contabilidade">Departamento de Contabilidade</option>
                        <option value="Tesouro">Departamento do Tesouro</option>
                        <option value="Convênios">Departamento de Convênios</option>
                        <option value="Educação">Departamento de Educação</option>
                        <option value="Esportes">Departamento de Esportes</option>
                        <option value="Saúde (Posto Central)">Departamento de Saúde (Posto Central)</option>
                        <option value="Saúde (Posto Raul Garcia)">Departamento de Saúde (Posto Raul Garcia)</option>
                        <option value="Saúde (Hospital)">Departamento de Saúde (Hospital)</option>
                        <option value="Frota">Departamento de Frota</option>
                        <option value="Turismo">Departamento de Turismo</option>
                        <option value="Agricultura">Departamento de Agricultura</option>
                        <option value="Estradas e Transportes">Departamento de Estradas e Transportes</option>
                    </select>

                    
              </div>

            <div class="form-group">
              
                    <select id="priorityTicket" required>
                        <option value="" disabled selected hidden> Prioridade </option>
                        <option value="Alta">Alta</option>
                        <option value="Média">Média</option>
                        <option value="Baixa">Baixa</option>
                    </select>
                    
              </div>

              <div class="form-group">
                <input type="text" id="taskTicket" required placeholder=" " maxlength="544">
                <label for="taskTicket">Tarefa</label>
            </div>
            <div class="form-group">
                <textarea id="commentsTicket" placeholder=" Comentários" maxlength="544"></textarea>
            </div>

              <input type="submit" value="Criar Chamado">  
              
              <a href="index.html">Voltar</a>
          </form>
          
      </div>
  `;
    $("#new_ticket").html(novo_ticket);

    document.getElementById('ticketForm').addEventListener('submit', async function (event) {
        event.preventDefault();
        showLoading();

        const localTicket = document.getElementById('localTicket').value;
        const priorityTicket = document.getElementById('priorityTicket').value;
        const taskTicket = document.getElementById('taskTicket').value;
        const commentsTicket = document.getElementById('commentsTicket').value;
        const user = JSON.parse(localStorage.getItem('user'));
        const url = "http://localhost:3000/tickets/newTicket";
        const data = {
            iduser: user.iduser,
            local: localTicket,
            priority: priorityTicket,
            task: taskTicket,
            comments: commentsTicket
        }
        const token = localStorage.getItem('token');
        console.log(data);
        const result = postData(url, data, token);
        result.then(response => {
            const { result: mensagem, success } = response;
        
            if (success) {
                alert(mensagem);
                window.location.href = "./index.html?view=tickets";
            } else {
                alert(mensagem);
            }
        }).catch(error => {
            console.error("Ocorreu um erro:", error);
            alert("Ocorreu um erro. Verifique o console para mais detalhes.");
        });
        
        hideLoading();
        
    });

});
