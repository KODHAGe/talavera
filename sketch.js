/* eslint-disable no-undef, no-unused-vars */

let tileWidth = 250;
let tileHeight = 250;
let divide;
let palette_old = [
  "#FFE19D",
  "#FFAD9A",
  "#FF5F3B",
  "#FFBC1F",
  "#A31E00",
  "#3F1C12",
  "#B1F2B8",
  "#1D956F",
  "#D03926",
  "#BBC9FE",
  "#4F74FC",
  "#03218F"
];

let palette = [
  "#FEE2A7",
  "#ffad9a",
  "#f44017",
  "#ffbc1f",
  "#A31E00",
  "#3F1C12",
  "#9dff94",
  "#23e21e",
  "#003926",
  "#a8ffff",
  "#13b6cb",
  "#05333f"
];

let tileset = [];
let tileamt;
let ornamt;
let imgs = [];
let img;
let insideMargin = 2;
function preload() {
  imgs.push(loadImage("./img/laatta_hiutale.png"));
  imgs.push(loadImage("./img/laatta_kukka.png"));
  imgs.push(loadImage("./img/laatta_kuusi.png"));
  imgs.push(loadImage("./img/laatta_kynttila.png"));
  imgs.push(loadImage("./img/laatta_paketti.png"));
  imgs.push(loadImage("./img/laatta_pallo.png"));
  imgs.push(loadImage("./img/laatta_pipari.png"));
  imgs.push(loadImage("./img/laatta_tahti.png"));
  imgs.push(loadImage("./img/laatta_tonttulakki.png"));
  imgs.push(loadImage("./img/laatta_torttu.png"));
  imgs.push(loadImage("./img/laatta_vihreakuula.png"));
}

function setup() {
  tileamt = 42;
  divide = 4;
  ornamt = 16;
  createCanvas(windowWidth, windowWidth * (tileamt / divide / divide));
  rectMode(CENTER);
  angleMode(DEGREES);
  ellipseMode(CENTER);
  imageMode(CENTER);
  tileWidth = windowWidth / divide;
  tileHeight = windowWidth / divide;
  tileset = generateTileset(45);
}

function draw() {
  drawTileset(tileset);
}

windowResized = function () {
  resizeCanvas(windowWidth, windowHeight);
};

function drawCirclesInCircle(
  circle,
  radius,
  frequency,
  color,
  thickness,
  fillColor,
  reccc
) {
  if (fillColor === false) {
    noFill();
  } else {
    fill(color);
  }
  stroke(color);
  strokeWeight(thickness);
  for (let angle = 0; angle < 360; angle++) {
    if (angle % frequency === 0) {
      if (reccc === 0) {
        ellipse(radius * sin(angle), radius * cos(angle), circle);
      } else {
        rect(radius * sin(angle), radius * cos(angle), circle);
      }
    }
  }
}

function randomColor() {
  return palette[int(random(0, palette.length))];
}

function randomOrnament(n) {
  let ornament = [];
  for (let i = 0; i < n; i++) {
    ornament.push([
      tileWidth / random(2, 64),
      tileWidth / random(2.2, 64),
      int(random(12, 32)),
      randomColor(),
      tileWidth / random(30, 120),
      int(random(0, 3)) > 1 ? randomColor() : false
    ]);
  }
  return ornament;
}

function drawTile(bg, orno, reccc) {
  fill(bg);
  noStroke();
  rect(tileWidth / 2, tileHeight / 2, tileWidth, tileHeight);

  if (orno[0][5]) {
    stroke(orno[0][5]);
    strokeWeight(tileWidth / 64);
    rect(tileWidth / 2, tileHeight / 2, tileWidth - 16, tileHeight - 16);
    rect(tileWidth / 2, tileHeight / 2, tileWidth - 20, tileHeight - 20);
  }

  noStroke();

  translate(tileWidth / 2, tileHeight / 2);
  orno.forEach((element) => {
    drawCirclesInCircle(...element, reccc);
  });
  translate(-(tileWidth / 2), -(tileHeight / 2));
}

function drawBorder() {
  noFill();
  strokeWeight(tileWidth / 32);
  stroke("rgba(255, 252, 245, 1)");
  line(
    0 + insideMargin,
    0 + insideMargin,
    0 + insideMargin,
    tileHeight - insideMargin
  );
  line(
    0 + insideMargin,
    0 + insideMargin,
    tileWidth - insideMargin,
    0 + insideMargin
  );
  strokeWeight(tileWidth / 32);
  stroke("rgba(102, 99, 92, 1)");
  line(
    tileWidth - insideMargin,
    0 + insideMargin,
    tileWidth - insideMargin,
    tileHeight - insideMargin
  );
  line(
    0 + insideMargin,
    tileHeight - insideMargin,
    tileWidth - insideMargin,
    tileHeight - insideMargin
  );

  stroke("rgba(255, 249, 230, 1)");
  strokeWeight(tileWidth / 42);
  rect(tileWidth / 2, tileHeight / 2, tileWidth, tileHeight);
}

function drawTileset(tileset) {
  for (i = 1; i <= tileset.length; i++) {
    let tile = tileset[i - 1];
    if (i % divide === 0) {
      y = 1;
      x = divide;
    } else {
      y = 0;
      x = 0;
    }
    if (Array.isArray(tile)) {
      drawTile(...tile);
    } else {
      drawImage(tile);
    }
    drawBorder();
    translate(tileWidth - tileWidth * x, tileHeight * y);
  }
}

function generateTileset(n) {
  let tiles = [];
  for (let i = 0; i < n; i++) {
    let tile;
    if (int(random(0, 2)) === 0) {
      tile = [randomColor(), randomOrnament(ornamt), getRect()];
    } else {
      tile = int(random(0, 11));
    }
    tiles.push(tile);
  }
  return tiles;
}

function getRect() {
  return int(random(0, 2));
}

function drawImage(n) {
  return image(imgs[n], tileWidth / 2, tileHeight / 2, tileWidth, tileHeight);
}
