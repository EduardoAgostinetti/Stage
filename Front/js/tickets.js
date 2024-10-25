$(document).ready(function () {
    const url = "http://localhost:3000/tickets/getTickets";
    const data = {};
    const token = localStorage.getItem('token');

    // Verificar se o token está presente
    if (!token) {
        $("#tickets").html('<h2>Erro 403: Acesso negado. Você não está autenticado.</h2>');
        return;
    }

    showLoading();

    function truncateText(text, maxLength) {
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    }

    postData(url, data, token).then(response => {
        const { result: message, success, tickets } = response;
        console.log(response);

        if (success) {
            // Criar o HTML para os tickets com opções de busca e filtro
            let ticketsHtml = 
                `<div class="ticket-container">
                    <h2>Chamados</h2>
                    <div class="filters">
                        <input type="text" id="search" placeholder="Buscar por ID do Ticket..." />
                        <select id="priority-filter">
                            <option value="">Todas as Prioridades</option>
                            <option value="Alta">Alta</option>
                            <option value="Média">Média</option>
                            <option value="Baixa">Baixa</option>
                        </select>
                        <select id="status-filter">
                            <option value="">Todos os Status</option>
                            <option value="Em espera">Em espera</option>
                            <option value="Em progresso">Em progresso</option>
                            <option value="Fechado">Fechado</option>
                        </select>
                    </div>
                    <br><br>
                    <table border="1" cellpadding="10">
                        <thead>
                            <tr>
                                <th>ID do Ticket</th>
                                <th>Solicitante</th>
                                <th>Local</th>
                                <th>Prioridade</th>
                                <th>Tarefa</th>
                                <th>Status</th>
                                <th>Visualizar</th>
                            </tr>
                        </thead>
                        <tbody id="ticket-table-body">
            `;

            tickets.forEach(ticket => {
                const truncatedTask = truncateText(ticket.task, 45);

                ticketsHtml += 
                    `<tr>
                        <td>${ticket.idtickets}</td>
                        <td>${ticket.nickname}</td>
                        <td>${ticket.local}</td>
                        <td>${ticket.priority}</td>
                        <td>${truncatedTask}</td>
                        <td>${ticket.status}</td>
                        <td><a class="view-button" data-id="${ticket.idtickets}"><i class="fa-solid fa-pen-to-square"></i></a></td>
                    </tr>`;
            });

            ticketsHtml += `</tbody></table></div>`;

            $("#tickets").html(ticketsHtml);

            // Listener de eventos para os botões de visualização
            $(".view-button").click(function() {
                const ticketId = $(this).data('id');
                viewTicketDetails(ticketId);
            });

            // Listener de eventos para busca e filtros
            $("#search").on('input', filterTickets);
            $("#priority-filter").on('change', filterTickets);
            $("#status-filter").on('change', filterTickets);

        } else {
            $("#tickets").html(`<p>${message}</p>`);
        }
    }).catch(error => {
        console.error("Ocorreu um erro:", error);
        alert("Ocorreu um erro. Por favor, verifique o console para mais detalhes.");
    }).finally(() => {
        hideLoading();
    });

    function viewTicketDetails(ticketId) {
        window.location.href = `index.html?view=ticket_info&idticket=${ticketId}&back=tickets`;
    }

    function filterTickets() {
        const searchValue = $("#search").val().toLowerCase();
        const priorityValue = $("#priority-filter").val();
        const statusValue = $("#status-filter").val();

        $("#ticket-table-body tr").each(function() {
            const ticketId = $(this).find("td:eq(0)").text().toLowerCase(); // Filtrar por ID do Ticket
            const priority = $(this).find("td:eq(3)").text();
            const status = $(this).find("td:eq(5)").text();

            const matchesSearch = ticketId.includes(searchValue);
            const matchesPriority = priorityValue === "" || priority === priorityValue;
            const matchesStatus = statusValue === "" || status === statusValue;

            $(this).toggle(matchesSearch && matchesPriority && matchesStatus);
        });
    }
});
