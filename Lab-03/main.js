const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);
const colorSelect = document.getElementById("colorSelect");
colorSelect.addEventListener("change", handleColorChange);

function handleColorChange() {
  const selectedColor = colorSelect.value;
  for (let i = 0; i < shapes.length; i++) {
    shapes[i].colorType = selectedColor;
    shapes[i].color = shapes[i].getRandomColor();
  }
}

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

const colors = {
  colored: ["red", "green", "blue", "yellow"],
  red: ["#c64752", "#b23544", "#9e2435", "#8a1227", "#760018"],
  blue: ["#243967", "#3c4f7f", "#536597", "#6b7aae", "#8290c6"],
  green: ["#228433", "#1a7326", "#11621a", "#09510d", "#004000"],
  yellow: ["#ef923c", "#f3ab54", "#f7c46c", "#fbdd83", "#fff69b"],
};

class Shape {
  constructor(x, y, velX, velY, colorType, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.colorType = colorType;
    this.size = size;
    this.color = this.getRandomColor();
  }

  getRandomColor() {
    const colorArray = colors[this.colorType];
    const randomIndex = Math.floor(Math.random() * colorArray.length);
    return colorArray[randomIndex];
  }

  draw() {
    ctx.fillStyle = this.color;
  }

  update() {
    if (this.x + this.size >= width || this.x - this.size <= 0) {
      this.velX = -this.velX;
    }

    if (this.y + this.size >= height || this.y - this.size <= 0) {
      this.velY = -this.velY;
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect(shapes) {
    for (let i = 0; i < shapes.length; i++) {
      const otherShape = shapes[i];

      if (this !== otherShape) {
        const dx = this.x - otherShape.x;
        const dy = this.y - otherShape.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + otherShape.size) {
          const colorArray = colors[this.colorType];
          const currentColor = this.color;
          let nextColor = currentColor;

          while (nextColor === currentColor) {
            const nextIndex = Math.floor(Math.random() * colorArray.length);
            nextColor = colorArray[nextIndex];
          }

          this.color = nextColor;
        }
      }
    }
  }
}

class Circle extends Shape {
  draw() {
    super.draw();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }
}

class Square extends Shape {
  draw() {
    super.draw();
    ctx.fillRect(
      this.x - this.size,
      this.y - this.size,
      this.size * 2,
      this.size * 2
    );
  }
}

class Triangle extends Shape {
  draw() {
    super.draw();
    ctx.beginPath();
    ctx.moveTo(this.x, this.y - this.size);
    ctx.lineTo(this.x - this.size, this.y + this.size);
    ctx.lineTo(this.x + this.size, this.y + this.size);
    ctx.closePath();
    ctx.fill();
  }
}

class Diamond extends Shape {
  draw() {
    super.draw();
    ctx.beginPath();
    ctx.moveTo(this.x, this.y - this.size);
    ctx.lineTo(this.x - this.size, this.y);
    ctx.lineTo(this.x, this.y + this.size);
    ctx.lineTo(this.x + this.size, this.y);
    ctx.closePath();
    ctx.fill();
  }
}

let shapes = [];

while (shapes.length < 30) {
  let size = random(10, 20);
  let x = random(0 + size, width - size);
  let y = random(0 + size, height - size);
  let velX = random(-7, 7);
  let velY = random(-7, 7);

  let shapeType = random(1, 4);
  let colorType = Object.keys(colors)[shapeType - 1];

  let shape;

  if (shapeType === 1) {
    shape = new Circle(x, y, velX, velY, colorType, size);
  } else if (shapeType === 2) {
    shape = new Square(x, y, velX, velY, colorType, size);
  } else if (shapeType === 3) {
    shape = new Triangle(x, y, velX, velY, colorType, size);
  } else if (shapeType === 4) {
    shape = new Diamond(x, y, velX, velY, colorType, size);
  }

  shapes.push(shape);
}

function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < shapes.length; i++) {
    shapes[i].update();
    shapes[i].collisionDetect(shapes);
    shapes[i].draw();
  }

  requestAnimationFrame(loop);
}

loop();