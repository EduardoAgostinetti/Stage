$(document).ready(function () {
    const url = "http://localhost:3000/tickets/getTickets";
    const data = {};
    const token = localStorage.getItem('token');

    if (!token) {
        displayError('Erro 403: Acesso negado. Você não está autenticado.');
        return;
    }

    showLoading();
    fetchTickets(url, data, token);

    function fetchTickets(url, data, token) {
        postData(url, data, token)
            .then(handleResponse)
            .catch(handleError)
            .finally(hideLoading);
    }

    function handleResponse(response) {
        const { result: message, success, tickets } = response;

        if (success) {
            const ticketsHtml = generateTicketsHtml(tickets);
            $("#report").html(ticketsHtml);
            attachEventListeners();
        } else {
            displayError(message);
        }
    }

    function handleError(error) {
        console.error("Ocorreu um erro:", error);
        alert("Ocorreu um erro. Por favor, verifique o console para mais detalhes.");
    }

    function generateTicketsHtml(tickets) {
        const rowsHtml = tickets.map(ticket => {
            const truncatedTask = truncateText(ticket.task, 45);
            const closedDate = formatDate(ticket.closed_at);
            const createdDate = formatDate(ticket.created_at);

            return `
                <tr data-closed-date="${closedDate}" data-created-date="${createdDate}">
                    <td>${ticket.nickname}</td>
                    <td>${ticket.local}</td>
                    <td>${truncatedTask}</td>
                    <td>${ticket.solution}</td>
                    <td><a class="view-btn" data-id="${ticket.idtickets}"><i class="fa-solid fa-pen-to-square"></i></a></td>
                </tr>
            `;
        }).join('');

        return `
            <div class="report-container">
                <h2>Relatórios</h2>
                <div class="filters">
                    <input type="number" id="day-filter" placeholder="Dia" min="1" max="31" />
                    <input type="number" id="month-filter" placeholder="Mês " min="1" max="12" />
                    <input type="number" id="year-filter" placeholder="Ano" />
                </div>
                <br><br>
                <table border="1" cellpadding="10">
                    <thead>
                        <tr>
                            <th>Solicitante</th>
                            <th>Local</th>
                            <th>Tarefa</th>
                            <th>Solução</th>
                            <th>Visualizar</th>
                        </tr>
                    </thead>
                    <tbody id="report-table-body">
                        ${rowsHtml}
                    </tbody>
                </table>
            </div>
        `;
    }

    function attachEventListeners() {
        $(".view-btn").click(function () {
            const ticketId = $(this).data('id');
            viewTicketDetailsReport(ticketId);
        });

        $("#search, #day-filter, #month-filter, #year-filter").on('input', filterTickets);
    }

    function viewTicketDetailsReport(ticketId) {
        window.location.href = `index.html?view=ticket_info&idticket=${ticketId}&back=report`;
    }

    function filterTickets() {
        const searchValue = $("#search").val().toLowerCase();
        const dayValue = $("#day-filter").val();
        const monthValue = $("#month-filter").val();
        const yearValue = $("#year-filter").val();

        let anyMatches = false;

        $("#report-table-body tr").each(function () {
            const ticketId = $(this).find("td:eq(0)").text().toLowerCase();
            const closedDate = $(this).data('closed-date').split('/');
            const createdDate = $(this).data('created-date').split('/');
            const [closedDay, closedMonth, closedYear] = closedDate;
            const [createdDay, createdMonth, createdYear] = createdDate;

            const matchesSearch = ticketId.includes(searchValue);
            const matchesDay = (dayValue === "" || closedDay === dayValue || createdDay === dayValue);
            const matchesMonth = (monthValue === "" || closedMonth === monthValue || createdMonth === monthValue);
            const matchesYear = (yearValue === "" || closedYear === yearValue || createdYear === yearValue);

            const isVisible = matchesSearch && matchesDay && matchesMonth && matchesYear;
            $(this).toggle(isVisible);
            if (isVisible) anyMatches = true;
        });

        if (!anyMatches) {
            if ($("#report").find("#no-results").length === 0) {
                $("#report").append('<p id="no-results">Nenhum resultado encontrado para os filtros aplicados.</p>');
            }
        } else {
            $("#report").find("#no-results").remove();
        }
    }

    function displayError(message) {
        $("#report").html(`<h2>${message}</h2>`);
    }

    function isAnyFilterApplied() {
        return $("#search").val() || $("#day-filter").val() || $("#month-filter").val() || $("#year-filter").val();
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }

    function truncateText(text, maxLength) {
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    }
});
