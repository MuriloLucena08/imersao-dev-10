import { startMatrixIntro } from "./matrix-animation.js";

let dados = [];

const campoBusca = document.querySelector('input[type="text"]');
const secaoCards = document.querySelector(".card-container");
const botaoBusca = document.getElementById("botao-busca");

/**
 * Função principal que inicializa a aplicação.
 */
async function main() {
  // Espera a animação de introdução terminar
  await startMatrixIntro(3000); // 3000ms = 3 segundos
  // Só então carrega os dados dos cards
  carregarDados();
}

async function carregarDados() {
  try {
    const resposta = await fetch("data.json");
    dados = await resposta.json();
  } catch (error) {
    console.error("Erro ao carregar os dados:", error);
    secaoCards.innerHTML =
      "<p>Não foi possível carregar os dados. Tente novamente mais tarde.</p>";
  }
}

botaoBusca.addEventListener("click", iniciarBusca);

// Adiciona um "ouvinte" para a tecla Enter
campoBusca.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    iniciarBusca();
  }
});

// Adiciona um "ouvinte" para o evento de digitação (input)
campoBusca.addEventListener("input", iniciarBusca);

// Função central de busca, agora acionada por clique, Enter ou digitação
function iniciarBusca() {
  const termoBusca = campoBusca.value.trim().toLowerCase();
  const valorOriginalBusca = campoBusca.value; // Guarda o valor original para a mensagem de erro

  // Limpa a seção de cards para qualquer nova busca
  secaoCards.innerHTML = "";

  // Se a busca for pela palavra "todas", carrega todos os cards
  if (termoBusca === "todas") {
    secaoCards.innerHTML = dados.map(criarCardHTML).join("");
    return;
  }

  // Se a busca estiver vazia, a tela permanece em branco
  if (termoBusca === "") {
    campoBusca.value = "";
    return;
  }

  // Filtra os dados para encontrar todas as tecnologias que começam com o termo buscado
  const resultados = dados.filter((lang) =>
    lang.nome.toLowerCase().startsWith(termoBusca)
  );

  if (resultados.length > 0) {
    // Se encontrou resultados, cria e exibe os cards
    secaoCards.innerHTML = resultados.map(criarCardHTML).join("");
  } else {
    // Se não encontrou, exibe a mensagem de erro
    secaoCards.innerHTML = `<p>Nenhum resultado encontrado para "${valorOriginalBusca}".</p>`;
  }
}

function criarCardHTML(linguagem) {
  return `
    <article class="card">
      <img 
        src="${linguagem.imagem}" 
        alt="Logo da linguagem ${linguagem.nome}" 
        class="card-image"
        onerror="this.style.display='none';"
      >
      <h2>${linguagem.nome}</h2>
      <p><strong>Ano de criação:</strong> ${linguagem.ano}</p>
      <p>${linguagem.descricao}</p>
      <a href="${linguagem.link}" target="_blank">Saiba mais</a>
    </article>
  `;
}

// Inicia a aplicação
main();

