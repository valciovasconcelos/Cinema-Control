// ============================
// INGRESSOS.JS
// Lógica de venda de ingressos
// 
// CONCEITO NOVO: URLSearchParams
// Quando o usuário clica "Comprar Ingresso"
// na listagem de sessões, ele é redirecionado
// para esta página com ?sessaoId=123 na URL.
// Nós lemos esse parâmetro e pré-selecionamos
// a sessão no select automaticamente.
// ============================

document.addEventListener('DOMContentLoaded', function() {
    carregarSessoes();
    listarIngressos();
});

// Busca filme e sala pelo ID (para montar o texto do select)
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

function carregarSessoes() {
    var sessoes = JSON.parse(localStorage.getItem('sessoes')) || [];
    var select = document.getElementById('sessaoId');

    // Para cada sessão, cria um option mostrando:
    // "Nome do Filme - Nome da Sala - Data/Hora"
    for (var i = 0; i < sessoes.length; i++) {
        var sessao = sessoes[i];
        var filme = buscarFilmePorId(sessao.filmeId);
        var sala = buscarSalaPorId(sessao.salaId);

        var nomeFilme = filme ? filme.titulo : 'Filme removido';
        var nomeSala = sala ? sala.nome : 'Sala removida';

        var option = document.createElement('option');
        option.value = sessao.id;
        option.textContent = nomeFilme + ' - ' + nomeSala + ' - ' + sessao.dataHora.replace('T', ' ');
        select.appendChild(option);
    }

    // ============================
    // LEITURA DE PARÂMETRO DA URL
    // URLSearchParams lê os dados após o "?" na URL
    // Ex: venda-ingressos.html?sessaoId=123
    // ============================
    var params = new URLSearchParams(window.location.search);
    var sessaoIdUrl = params.get('sessaoId');

    // Se veio um sessaoId na URL, seleciona automaticamente
    if (sessaoIdUrl) {
        select.value = sessaoIdUrl;
    }
}

document.getElementById('formIngresso').addEventListener('submit', function(event) {
    event.preventDefault();

    var ingresso = {
        id: Date.now(),
        sessaoId: Number(document.getElementById('sessaoId').value),
        nomeCliente: document.getElementById('nomeCliente').value,
        cpf: document.getElementById('cpf').value,
        assento: document.getElementById('assento').value,
        tipoPagamento: document.getElementById('tipoPagamento').value
    };

    var ingressos = JSON.parse(localStorage.getItem('ingressos')) || [];
    ingressos.push(ingresso);
    localStorage.setItem('ingressos', JSON.stringify(ingressos));

    this.reset();
    alert('Venda confirmada com sucesso!');
    listarIngressos();
});

function listarIngressos() {
    var ingressos = JSON.parse(localStorage.getItem('ingressos')) || [];
    var tbody = document.getElementById('tabelaIngressos');
    tbody.innerHTML = '';

    if (ingressos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center text-muted">Nenhum ingresso vendido.</td></tr>';
        return;
    }

    for (var i = 0; i < ingressos.length; i++) {
        var ingresso = ingressos[i];

        // Monta o texto da sessão para exibir na tabela
        var sessoes = JSON.parse(localStorage.getItem('sessoes')) || [];
        var textoSessao = 'Sessão removida';
        for (var j = 0; j < sessoes.length; j++) {
            if (sessoes[j].id === ingresso.sessaoId) {
                var filme = buscarFilmePorId(sessoes[j].filmeId);
                textoSessao = filme ? filme.titulo : 'Filme';
                textoSessao += ' - ' + sessoes[j].dataHora.replace('T', ' ');
                break;
            }
        }

        var tr = document.createElement('tr');
        tr.innerHTML =
            '<td>' + textoSessao + '</td>' +
            '<td>' + ingresso.nomeCliente + '</td>' +
            '<td>' + ingresso.cpf + '</td>' +
            '<td>' + ingresso.assento + '</td>' +
            '<td>' + ingresso.tipoPagamento + '</td>' +
            '<td><button class="btn btn-danger btn-sm" onclick="excluirIngresso(' + ingresso.id + ')">Excluir</button></td>';
        tbody.appendChild(tr);
    }
}

function excluirIngresso(id) {
    if (!confirm('Tem certeza que deseja excluir este ingresso?')) return;

    var ingressos = JSON.parse(localStorage.getItem('ingressos')) || [];
    ingressos = ingressos.filter(function(ingresso) {
        return ingresso.id !== id;
    });
    localStorage.setItem('ingressos', JSON.stringify(ingressos));
    listarIngressos();
}
