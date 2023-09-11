//Com node instalado e com terminal na pasta desse arquivo, rode: node jokenpô.js

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let pontuacaoJogador = 0;

function escolherJogadaJogador() {
  return new Promise((resolve) => {
    rl.question(
      "Escolha sua jogada:\n1 - Pedra\n2 - Papel\n3 - Tesoura\n4 - Lagarto\n5 - Spock\n",
      (escolha) => {
        escolha = parseInt(escolha);
        if (escolha >= 1 && escolha <= 5) {
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
  return Math.floor(Math.random() * 5) + 1;
}

function nomeDaEscolha(escolha) {
  switch (escolha) {
    case 1:
      return "Pedra";
    case 2:
      return "Papel";
    case 3:
      return "Tesoura";
    case 4:
      return "Lagarto";
    case 5:
      return "Spock";
    default:
      return "Inválida";
  }
}

function determinarVencedor(escolhaJogador, escolhaComputador) {
  if (escolhaJogador === escolhaComputador) {
    return "Empate";
  } else if (
    (escolhaJogador === 1 &&
      (escolhaComputador === 3 || escolhaComputador === 4)) ||
    (escolhaJogador === 2 &&
      (escolhaComputador === 1 || escolhaComputador === 5)) ||
    (escolhaJogador === 3 &&
      (escolhaComputador === 2 || escolhaComputador === 4)) ||
    (escolhaJogador === 4 &&
      (escolhaComputador === 2 || escolhaComputador === 5)) ||
    (escolhaJogador === 5 &&
      (escolhaComputador === 1 || escolhaComputador === 3))
  ) {
    return "Você ganhou!";
  } else {
    return "Você perdeu!";
  }
}

async function jogarJokenpo() {
  console.log("Bem-vindo ao jogo Pedra-papel-tesoura-lagarto-Spock!");
  console.log("      _______");
  console.log("  ---'   ____)");
  console.log("        (_____)");
  console.log("        (_____)");
  console.log("        (____)");
  console.log("  ---.__(___)\n");
  console.log("Jogue até perder para o computador ou ctrl+c para sair\n");
  console.log("Regras:");
  console.log("Tesoura corta papel");
  console.log("Papel cobre pedra");
  console.log("Pedra esmaga lagarto");
  console.log("Lagarto envenena Spock");
  console.log("Spock esmaga (ou derrete) tesoura");
  console.log("Tesoura decapita lagarto");
  console.log("Lagarto come papel");
  console.log("Papel refuta Spock");
  console.log("Spock vaporiza pedra");
  console.log("Pedra amassa tesoura\n");

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
  rl.close();
}

jogarJokenpo();
