import { startMatrixIntro } from "./matrix-animation.js";

let dados = [];

const campoBusca = document.querySelector('input[type="text"]');
const secaoCards = document.querySelector(".card-container");

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
    // Constrói todos os cards e os insere de uma só vez para melhor performance
    const todosOsCardsHTML = dados.map(criarCardHTML).join("");
    secaoCards.innerHTML = todosOsCardsHTML;
  } catch (error) {
    console.error("Erro ao carregar os dados:", error);
    secaoCards.innerHTML =
      "<p>Não foi possível carregar os dados. Tente novamente mais tarde.</p>";
  }
}

campoBusca.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    iniciarBusca();
  }
});

function iniciarBusca() {
  const termoBusca = campoBusca.value.trim().toLowerCase();

  secaoCards.innerHTML = "";

  if (termoBusca === "") {
    secaoCards.innerHTML = dados.map(criarCardHTML).join("");
    campoBusca.value = "";
    return;
  }

  const resultado = dados.find(
    (lang) => lang.nome.toLowerCase() === termoBusca
  );

  if (resultado) {
    const cardHTML = criarCardHTML(resultado);
    secaoCards.innerHTML = cardHTML;
  } else {
    secaoCards.innerHTML = `<p>Nenhum resultado encontrado para "${campoBusca.value}".</p>`;
  }

  campoBusca.value = "";
}

function criarCardHTML(linguagem) {
  return `
    <article class="card">
      <img src="${linguagem.imagem}" alt="Logo da linguagem ${linguagem.nome}" class="card-image">
      <h2>${linguagem.nome}</h2>
      <p><strong>Ano de criação:</strong> ${linguagem.ano}</p>
      <p>${linguagem.descricao}</p>
      <a href="${linguagem.link}" target="_blank">Saiba mais</a>
    </article>
  `;
}

// Inicia a aplicação
main();
