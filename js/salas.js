// ============================
// SALAS.JS
// Lógica de cadastro de salas
// Mesma estrutura do filmes.js
// ============================

document.addEventListener('DOMContentLoaded', function() {
    listarSalas();
});

document.getElementById('formSala').addEventListener('submit', function(event) {
    event.preventDefault();

    var nomeSala = document.getElementById('nomeSala').value;
    var capacidade = document.getElementById('capacidade').value;
    var tipo = document.getElementById('tipo').value;

    var sala = {
        id: Date.now(),
        nome: nomeSala,
        capacidade: capacidade,
        tipo: tipo
    };

    // Busca salas existentes ou cria array vazio
    var salas = JSON.parse(localStorage.getItem('salas')) || [];
    salas.push(sala);
    localStorage.setItem('salas', JSON.stringify(salas));

    this.reset();
    alert('Sala salva com sucesso!');
    listarSalas();
});

function listarSalas() {
    var salas = JSON.parse(localStorage.getItem('salas')) || [];
    var tbody = document.getElementById('tabelaSalas');
    tbody.innerHTML = '';

    if (salas.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="text-center text-muted">Nenhuma sala cadastrada.</td></tr>';
        return;
    }

    for (var i = 0; i < salas.length; i++) {
        var sala = salas[i];
        var tr = document.createElement('tr');
        tr.innerHTML =
            '<td>' + sala.nome + '</td>' +
            '<td>' + sala.capacidade + '</td>' +
            '<td>' + sala.tipo + '</td>' +
            '<td><button class="btn btn-danger btn-sm" onclick="excluirSala(' + sala.id + ')">Excluir</button></td>';
        tbody.appendChild(tr);
    }
}

function excluirSala(id) {
    if (!confirm('Tem certeza que deseja excluir esta sala?')) return;

    var salas = JSON.parse(localStorage.getItem('salas')) || [];
    salas = salas.filter(function(sala) {
        return sala.id !== id;
    });
    localStorage.setItem('salas', JSON.stringify(salas));
    listarSalas();
}
