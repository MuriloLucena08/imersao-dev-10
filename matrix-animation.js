/**
 * Inicia a animação de introdução Matrix e retorna uma promessa
 * que é resolvida quando a animação termina.
 * @param {number} duration - A duração da animação em milissegundos.
 * @returns {Promise<void>}
 */
export function startMatrixIntro(duration = 3000) {
  return new Promise((resolve) => {
    const canvas = document.getElementById("matrix-canvas");
    if (!canvas) {
      console.error("Elemento canvas #matrix-canvas não encontrado.");
      resolve(); // Resolve a promessa para não travar a execução
      return;
    }

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const alphabet =
      "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const fontSize = 16;
    const columns = canvas.width / fontSize;

    const rainDrops = [];
    for (let x = 0; x < columns; x++) {
      rainDrops[x] = 1;
    }

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#0F0";
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(
          Math.floor(Math.random() * alphabet.length)
        );
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };

    const animationInterval = setInterval(draw, 33);

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    setTimeout(() => {
      clearInterval(animationInterval); // Para a animação para economizar recursos
      canvas.classList.add("hidden");
      resolve(); // Avisa que a animação terminou
    }, duration);
  });
}
