// Funções isoladas para gerenciar o LocalStorage
const StorageManager = {
  SALVAR_CHAVE: 'historico_cidades_cejra',

  obterHistorico() {
    const dados = localStorage.getItem(this.SALVAR_CHAVE);
    return dados ? JSON.parse(dados) : []; // JSON.parse() exigido [cite: 82]
  },

  salvarCidade(cidade) {
    let historico = this.obterHistorico();
    // Evita duplicados
    if (!historico.includes(cidade)) {
      historico.push(cidade);
      localStorage.setItem(this.SALVAR_CHAVE, JSON.stringify(historico)); // JSON.stringify() exigido [cite: 82]
    }
  },

  limpar() {
    localStorage.removeItem(this.SALVAR_CHAVE);
  }
};