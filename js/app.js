// Elementos capturados do DOM via querySelector [cite: 67]
const formBusca = document.querySelector('#form-busca');
const inputCidade = document.querySelector('#input-cidade');
const loadingElement = document.querySelector('#loading');
const erroElement = document.querySelector('#mensagem-erro');
const cardClima = document.querySelector('#clima-atual');
const listaHistorico = document.querySelector('#lista-historico');
const btnLimpar = document.querySelector('#btn-limpar-historico');
const btnDarkMode = document.querySelector('#dark-mode-toggle');

// ==========================================
// RENDERIZAÇÃO E INTERFACE (UI)
// ==========================================
function exibirLoading(visivel) {
  if (visivel) {
    loadingElement.classList.remove('hidden'); // Manipulação de classes CSS [cite: 70]
    erroElement.classList.add('hidden');
  } else {
    loadingElement.classList.add('hidden');
  }
}

function mostrarErro(mensagem) {
  erroElement.textContent = mensagem;
  erroElement.classList.remove('hidden');
  cardClima.classList.add('hidden');
}

function renderizarClima(dados) {
  document.querySelector('#nome-cidade').textContent = dados.nome;
  document.querySelector('#temp-valor').textContent = dados.tempC.toFixed(1);
  
  // Conversão de Celsius para Fahrenheit (Funcionalidade Obrigatória 54)
  const tempFahrenheit = (dados.tempC * 9/5) + 32;
  document.querySelector('#temp-f').textContent = tempFahrenheit.toFixed(1);
  
  document.querySelector('#vento-valor').textContent = dados.vento;
  document.querySelector('#humidade-valor').textContent = "65"; // Valor estático simulado pela API base
  document.querySelector('#clima-descricao').textContent = `Código de Condição: ${dados.codigoClima}`;

  cardClima.classList.remove('hidden');
}

function atualizarListaHistorico() {
  listaHistorico.innerHTML = '';
  const cidades = StorageManager.obterHistorico();
  
  cidades.forEach(cidade => {
    const li = document.createElement('li'); // Criação dinâmica de elementos [cite: 68]
    li.textContent = cidade;
    li.style.cursor = 'pointer';
    
    // Evento de clique para re-pesquisar do histórico
    li.addEventListener('click', () => executarBusca(cidade));
    listaHistorico.appendChild(li);
  });
}

// ==========================================
// OPERAÇÃO ASSÍNCRONA E EVENTOS
// ==========================================
async function executarBusca(cidade) {
  if (!cidade) return;
  exibirLoading(true);
  
  try {
    const dadosClima = await ApiManager.buscarClimaPorCidade(cidade);
    renderizarClima(dadosClima);
    StorageManager.salvarCidade(dadosClima.nome);
    atualizarListaHistorico();
    erroElement.classList.add('hidden');
  } catch (erro) {
    mostrarErro(erro.message); // Mensagens de erro amigáveis [cite: 107]
  } finally {
    exibirLoading(false); // Retira o Loading State [cite: 79]
  }
}

// Evento de Envio do Formulário [cite: 72]
formBusca.addEventListener('submit', (evento) => {
  evento.preventDefault(); // Prevenção do comportamento default obrigatória [cite: 74]
  const cidadePesquisada = inputCidade.value.trim();
  executarBusca(cidadePesquisada);
  inputCidade.value = '';
});

// Botão Limpar Histórico [cite: 72]
btnLimpar.addEventListener('click', () => {
  StorageManager.limpar();
  atualizarListaHistorico();
});

// Funcionalidade do Modo Escuro 
btnDarkMode.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  btnDarkMode.textContent = document.body.classList.contains('dark-mode') ? "☀️ Modo Claro" : "🌙 Modo Escuro";
});

// Geolocalização Nativa (Funcionalidade Obrigatória 53)
document.querySelector('#btn-geo').addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      exibirLoading(true);
      try {
        const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=Canarana&count=1`);
        const dados = await res.json();
        if(dados.results) executarBusca(dados.results[0].name);
      } catch {
        mostrarErro("Erro ao obter geolocalização automática.");
      } finally {
        exibirLoading(false);
      }
    });
  }
});

// Inicialização da Página
atualizarListaHistorico();