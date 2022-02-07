//variaveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raquetecomplimento = 10;
let raquetealtura = 90;
let colidiu = false;

//variaveis da raquete2 do adversário
let xRaquete2 = 585;
let yRaquete2 = 150;
let velocidadey2;

//placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

//variaveis da Bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 13;
let raio =diametro / 2;

//Velocidade da Bolinha
let velocidadeXBolinha = 5;
let velocidadeYBolinha = 5;

//sons do Jogo
let raquetada;
let ponto;
let trilha;

//chances de erra
let chanceDeErrar = 0;


function preload (){
    trilha = loadSound("trilha.mp3");
    ponto = loadSound("ponto.mp3");
    raquetada = loadSound("raquetada.mp3");
}
function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaborda();
  mostraraquete(xRaquete,yRaquete);
  mostraraquete(xRaquete2,yRaquete2);
  movimentaraquete();
  
  //colisaocomraquete();
  colisaoMinhaRaquete(xRaquete, yRaquete);
  colisaoMinhaRaquete(xRaquete2, yRaquete2);
  movimentaraquete2();
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha(){
  circle (xBolinha, yBolinha, diametro);  
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaborda(){
   if (xBolinha + raio > width || 
      xBolinha - raio < 0){
      velocidadeXBolinha *= -1;
         }
   if (yBolinha + raio > height || 
      yBolinha - raio < 0){
      velocidadeYBolinha *= -1;
    
    }
}

function mostraraquete(x,y){
  rect(x, y, raquetecomplimento, raquetealtura);
  }


function movimentaraquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;}
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
  
}

function colisaocomraquete(){
  if (xBolinha - raio < xRaquete + raquetecomplimento && yBolinha - raio < yRaquete +raquetealtura && yBolinha + raio > yRaquete){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function colisaoMinhaRaquete(x,y){
  colidiu = 
  collideRectCircle(x, y, raquetecomplimento, raquetealtura, xBolinha, yBolinha, raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
  }

function colisaoMinhaRaquete2(){
  colidiu = 
  collideRectCircle(xRaquete2, yRaquete2, raquetecomplimento, raquetealtura, xBolinha, yBolinha, raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
  }
  }

function movimentaraquete2(){
  velocidadey2 = yBolinha - yRaquete2 - raquetecomplimento / 2 - 30
  yRaquete2 += velocidadey2 + chanceDeErrar
  calculaChanceDeErrar()
}

function incluiPlacar(){
  stroke(255),
  textSize(16);
  textAlign(CENTER);
  fill (color (255, 140, 0));
  rect (150, 10, 40, 20),
  fill (255);
  text (meusPontos, 170, 26);
  fill (color (255, 140, 0));
  rect (450, 10, 40, 20),
  fill (255);
  text (pontosOponente, 470, 26);
}
function marcaPonto(){
  if (xBolinha > 590){
    meusPontos += 1;
    ponto.play();
    }
     if (xBolinha < 10){
    pontosOponente += 1;
       ponto.play();
  }}

function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}