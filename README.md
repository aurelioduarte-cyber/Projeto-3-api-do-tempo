# Painel Meteorológico Integrado - CEJRA ☀️🌦️

[cite_start]Este projeto consiste em uma aplicação web interativa desenvolvida como o **Trabalho 3** para a disciplina de **Desenvolvimento de Software 1** (Licenciatura em Computação)[cite: 1, 6]. [cite_start]A aplicação consome dados em tempo real de uma API pública para exibir informações meteorológicas detalhadas, além de contar com recursos avançados de acessibilidade e persistência de dados local[cite: 6, 11, 13].

## 📋 Opção Escolhida
* [cite_start]**Opção C: Dashboard Meteorológico** [cite: 45]

---

## 🚀 Funcionalidades Implementadas

### Requisitos Obrigatórios:
* [cite_start]**Busca por Cidade:** Permite pesquisar o clima atual de qualquer cidade do mundo através da integração assíncrona[cite: 47].
* [cite_start]**Exibição de Dados Completos:** Mostra temperatura, condições do tempo e velocidade do vento[cite: 48].
* [cite_start]**Conversão de Unidades:** Converte automaticamente a temperatura de Celsius para Fahrenheit em tempo real[cite: 54].
* [cite_start]**Histórico Local:** Armazena e exibe as últimas cidades pesquisadas utilizando o `LocalStorage`[cite: 50, 81].
* [cite_start]**Geolocalização Nativa:** Permite carregar as informações climáticas com base na localização atual do usuário (usando a Geolocation API)[cite: 53].
* [cite_start]**Modo Escuro / Contraste:** Interruptor para alternar o tema do painel (Acessibilidade)[cite: 26, 108].
* [cite_start]**Feedback Visual (Loading State):** Avisos visuais textuais e animações enquanto as requisições estão em andamento[cite: 41, 79, 106].
* [cite_start]**Mensagens de Erro Amigáveis:** Tratamento completo caso uma cidade não seja encontrada ou ocorra falha na rede[cite: 78, 107].

---

## 🛠️ Tecnologias e APIs Utilizadas

* [cite_start]**HTML5 & CSS3:** Estrutura semântica e estilização responsiva (*Mobile-First*)[cite: 108].
* [cite_start]**JavaScript (ES6+):** Manipulação do DOM, gerenciamento de estados e modularização[cite: 66, 83, 96].
* [cite_start]**API Utilizada:** * [Open-Meteo API](https://open-meteo.com/) (API pública e gratuita, utilizada para Geocoding e previsão do tempo sem a necessidade de chaves complexas de autenticação)[cite: 146].

---

## 📂 Estrutura de Arquivos do Projeto

[cite_start]O código foi rigorosamente estruturado de forma modular para separar as responsabilidades do sistema[cite: 84, 96]:

```text
trabalho3/
│
├── index.html          # Estrutura principal do painel interativo
│
├── css/
│   └── style.css       # Estilização geral, variáveis CSS e regras do Modo Escuro
│
└── js/
    ├── api.js          # Módulo responsável pelas requisições assíncronas (Fetch API)
    ├── storage.js      # Módulo que gerencia o LocalStorage (Salvar/Ler dados)
    └── app.js          # Controlador principal (Event listeners e manipulação do DOM)
