// ============================
// LISTAGEM-SESSOES.JS
// Exibe todas as sessões disponíveis
// com dados combinados de filmes e salas
//
// O botão "Comprar Ingresso" redireciona
// para venda-ingressos.html passando
// o ID da sessão como parâmetro na URL
// ============================

document.addEventListener('DOMContentLoaded', function() {
    listarSessoesDisponiveis();
});

function buscarFilmePorId(id) {
    var filmes = JSON.parse(localStorage.getItem('filmes')) || [];
    for (var i = 0; i < filmes.length; i++) {
        if (filmes[i].id === id) return filmes[i];
    }
    return null;
}

function buscarSalaPorId(id) {
    var salas = JSON.parse(localStorage.getItem('salas')) || [];
    for (var i = 0; i < salas.length; i++) {
        if (salas[i].id === id) return salas[i];
    }
    return null;
}

function listarSessoesDisponiveis() {
    var sessoes = JSON.parse(localStorage.getItem('sessoes')) || [];
    var tbody = document.getElementById('tabelaSessoesDisponiveis');
    tbody.innerHTML = '';

    if (sessoes.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center text-muted">Nenhuma sessão disponível. Cadastre sessões primeiro.</td></tr>';
        return;
    }

    for (var i = 0; i < sessoes.length; i++) {
        var sessao = sessoes[i];
        var filme = buscarFilmePorId(sessao.filmeId);
        var sala = buscarSalaPorId(sessao.salaId);

        var nomeFilme = filme ? filme.titulo : 'Filme removido';
        var nomeSala = sala ? sala.nome : 'Sala removida';

        var tr = document.createElement('tr');

        // ============================
        // REDIRECIONAMENTO COM PARÂMETRO
        // O botão "Comprar Ingresso" usa um link <a>
        // que leva para venda-ingressos.html?sessaoId=XXX
        // Esse parâmetro é lido pelo ingressos.js
        // para pré-selecionar a sessão no select
        // ============================
        tr.innerHTML =
            '<td>' + nomeFilme + '</td>' +
            '<td>' + nomeSala + '</td>' +
            '<td>' + sessao.dataHora.replace('T', ' ') + '</td>' +
            '<td>R$ ' + parseFloat(sessao.preco).toFixed(2) + '</td>' +
            '<td>' + sessao.idioma + '</td>' +
            '<td>' + sessao.formato + '</td>' +
            '<td><a class="btn btn-success btn-sm" href="./venda-ingressos.html?sessaoId=' + sessao.id + '">Comprar Ingresso</a></td>';
        tbody.appendChild(tr);
    }
}
