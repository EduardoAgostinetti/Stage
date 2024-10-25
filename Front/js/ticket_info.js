$(document).ready(function () {
    let idticket = getQueryParam('idticket');
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    // Verificar se idticket e token estão presentes
    if (!idticket || !token) {
        // Exibir mensagem de erro se qualquer um dos parâmetros estiver faltando
        $("#ticket_info").html('<h2>Erro 404: Ticket não encontrado ou usuário não autenticado.</h2>');
        return;
    }

    const url = "http://localhost:3000/tickets/getTicketsById";
    const data = { idticket: idticket };

    showLoading();

    postData(url, data, token).then(response => {
        const { result: message, success, tickets } = response;
        
        if (success) {
            // Converta para um formato de data mais legível
            const date = new Date(tickets[0].created_at);
            const formattedDate = date.toLocaleString('pt-BR', {
                weekday: 'long',   // Ex: segunda-feira
                year: 'numeric',   // Ex: 2024
                month: 'long',      // Ex: julho
                day: 'numeric',     // Ex: 29
                hour: 'numeric',    // Ex: 22
                minute: 'numeric',  // Ex: 25
                second: 'numeric'   // Ex: 17
            });

            const dateclose = new Date(tickets[0].closed_at);
            const closed_a = dateclose.toLocaleString('pt-BR', {
                weekday: 'long',   // Ex: segunda-feira
                year: 'numeric',   // Ex: 2024
                month: 'long',      // Ex: julho
                day: 'numeric',     // Ex: 29
                hour: 'numeric',    // Ex: 22
                minute: 'numeric',  // Ex: 25
                second: 'numeric'   // Ex: 17
            });

            // Criar o HTML para os tickets
            let buttonHtmlgerenciaprogress = '';
            let buttonHtmlgerenciaservice = '';
            let closed_at = '';

            if(user.permission != 2){
                if (tickets[0].status === 'Em espera') {
                    buttonHtmlgerenciaservice += '<button id="btn2gerencia" class="action-btn">Encaminhar para Serviço</button>';
                }
                if (tickets[0].status === 'Em progresso') {
                    buttonHtmlgerenciaprogress += `
                        <div class="form-group">
                            <textarea id="solutionTickets" class="" required placeholder="Digite a solução aqui" maxlength="544"></textarea>
                        </div>

                        <br>

                        <button id="btn3gerencia" class="action-btn">Registrar Solução</button>
                    `;
                }
            }

            if (tickets[0].status === 'Fechado') {
                closed_at += `
                    <p><strong>Fechado Em:</strong> ${closed_a}</p>
                `;
            }

            const tickets_infoHtml = `
                <div class="ticket-container">
                    <h2>Informações do Ticket</h2>
                    <p><strong>ID:</strong> ${tickets[0].idtickets}</p>
                    <p><strong>Solicitante:</strong> ${tickets[0].nickname}</p>
                    <p><strong>Localização:</strong> ${tickets[0].local}</p>
                    <p><strong>Prioridade:</strong> ${tickets[0].priority}</p>
                    <p><strong>Tarefa:</strong> ${tickets[0].task}</p>
                    <p><strong>Comentario:</strong> ${tickets[0].comments}</p>
                    <p><strong>Solução:</strong> ${tickets[0].solution}</p>
                    <p><strong>Criado Em:</strong> ${formattedDate}</p>
                    <p><strong>Status:</strong> ${tickets[0].status}</p>
                    ${closed_at}
                    <br>
                    
                    ${buttonHtmlgerenciaprogress}
                    ${buttonHtmlgerenciaservice}
                    <button id="backtickets" class="action-btn">Voltar</button>
                </div>
            `;
            
            $("#ticket_info").html(tickets_infoHtml);

            // Adicionar eventos de clique para alternar a visibilidade dos botões
            $("#backtickets").click(function() {
                // Cria um objeto URLSearchParams com a query string da URL atual
                const params = new URLSearchParams(window.location.search);
                
                // Obtém o valor do parâmetro 'back'
                const back = params.get('back');
                
                // Redireciona com base no valor do parâmetro 'back'
                if (back === "tickets") {
                    window.location.href = "index.html?view=tickets";
                } else if (back === "report") {
                    window.location.href = "index.html?view=report";
                }
            });
            

            $("#btn2gerencia").click(function() {
                showLoading();

                const url = "http://localhost:3000/tickets/service";
                const data = { idticket: tickets[0].idtickets };
                const token = localStorage.getItem('token');

                postData(url, data, token).then(response => {
                    const { result: message, success } = response;

                    if(success){
                        alert(message);
                    } else {
                        alert(message);
                    }
                }).catch(error => {
                    alert("Ocorreu um erro:", error);
                }).finally(() => {
                    hideLoading();
                    window.location.reload();
                });
            });

            $("#btn3gerencia").click(function() {
                const solution = document.getElementById('solutionTickets').value;
                console.log(solution);
                showLoading();

                const url = "http://localhost:3000/tickets/solution";
                const data = { 
                    idticket: tickets[0].idtickets,
                    solution: solution
                 };
                const token = localStorage.getItem('token');

                postData(url, data, token).then(response => {
                    const { result: message, success } = response;

                    if(success){
                        alert(message);
                    } else {
                        alert(message);
                    }
                }).catch(error => {
                    alert("Ocorreu um erro:", error);
                }).finally(() => {
                    hideLoading();
                    window.location.reload();
                });

            });

        } else {
            $("#ticket_info").html(`<p>${message}</p>`);
        }
    }).catch(error => {
        console.error("Ocorreu um erro:", error);
        alert("Ocorreu um erro. Verifique o console para mais detalhes.");
    }).finally(() => {
        hideLoading();
    });
});
