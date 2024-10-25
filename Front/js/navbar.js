$(document).ready(function(){
    const authToken = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const userPermission = user ? user.permission : null; // Obtém a permissão do usuário

    let navbarHtml = `<nav class="navbar">
        <div class="logo">
            <a href="index.html"><img src="./img/logo.png"></a>
        </div>`;

    if (authToken) {
        // Links que todos os usuários autenticados podem ver
        navbarHtml += `
        <div class="hamburger" onclick="toggleMenu()">
            ☰
        </div>
        <div class="dropdown-menu" id="dropdownMenu">
            <div class="right-buttons">
                <a href="index.html"><i class="fa-solid fa-house"></i><br>Início</a>                
                ${userPermission == 0 ? `<a href="index.html?view=tickets"><i class="fa-solid fa-rectangle-list"></i><br>Chamados</a>
                    <a href="index.html?view=register_employee"><i class="fa-solid fa-user-plus"></i><br>Cadastrar Funcionário</a>
                <a href="index.html?view=report"><i class="fa-solid fa-file-lines"></i><br>Gerar Relatório</a>` : ''}
                ${userPermission == 1 ? `<a href="index.html?view=tickets"><i class="fa-solid fa-rectangle-list"></i><br>Chamados</a>` : ''}
                ${userPermission == 2 ? `<a href="index.html?view=new_ticket"><i class="fa-solid fa-plus"></i><br>Novo Chamado</a>
                <a href="index.html?view=tickets"><i class="fa-solid fa-rectangle-list"></i><br>Chamados</a>` : ''}
                <a href="index.html?view=account"><i class="fa-solid fa-gear"></i><br>Configurações</a>
                <a href="#" onclick="logout()"><i class="fa-solid fa-right-from-bracket"></i><br>Sair</a>
            </div>
        </div>
        <div class="nav-links" id="navLinks">
            <a href="index.html"><i class="fa-solid fa-house"></i><br>Início</a>
            ${userPermission == 0 ? `<a href="index.html?view=tickets"><i class="fa-solid fa-rectangle-list"></i><br>Chamados</a>
                <a href="index.html?view=register_employee"><i class="fa-solid fa-user-plus"></i><br>Cadastrar Funcionário</a>
            <a href="index.html?view=report"><i class="fa-solid fa-file-lines"></i><br>Gerar Relatório</a>` : ''}
            ${userPermission == 1 ? `<a href="index.html?view=tickets"><i class="fa-solid fa-rectangle-list"></i><br>Chamados</a>` : ''}
            ${userPermission == 2 ? `<a href="index.html?view=new_ticket"><i class="fa-solid fa-plus"></i><br>Novo Chamado</a>
            <a href="index.html?view=tickets"><i class="fa-solid fa-rectangle-list"></i><br>Chamados</a>` : ''}
        </div>`;
    } else {
        navbarHtml += `
        <div class="hamburger" onclick="toggleMenu()">
            ☰
        </div>
        <div class="dropdown-menu" id="dropdownMenu">
            <div class="right-buttons">
                <a href="index.html"><i class="fa-solid fa-house"></i><br>Início</a>
                <a href="index.html?view=sign&mode=in"><i class="fa-solid fa-right-to-bracket"></i><br>Acessar</a>
                <a href="index.html?view=sign&mode=up"><i class="fa-solid fa-user-plus"></i><br>Cadastrar</a>
            </div>
        </div>
        <div class="nav-links" id="navLinks">
            <a href="index.html"><i class="fa-solid fa-house"></i><br>Início</a>
        </div>`;
    }

    navbarHtml += `
    <div class="right-buttons" id="rightButtons">`;

    if (authToken) {
        navbarHtml += `
        <div class="hamburger-dt" onclick="toggleMenu2()">
            ☰
        </div>
        <div class="dropdown-menu-dt" id="dropdownMenu-dt">
            <div class="right-buttons">
                <a href="index.html?view=account"><i class="fa-solid fa-gear"></i><br>Configurações</a>
                <a href="#" onclick="logout()"><i class="fa-solid fa-right-from-bracket"></i><br>Sair</a>
            </div>
        </div>`;
    } else {
        navbarHtml += `
            <a href="index.html?view=sign&mode=in"><i class="fa-solid fa-right-to-bracket"></i><br>Acessar</a>
            <a href="index.html?view=sign&mode=up"><i class="fa-solid fa-user-plus"></i><br>Cadastrar</a>
        `;
    }

    navbarHtml += `</div></nav>`;

    $("#navbar").html(navbarHtml);
});


function toggleMenu() {
    var dropdownMenu = document.getElementById("dropdownMenu");
    if (dropdownMenu) {
        if (dropdownMenu.style.display === "block") {
            dropdownMenu.style.display = "none";
        } else {
            dropdownMenu.style.display = "block";
        }
    }
}

function toggleMenu2() {
    var dropdownMenu_dt = document.getElementById("dropdownMenu-dt");
    if (dropdownMenu_dt) {
        if (dropdownMenu_dt.style.display === "block") {
            dropdownMenu_dt.style.display = "none";
        } else {
            dropdownMenu_dt.style.display = "block";
        }
    }
}

window.addEventListener("resize", function() {
    var width = window.innerWidth;
    var navLinks = document.getElementById("navLinks");
    var rightButtons = document.getElementById("rightButtons");
    var dropdownMenu = document.getElementById("dropdownMenu");
    if (width > 768) {
        if (navLinks) navLinks.style.display = "flex";
        if (rightButtons) rightButtons.style.display = "flex";
        if (dropdownMenu) dropdownMenu.style.display = "none";
    } else {
        if (navLinks) navLinks.style.display = "none";
        if (rightButtons) rightButtons.style.display = "none";
    }
});
