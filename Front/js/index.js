function getQueryParam(param) {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function showDivBasedOnView() {
    let view = getQueryParam('view');
    if (view) {
        $('.main-wrapper > div').addClass('hidden');
        $('#' + view).removeClass('hidden'); 
    }else{
        $('#index').removeClass('hidden');
    }
}

async function postData(url, data, token = null) {
    try {
        // Cria o objeto de headers padrão
        const headers = {
            'Content-Type': 'application/json',
        };

        // Se o token for fornecido, adiciona ao header Authorization
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        });

        const result = await response.json();
        return result;

    } catch (error) {
        return error;
    }
}


$(document).ready(function() {
    showDivBasedOnView();

    let index = `
        <h2>Help Desk - Gerenciador de Chamados</h2>
        <p>Controle e gerencie seus chamados técnicos de maneira fácil</p>
        <img src="./img/index_image.png"></img>
    `;
        $("#index").html(index);
});