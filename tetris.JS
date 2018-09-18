'use strict';
const canvas = document.getElementById("tetris");
var ctx = canvas.getContext('2d');
ctx.scale(1,1);
ctx.lineWidth="20";
ctx.rect(0,0,420,820);
ctx.stroke();



var x = 130;
var y = -30;
var score = 0;
document.getElementById("result").innerHTML = "Score: " + score;

const pickColor = [
  ["#3399ff"],
  ["#0000cc"],
  ["#ff9933"],
  ["#ffff40"],
  ["#00e600"],
  ["#cc3399"],
  ["#ff0000"]
];

const pieces = [
    [
      [0,1,0,0],
      [0,1,0,0],
      [0,1,0,0],
      [0,1,0,0]
    ],
    [
      [1,0,0],
      [1,1,1],
      [0,0,0]
    ],
    [
      [0,0,1],
      [1,1,1],
      [0,0,0]
    ],
    [
      [1,1,0],
      [1,1,0],
      [0,0,0]
    ],
    [
      [0,1,1],
      [1,1,0],
      [0,0,0]
    ],
    [
      [0,1,0],
      [1,1,1],
      [0,0,0]
    ],
    [
      [1,1,0],
      [0,1,1],
      [0,0,0]
    ]
]

let test2 = Math.floor(Math.random()*pieces.length);

let newArray = pieces[test2];
var currentColor = pickColor[test2];


function erace(array, x, y) {
  for (var j=0; j < array.length; j++){
    for (var k=0; k < array[j].length;k++){
        if (array[j][k] == 1){
          ctx.fillStyle="white";
          ctx.fillRect(x, y, 40, 40);
        }
        x = x + 40;
        }
        y = y + 40;
        x -= (array.length)*40;
    }

}
function draw(array, x, y) {
  for (var j=0; j < array.length; j++){
    for (var k=0; k < array[j].length;k++){
        if (array[j][k] == 1){
          ctx.fillStyle= currentColor;
          ctx.fillRect(x, y, 40, 40);
        }
        x = x + 40;
        }
        y = y + 40;
        x -= (array.length)*40;
    }
}


var check = function(){

  if(checkCollisionBelow2(newArray) == true && y == 10) {

  } else if(checkCollisionBelow2(newArray) == true){
    checkCompletedRow();
    y = -30;
    x = 130;
    newPiece();
    check();
  }  else {setTimeout(check, 300)
    anotherOne();
  }
}
function newPiece(){
  let test = Math.floor(Math.random()*pieces.length);
  newArray = pieces[test];
  currentColor = pickColor[test];
}
document.getElementById("button").addEventListener("click", function(){

  check();
})

function anotherOne(){
  erace(newArray,x,y);
  y += 40;
  draw(newArray,x,y);
  ctx.rect(0,0,420,820);
  ctx.stroke();
  }

document.addEventListener('keypress', function (event){
  if (event.key == "ArrowRight" && collisionLR(newArray,true) == false){
      erace(newArray,x,y);
      x += 40;
      draw(newArray,x,y);
  } else if (event.key == "ArrowLeft" && collisionLR(newArray,false) == false) {
      erace(newArray,x,y);
      x -= 40;
      draw(newArray,x,y);
  } else if (event.key == "ArrowUp"){

    let testing = rotate(newArray)
    erace(newArray,x,y)

    if (collision(testing)){
        draw(newArray,x,y)
    } else {
      newArray = testing;
      draw(testing,x,y);
    }

  } else if (event.key == "ArrowDown" && checkCollisionBelow2(newArray,x,y)==false) {
    erace(newArray,x,y);
    y += 40;
    draw(newArray,x,y);
  }
})


