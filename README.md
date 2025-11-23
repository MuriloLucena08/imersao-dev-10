# Base de Conhecimento de Linguagens de Programação

Este projeto é uma página web interativa que funciona como uma "Base de Conhecimento", exibindo informações sobre diversas linguagens de programação. A aplicação conta com uma animação de introdução temática "Matrix" e permite que o usuário busque por linguagens específicas.

## ✨ Funcionalidades

- **Animação de Introdução:** Ao abrir a página, o usuário é recebido com uma animação de "Chuva Digital" (Matrix Digital Rain) que dura 3 segundos antes de revelar o conteúdo principal.
- **Visualização em Cards:** As linguagens de programação são exibidas em um layout de cards, cada um contendo nome, imagem, ano de criação, descrição e um link para saber mais.
- **Busca Dinâmica:** O usuário pode digitar o nome de uma linguagem na barra de busca e pressionar "Enter" ou clicar no botão "Buscar" para filtrar os resultados.
- **Carregamento de Dados Externo:** As informações sobre as linguagens são carregadas de forma assíncrona a partir de um arquivo `data.json`, tornando a manutenção e adição de novos conteúdos mais fácil.
- **Design Responsivo:** A interface se adapta a diferentes tamanhos de tela, de desktops a dispositivos móveis.
- **Código Modular:** O JavaScript é organizado em módulos, separando a lógica da animação da lógica principal da aplicação para maior organização e manutenibilidade.

---

## 🚀 Tecnologias Utilizadas

- **HTML5:** Para a estrutura semântica da página.
- **CSS3:** Para estilização, utilizando Flexbox, variáveis CSS para o tema e Media Queries para a responsividade.
- **JavaScript (ES6+):**
  - **Módulos (Import/Export):** Para organizar o código em arquivos separados.
  - **Async/Await e Promises:** Para lidar com operações assíncronas, como o carregamento de dados e o término da animação.
  - **Manipulação do DOM:** Para criar e exibir dinamicamente os cards de conteúdo.
- **HTML Canvas:** Utilizado para renderizar a animação "Matrix Digital Rain" em tempo real.

---

## 📂 Estrutura do Projeto

```
base_de_conhecimento/
├── 📄 index.html         # Arquivo principal da estrutura da página
├── 🎨 style.css           # Folha de estilos para toda a aplicação
├── 📜 script.js           # Lógica principal: busca e renderização dos cards
├── 🎬 matrix-animation.js # Módulo JS dedicado à animação de introdução
├── 📊 data.json           # Arquivo com os dados das linguagens de programação
└── 🖼️ *.png               # Imagens e ícones utilizados
```

- **`index.html`**: Contém a estrutura básica da página, incluindo o elemento `<canvas>` para a animação e o contêiner onde os cards são inseridos. Importa o `script.js` como um módulo.
- **`style.css`**: Define a aparência de todos os elementos, o layout responsivo e os estilos da animação (como o efeito de fade-out).
- **`matrix-animation.js`**: Exporta uma função `startMatrixIntro` que desenha a animação no canvas. Ela retorna uma `Promise` que é resolvida ao final da animação, além de parar o loop de renderização para otimizar o desempenho.
- **`script.js`**: Orquestra a aplicação. Ele importa e executa a animação de introdução e, após sua conclusão, chama a função para carregar os dados do `data.json` e exibi-los na tela. Também contém a lógica para a funcionalidade de busca.
- **`data.json`**: Funciona como um pequeno banco de dados, armazenando os objetos de cada linguagem de programação em um formato estruturado.

---

## ⚙️ Como Funciona

1.  **Inicialização:** Quando o usuário abre o `index.html`, o `script.js` é carregado.
2.  **Animação de Intro:** A função `main()` no `script.js` chama `startMatrixIntro()` do módulo de animação. A tela é preenchida com a animação "Digital Rain".
3.  **Transição:** Após 3 segundos, a animação é interrompida (para economizar recursos do navegador) e o canvas desaparece com um efeito de fade-out. A `Promise` da animação é resolvida.
4.  **Carregamento de Conteúdo:** Usando `await`, o script espera a `Promise` ser resolvida e só então chama a função `carregarDados()`.
5.  **Renderização:** `carregarDados()` lê o `data.json`, cria o HTML para cada card de linguagem e insere todo o conteúdo de uma só vez no `main` da página.
6.  **Interação do Usuário:** O usuário pode agora ver todos os cards ou usar a barra de busca para encontrar uma linguagem específica. O script filtra os dados já carregados e atualiza a tela com os resultados.

---

_Projeto desenvolvido como parte de estudos em desenvolvimento web front-end._
