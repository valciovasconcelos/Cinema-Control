// ============================
// SESSOES.JS
// Lógica de cadastro de sessões
// DIFERENCIAL: carrega filmes e salas
// do localStorage para os <select>
// ============================

document.addEventListener('DOMContentLoaded', function() {
    // Ao carregar a página, popula os selects e lista as sessões
    carregarFilmes();
    carregarSalas();
    listarSessoes();
});

// ============================
// CRIAÇÃO DINÂMICA DE <option>
// Este é um conceito importante!
// Lemos os dados do localStorage e
// criamos elementos <option> via JavaScript
// ============================
function carregarFilmes() {
    var filmes = JSON.parse(localStorage.getItem('filmes')) || [];
    var select = document.getElementById('filmeId');

    // Para cada filme, cria um <option> e adiciona no <select>
    for (var i = 0; i < filmes.length; i++) {
        var option = document.createElement('option');
        option.value = filmes[i].id;        // O valor é o ID do filme
        option.textContent = filmes[i].titulo; // O texto visível é o título
        select.appendChild(option);
    }
}

function carregarSalas() {
    var salas = JSON.parse(localStorage.getItem('salas')) || [];
    var select = document.getElementById('salaId');

    for (var i = 0; i < salas.length; i++) {
        var option = document.createElement('option');
        option.value = salas[i].id;
        option.textContent = salas[i].nome + ' (' + salas[i].tipo + ')';
        select.appendChild(option);
    }
}

// Captura o envio do formulário
document.getElementById('formSessao').addEventListener('submit', function(event) {
    event.preventDefault();

    var sessao = {
        id: Date.now(),
        filmeId: Number(document.getElementById('filmeId').value),
        salaId: Number(document.getElementById('salaId').value),
        dataHora: document.getElementById('dataHora').value,
        preco: document.getElementById('preco').value,
        idioma: document.getElementById('idioma').value,
        formato: document.getElementById('formato').value
    };

    var sessoes = JSON.parse(localStorage.getItem('sessoes')) || [];
    sessoes.push(sessao);
    localStorage.setItem('sessoes', JSON.stringify(sessoes));

    this.reset();
    alert('Sessão salva com sucesso!');
    listarSessoes();
});

// ============================
// ENCADEAMENTO DE DADOS
// A sessão guarda apenas o ID do filme e da sala.
// Para exibir na tabela, precisamos BUSCAR
// o nome do filme e da sala pelo ID.
// ============================
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

function listarSessoes() {
    var sessoes = JSON.parse(localStorage.getItem('sessoes')) || [];
    var tbody = document.getElementById('tabelaSessoes');
    tbody.innerHTML = '';

    if (sessoes.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center text-muted">Nenhuma sessão cadastrada.</td></tr>';
        return;
    }

    for (var i = 0; i < sessoes.length; i++) {
        var sessao = sessoes[i];

        // Busca os dados do filme e da sala pelo ID
        var filme = buscarFilmePorId(sessao.filmeId);
        var sala = buscarSalaPorId(sessao.salaId);

        var nomeFilme = filme ? filme.titulo : 'Filme removido';
        var nomeSala = sala ? sala.nome : 'Sala removida';

        var tr = document.createElement('tr');
        tr.innerHTML =
            '<td>' + nomeFilme + '</td>' +
            '<td>' + nomeSala + '</td>' +
            '<td>' + sessao.dataHora.replace('T', ' ') + '</td>' +
            '<td>R$ ' + parseFloat(sessao.preco).toFixed(2) + '</td>' +
            '<td>' + sessao.idioma + '</td>' +
            '<td>' + sessao.formato + '</td>' +
            '<td><button class="btn btn-danger btn-sm" onclick="excluirSessao(' + sessao.id + ')">Excluir</button></td>';
        tbody.appendChild(tr);
    }
}

function excluirSessao(id) {
    if (!confirm('Tem certeza que deseja excluir esta sessão?')) return;

    var sessoes = JSON.parse(localStorage.getItem('sessoes')) || [];
    sessoes = sessoes.filter(function(sessao) {
        return sessao.id !== id;
    });
    localStorage.setItem('sessoes', JSON.stringify(sessoes));
    listarSessoes();
}