function checkCollisionBelow2 (arr){
  let collision = false;

  let niceArray = [];
  for (let i = 0; i < arr.length ; i++){
    niceArray.push([new Array(arr.length)]);
  }

  for (let i = 0; i < niceArray.length; i++){
    for (let j = niceArray.length-1; j > -1; j--){
      niceArray[j][i] = arr[j][i]
      if (arr[j][i] == 1) { break; }
    }
  }

  for ( let i = 0; i < niceArray.length; i++){
    for (let j = 0; j < niceArray.length;j++){
      if (niceArray[i][j] == 1){
        let test = ctx.getImageData(x + 40*j, y + 40*i+41, 1, 1);
          if (test.data != "255,255,255,255" && test.data != "0,0,0,0"){
            collision = true;

          }
      }
    }
  }
  return collision;
}

function collisionLR(arr, bool){

  let collision = false;


  let niceArray = [];
  for (let i = 0; i < arr.length ; i++){
    niceArray.push([new Array(arr.length)]);
  }

    if (bool){
      for (let i = 0; i < niceArray.length; i++){
        for (let j = niceArray.length-1; j > -1; j--){
          niceArray[i][j] = arr[i][j]
          if (arr[i][j] == 1) { break; }
        }
      }
      for ( let i = 0; i < niceArray.length; i++){
        for (let j = 0; j < niceArray.length;j++){
          if (niceArray[i][j] == 1){
            let test = ctx.getImageData(x + 40*j +41, y + 40*i, 1, 1  );
              if (test.data != "255,255,255,255" && test.data != "0,0,0,0"){
                collision = true;
              }
          }
        }
      }
    } else {
      for (let i = 0; i < niceArray.length; i++){
        for (let j = 0; j < niceArray.length; j++){
          niceArray[i][j] = arr[i][j]
          if (arr[i][j] == 1) { break; }
        }
      }
      for ( let i = 0; i < niceArray.length; i++){
        for (let j = 0; j < niceArray.length;j++){
          if (niceArray[i][j] == 1){
            let test = ctx.getImageData(x + 40*j -1, y + 40*i, 1, 1);
              if (test.data != "255,255,255,255" && test.data != "0,0,0,0"){
                collision = true;
              }
          }
        }
      }
    }
return collision;
  }


function rotate(matrix) {

let niceArray = JSON.parse(JSON.stringify(matrix));

  niceArray = niceArray.reverse();

  for (var i = 0; i < niceArray.length; i++) {
    for (var j = 0; j < i; j++) {
      var temp = niceArray[i][j];
      niceArray[i][j] = niceArray[j][i];
      niceArray[j][i] = temp;
    }
  }
  return niceArray
}

function collision(mat){

  let collision = false;
  if (x < 10){
    collision = true;
  }

  for ( let i = 0; i < mat.length; i++){
    for ( let j = 0; j < mat.length; j++){
      if (mat[i][j] == 1){
        let test = ctx.getImageData(x + 40*j +40, y + 40*i, 1, 1);
          if (test.data != "255,255,255,255" && test.data != "0,0,0,0"){
            collision = true;
          }
      }
    }
  }

  return collision;
}




function checkCompletedRow() {

  var rows = {};
  for (let i=10; i < 800; i = i + 40){
    rows[""+ i +""] = 0;
  }

  for (let i=10; i < 800; i+= 40){
    for (let j=10; j < 400; j+=40){
      let test = ctx.getImageData(j, i, 1, 1);
        if (test.data == "255,255,255,255" || test.data == "0,0,0,0"){
          break;
        } else {
          rows[""+ i +""] = rows[""+ i + ""] + 1;
        }
    }
  }
  let test2 = []
  for (let i = 10; i <800; i+=40){
    if (rows[i] == 10){
      test2.push(i);
      score += 100;
      document.getElementById("result").innerHTML = "Score: " + score;
      ctx.fillStyle="white";
      ctx.fillRect(10, i, 400, 40);
    }
  }
  for (let i= 0; i < test2.length; i++){
    var imgData=ctx.getImageData(10,10,400,test2[i]-10);
    ctx.putImageData(imgData,10,50);
  }
}
