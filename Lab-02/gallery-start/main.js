//Váriaveis para manipular o DOM
const displayedImage = document.querySelector(".displayed-img");
const thumbBar = document.querySelector(".thumb-bar");
const btn = document.querySelector("button");
const overlay = document.querySelector(".overlay");
const body = document.body;
const h1 = document.querySelector("h1");

//Listas arquivos e nomes
const imageNames = ["pic1.jpg", "pic2.jpg", "pic3.jpg", "pic4.jpg", "pic5.jpg"];
const altTexts = [
  "Posando no hall de entrada",
  "Comemorando a vitória",
  "As pessoas importantes",
  "Close para o curso",
  "Canudo na mão",
];

// Função para alternar entre temas claro e escuro
function toggleDarkMode() {
  const isDarkMode = body.classList.toggle("dark-mode");
  const buttonText = isDarkMode ? "Go to lighten" : "Go to darken";
  const overlayColor = isDarkMode ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0)";
  const bgColor = isDarkMode ? "black" : "white";
  const textColor = isDarkMode ? "white" : "black";

  btn.textContent = buttonText;
  overlay.style.backgroundColor = overlayColor;
  body.style.backgroundColor = bgColor;
  h1.style.color = textColor;
}

// Loop através das imagens
for (let i = 0; i < imageNames.length; i++) {
  const newImage = document.createElement("img");
  newImage.src = "images/" + imageNames[i];
  newImage.alt = altTexts[i];
  thumbBar.appendChild(newImage);

  // Adicionando um manipulador onclick a cada imagem em miniatura
  newImage.onclick = function (event) {
    displayedImage.src = event.target.src;
  };
}

// Adicionando um manipulador para o botão escurecer/clarear
btn.onclick = toggleDarkMode;
