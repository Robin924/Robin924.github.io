/*var canvas = document.getElementById('robinSpace');
var ctx = canvas.getContext("2d");
ctx.fillText("helloworld",10,150);*/

//PIG VS Alien
//Pig must hit the red circle (button) to escape from alien//
//Once the pig hit the red circle it escape and wins.



var score = 0,ascore = 0,Alien=false
var player = {
    x:40,
    y:50,
    pigmouth:50,
    pigdir:45,
    speed:5



}
var enemy = {
    x:80,
    y:60,
    alienNum:-55,
    speed:5,
    moving: 0,
    dirx: 0,
    diry: 0

}
var powerdot = {
    x:0,
    y:0,
    powerup: false,
    pcountdown:0,
    alienNum:0
}



var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
canvas.height = 400;
canvas.width = 600;
//document.body.appendChild(canvas);
//ctx.fillText("helloworld",10,150);
mainImage = new Image();
mainImage.ready = false;
mainImage.onload = checkReady;
mainImage.src ="wtfman1.png";

var keyclick = {};
document.addEventListener("keydown", function (event){
      keyclick[event.keyCode]=true;
      move(keyclick);
},false);
document.addEventListener("keyup", function (event){
      delete keyclick[event.keyCode];
},false);
//when touch on keyboard you see click on console


function move(keyclick){
    if(37 in keyclick){player.x -= player.speed;player.pigdir=45;}
    if(38 in keyclick){player.y -= player.speed;player.pigdir=45;}
    if(39 in keyclick){player.x += player.speed;player.pigdir=50;}
    if(40 in keyclick){player.y += player.speed;player.pigdir=45;}
    if(player.x >= (canvas.width-45)) {player.x=0;}
    if(player.y >=(canvas.height-45)) {player.y=0;}
    if(player.x < 0){player.x=(canvas.width-45);}
    if(player.y < 0){player.y=(canvas.height-45);}
    //if(player.pigmouth ==50){player.pigmouth =-100;}else{player.pigmouth =50;}
    render();

}

function checkReady (){
  this.ready=true;
      playgame();
}

function playgame(){
    render();
    //score++;
    //console.log();
    requestAnimationFrame(playgame);
}

function myNum(n){
    return Math.floor(Math.random() *n);
}



function render(){
    context.fillStyle = "black";
    context.fillRect(0,0,canvas.width,canvas.height)

    if(!powerdot.powerup) {
        powerdot.x = myNum(420)+30;
        powerdot.y = myNum(250);
        powerdot.powerup = true;
    }

    if(!Alien){
        enemy.ghostNum = myNum(5)*10;
        enemy.x = myNum(450);
        enemy.y = myNum(250)+30;
        Alien = true;

    }
    if (enemy.moving <0){
          enemy.moving = (myNum(30)*3)+myNum(1);
          enemy.speed = myNum(3)+1;
          enemy.dirx = 0;
          enemy.diry = 0;
          if(enemy.moving % 2){
              if(player.x < enemy.x){enemy.dirx = -enemy.speed;}else{enemy.dirx = enemy.speed;}
          }else{
            if(player.y < enemy.y){enemy.diry = -enemy.speed;}else{enemy.diry = enemy.speed;}
          }
    }

    enemy.moving--;
    enemy.x = enemy.x + enemy.dirx;
    enemy.y = enemy.y + enemy.diry;

    if(enemy.x >= (canvas.width-45)) {enemy.x=0;}
    if(enemy.y >=(canvas.height-45)) {enemy.y=0;}
    if(enemy.x < 0){enemy.x=(canvas.width-45);}
    if(enemy.y < 0){enemy.y=(canvas.height-45);}

    //Collision detection
    if(player.x <= powerdot.x && powerdot.x <= (player.x+32) && player.y <= powerdot.y && powerdot.y <=
    (player.y +32)){
      console.log('hit');
      powerdot.poweup=false;
        powerdot.pcountdown=500;
        powerdot.alienNum = enemy.alienNum;
        enemy.alienNum = 384;
        powerdot.x=0;
        powerdot.x=0;
    }



  if(powerdot.powerup) {
        context.fillStyle ="#FF0000";
        context.beginPath();
        context.arc( powerdot.x, powerdot.y, 10,0, Math.PI*2,true);
        context.closePath();
        context.fill();
    }


    context.font ="20px Verdana";
    context.fillStyle ="white";
    context.fillText("Pig:"+score+" vs Alien:"+ascore,2,18);

    context.drawImage(mainImage, enemy.alienNum,-80,104,124,enemy.x,enemy.y,132,132);
    context.drawImage(mainImage, player.pigmouth,player.pigdir,104,120,player.x,player.y,132,132);
}

//context.drawImage(mainImage, 50, 45,104,120,40,50,132,132); Pig
//first four is image source last four is image destination
//X,Y,W(image)420,H(image)420 ,X top left corner of rect source of image,
//fillRect(X,Y,width,height)
document.body.appendChild(canvas);
context.fillText("helloworld",10,150);
