const form = document.getElementById("formulario");
let linhas = [];
const mensagem = document.getElementById("mensagem");

//// Aplica as máscaras nos campos assim que a página carregar
document.addEventListener("DOMContentLoaded", function () {
    Inputmask({ mask: "99" }).mask(document.getElementById("ddd"));
    Inputmask({ mask: "99999-9999" }).mask(document.getElementById("telefone"));
});

form.addEventListener('submit', function(e) {
    e.preventDefault();
    adicionarLinha();
    atualizarTabela();
});

function adicionarLinha() {
    const nomeCompleto = document.getElementById('nome');
    const ddd = document.getElementById('ddd');
    const cell = document.getElementById('telefone');
    const email = document.getElementById('email');

    // Remove a máscara para facilitar a validação
    const telefoneSemMascara = cell.value.replace(/\D/g, '');
    const dddSemMascara = ddd.value.replace(/\D/g, '');

    if (nomeCompleto.value.trim().length < 15) {
        mensagem.textContent = "O nome deve ter pelo menos 15 caracteres.";
        mensagem.style.color = "red";
        return;
    }

    if (dddSemMascara.length !== 2) {
        mensagem.textContent = "O DDD deve conter exatamente 2 números.";
        mensagem.style.color = "red";
        return;
    }

    if (telefoneSemMascara.length < 8 || telefoneSemMascara.length > 9) {
        mensagem.textContent = "O telefone deve ter entre 8 e 9 números.";
        mensagem.style.color = "red";
        return;
    }

    const contatoDuplicado = linhas.some(function(contato) {
        return (
            contato.nome.trim().toLowerCase() === nomeCompleto.value.trim().toLowerCase() ||
            contato.telefone === formatarTelefone(telefoneSemMascara) ||
            contato.email.trim().toLowerCase() === email.value.trim().toLowerCase()
        );
    });

    if (contatoDuplicado) {
        mensagem.textContent = "Este contato já foi adicionado.";
        mensagem.style.color = "red";
    } else {
        const novoContato = {
            nome: nomeCompleto.value.trim(),
            ddd: dddSemMascara,
            telefone: formatarTelefone(telefoneSemMascara), // Aplica formatação (ex.: 99999-9999)
            email: email.value.trim()
        };

        linhas.push(novoContato);

        mensagem.textContent = "Contato adicionado com sucesso!";
        mensagem.style.color = "green";
    }

    nomeCompleto.value = "";
    ddd.value = "";
    cell.value = "";
    email.value = "";
}

function atualizarTabela() {
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = "";

    linhas.forEach(function(contato) {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${contato.nome}</td>
            <td>(${contato.ddd}) ${contato.telefone}</td>
            <td>${contato.email}</td>
        `;

        corpoTabela.appendChild(linha);
    });
}

function formatarTelefone(numero) {
    if (numero.length === 9) {
        return `${numero.slice(0, 5)}-${numero.slice(5)}`;
    } else {
        return `${numero.slice(0, 4)}-${numero.slice(4)}`;
    }
}
