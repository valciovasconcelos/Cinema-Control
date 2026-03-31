// ============================
// FILMES.JS
// Lógica de cadastro de filmes
// Usa localStorage para salvar dados
// ============================

// Quando a página carregar, exibe os filmes já cadastrados
document.addEventListener('DOMContentLoaded', function() {
    listarFilmes();
});

// Captura o envio do formulário
document.getElementById('formFilme').addEventListener('submit', function(event) {
    // preventDefault() impede o formulário de recarregar a página
    // (comportamento padrão do HTML)
    event.preventDefault();

    // Pega os valores digitados pelo usuário
    var titulo = document.getElementById('titulo').value;
    var genero = document.getElementById('genero').value;
    var descricao = document.getElementById('descricao').value;
    var classificacao = document.getElementById('classificacao').value;
    var duracao = document.getElementById('duracao').value;
    var dataEstreia = document.getElementById('dataEstreia').value;

    // Cria um objeto com todos os dados do filme
    // Date.now() gera um ID único baseado no timestamp
    var filme = {
        id: Date.now(),
        titulo: titulo,
        genero: genero,
        descricao: descricao,
        classificacao: classificacao,
        duracao: duracao,
        dataEstreia: dataEstreia
    };

    // Busca os filmes já salvos no localStorage
    // Se não existir nada, usa um array vazio []
    var filmes = JSON.parse(localStorage.getItem('filmes')) || [];

    // Adiciona o novo filme ao array
    filmes.push(filme);

    // Salva o array de volta no localStorage
    // JSON.stringify() converte o array de objetos em string
    // (localStorage só aceita strings!)
    localStorage.setItem('filmes', JSON.stringify(filmes));

    // Limpa o formulário
    this.reset();

    // Mostra mensagem de sucesso
    alert('Filme salvo com sucesso!');

    // Atualiza a tabela
    listarFilmes();
});

// Função que lê os filmes do localStorage e monta a tabela
function listarFilmes() {
    var filmes = JSON.parse(localStorage.getItem('filmes')) || [];
    var tbody = document.getElementById('tabelaFilmes');

    // Limpa a tabela antes de preencher
    tbody.innerHTML = '';

    // Se não tem filmes, mostra mensagem
    if (filmes.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center text-muted">Nenhum filme cadastrado.</td></tr>';
        return;
    }

    // Para cada filme, cria uma linha na tabela
    for (var i = 0; i < filmes.length; i++) {
        var filme = filmes[i];

        // Cria o elemento <tr> (linha da tabela)
        var tr = document.createElement('tr');

        // innerHTML define o conteúdo HTML dentro da linha
        tr.innerHTML =
            '<td>' + filme.titulo + '</td>' +
            '<td>' + filme.genero + '</td>' +
            '<td>' + filme.classificacao + '</td>' +
            '<td>' + filme.duracao + ' min</td>' +
            '<td>' + filme.dataEstreia + '</td>' +
            '<td><button class="btn btn-danger btn-sm" onclick="excluirFilme(' + filme.id + ')">Excluir</button></td>';

        // Adiciona a linha ao corpo da tabela
        tbody.appendChild(tr);
    }
}

// Função para excluir um filme pelo ID
function excluirFilme(id) {
    if (!confirm('Tem certeza que deseja excluir este filme?')) {
        return;
    }

    var filmes = JSON.parse(localStorage.getItem('filmes')) || [];

    // filter() cria um novo array SEM o filme que tem o ID informado
    filmes = filmes.filter(function(filme) {
        return filme.id !== id;
    });

    // Salva o array atualizado
    localStorage.setItem('filmes', JSON.stringify(filmes));

    // Atualiza a tabela
    listarFilmes();
}
