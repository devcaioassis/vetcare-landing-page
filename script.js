// Comportamento do formulario
const formContato = document.getElementById('form-contato');
const cartaoSucesso = document.getElementById('mensagem-sucesso');
const btnNovoAgendamento = document.getElementById('btn-novo-agendamento');

if (formContato && cartaoSucesso && btnNovoAgendamento) {
    formContato.addEventListener('submit', function (event) {
        event.preventDefault();
        formContato.style.display = 'none';
        cartaoSucesso.style.display = 'block';
    });

    btnNovoAgendamento.addEventListener('click', function () {
        formContato.reset();
        cartaoSucesso.style.display = 'none';
        formContato.style.display = 'flex';
    });
}

const btnSaibaMais = document.getElementById('btn-cta');
const secaoServicos = document.getElementById('servicos');

if (btnSaibaMais && secaoServicos) {
    btnSaibaMais.addEventListener('click', function () {
        secaoServicos.scrollIntoView({
            behavior: 'smooth'
        });
    });
}

// consumo da api
const campoCep = document.getElementById('cep');
const campoEndereco = document.getElementById('endereco');

if (campoCep && campoEndereco) {
    campoCep.addEventListener('blur', function () {
        let cepDigitado = campoCep.value.replace(/\D/g, '');

        if (cepDigitado.length === 8) {
            campoEndereco.value = "Buscando endereço...";

            fetch(`https://viacep.com.br/ws/${cepDigitado}/json/`)
                .then(function (resposta) {
                    return resposta.json();
                })
                .then(function (dados) {
                    if (dados.erro) {
                        campoEndereco.value = "CEP não encontrado.";
                    } else {
                        campoEndereco.value = `${dados.logradouro}, ${dados.bairro} - ${dados.localidade}/${dados.uf}`;
                    }
                })
                .catch(function (erro) {
                    campoEndereco.value = "Erro ao buscar o CEP.";
                    console.error("Ocorreu um erro:", erro);
                });
        } else {
            campoEndereco.value = "Por favor, digite um CEP válido.";
        }
    });
}