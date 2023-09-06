// Variáveis para manipular o DOM do HTML
const customName = document.getElementById("customname");
const randomize = document.querySelector(".randomize");
const story = document.querySelector(".story");

// Função para selecionar aleatoriamente um elemento de um array
function randomValueFromArray(array) {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}

// Função para gerar temperatura com base no idioma
function generateTemperature(isBR) {
  const minTemp = isBR ? 10 : 50;
  const maxTemp = isBR ? 40 : 104;
  return Math.floor(Math.random() * (maxTemp - minTemp + 1)) + minTemp;
}

// Função para gerar largura com base no idioma
function generateWidth(isBR) {
  const minWidth = 10;
  const maxWidth = isBR ? 100 : 40;
  return Math.floor(Math.random() * (maxWidth - minWidth + 1)) + minWidth;
}

// Função para substituir placeholders em uma história
function replacePlaceholders(story, replacements) {
  for (const [placeholder, replacement] of replacements) {
    story = story.replace(placeholder, replacement);
  }
  return story;
}

// História em PT-BR
const storyTextBR =
  ":nome: quando chegou na floresta Amazônica fazia :temperatura:, lá descobriu grandes histórias místicas sobre o(a), :personagem:. É uma lenda das tribos que falam a língua :lingua: e retrata :conceito:. Dizem que tem a largura de :largura:. Fim!";

// História em EN-US
const storyTextUS =
  ":nome: when arrived in the Amazon Rainforest, it was :temperatura:. There, they discovered great mystical stories about the :personagem:. It's a legend of the tribes that speak the language :lingua: and portrays :conceito:. They say it has a width of :largura:. The end!";

// Listas de variáveis aleatórias que são incrementadas no texto
const personagensAmazonicos = ["Matinta Pereira", "Uirapuru", "Curupira"];
const linguas = ["Tupi Guarani", "Tikúna", "Yanomami"];
const conceitosBR = [
  "o guardião das árvores, possui cabelos de fogo e pés virados para trás",
  "uma ave assustadora e solta gritos assombrosos, ela protege os segredos da floresta",
  "um pássaro mágico da Amazônia conhecido por seu canto encantador, aqueles que ouvem seu canto são abençoados com boa sorte e amor verdadeiro",
];
const conceitosUS = [
  "the guardian of the trees, has fiery hair and feet turned backward",
  "a frightening bird that releases haunting screams, it protects the secrets of the forest",
  "a magical bird of the Amazon known for its enchanting song, those who hear its song are blessed with good luck and true love",
];

randomize.addEventListener("click", resultado);

function generateStory(isBR) {
  const personagem = randomValueFromArray(personagensAmazonicos);
  const lingua = randomValueFromArray(linguas);
  const conceito = isBR
    ? randomValueFromArray(conceitosBR)
    : randomValueFromArray(conceitosUS);

  let novaHistoria = isBR ? storyTextBR : storyTextUS;

  const nome = customName.value || "João";
  const temperatura = generateTemperature(isBR);
  const largura = generateWidth(isBR);

  const replacements = [
    [":personagem:", personagem],
    [":lingua:", lingua],
    [":conceito:", conceito],
    [":nome:", nome],
    [":temperatura:", `${temperatura}${isBR ? "°C" : "°F"}`],
    [":largura:", `${largura}${isBR ? " cm" : " inches"}`],
  ];

  novaHistoria = replacePlaceholders(novaHistoria, replacements);

  return novaHistoria;
}

function resultado() {
  const isBR = document.getElementById("br").checked;
  const novaHistoria = generateStory(isBR);

  story.textContent = novaHistoria;
  story.style.visibility = "visible";
}
