//Com node instalado e com o terminal neste diretório digite: node jokenpô.js

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("Bem-vindo ao jogo Jokenpô!");
console.log("      _______");
console.log("  ---'   ____)");
console.log("        (_____)");
console.log("        (_____)");
console.log("        (____)");
console.log("  ---.__(___)");

let pontuacaoJogador = 0;

function escolherJogadaJogador() {
  return new Promise((resolve) => {
    rl.question(
      "Escolha sua jogada:\n1 - Papel\n2 - Pedra\n3 - Tesoura\n",
      (escolha) => {
        escolha = parseInt(escolha);
        if (escolha >= 1 && escolha <= 3) {
          resolve(escolha);
        } else {
          console.log("Jogada inválida. Você perdeu o jogo!");
          resolve(-1); // Indica uma jogada inválida
        }
      }
    );
  });
}

function escolherJogadaComputador() {
  return Math.floor(Math.random() * 3) + 1;
}

function nomeDaEscolha(escolha) {
  switch (escolha) {
    case 1:
      return "Papel";
    case 2:
      return "Pedra";
    case 3:
      return "Tesoura";
    default:
      return "Inválida";
  }
}

function determinarVencedor(escolhaJogador, escolhaComputador) {
  if (escolhaJogador === escolhaComputador) {
    return "Empate";
  } else if (
    (escolhaJogador === 1 && escolhaComputador === 2) ||
    (escolhaJogador === 2 && escolhaComputador === 3) ||
    (escolhaJogador === 3 && escolhaComputador === 1)
  ) {
    return "Você ganhou!";
  } else {
    return "Você perdeu!";
  }
}

async function jogarJokenpo() {
  while (true) {
    const escolhaJogador = await escolherJogadaJogador();

    if (escolhaJogador === -1) {
      break; // Jogo acabou devido a uma jogada inválida
    }

    const escolhaComputador = escolherJogadaComputador();

    console.log(`Você escolheu: ${nomeDaEscolha(escolhaJogador)}`);
    console.log(`O computador escolheu: ${nomeDaEscolha(escolhaComputador)}`);

    const resultado = determinarVencedor(escolhaJogador, escolhaComputador);

    console.log(resultado);

    if (resultado === "Você ganhou!") {
      pontuacaoJogador++;
    } else if (resultado === "Você perdeu!") {
      break; // Jogo acabou porque o jogador perdeu
    }
  }

  console.log(`Pontuação total: ${pontuacaoJogador}`);
}
