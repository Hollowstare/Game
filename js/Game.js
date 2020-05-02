"use strict";

let gamePiece;
let spaceY;
let spaceX;
let time = 0;
let clicks = 0;
let check;
let flag = false;

window.onload = function main() {
    setTimeout(forGame, 500);
    let counter = document.getElementById('counter');
    
    gamePiece = GameArea.getElementsByClassName("piece");

    for (let i = 0; i < gamePiece.length; i++){ 

        gamePiece[i].style.left = (i % 4 * 100) + 'px'; 

        gamePiece[i].style.top = (parseInt(i / 4) * 100) + 'px'; 

        gamePiece[i].onclick = function move(){ 
                    
            if(flag) {
          
            if (checkMove(parseInt(this.innerHTML))){
                clicks++;
                document.getElementById("counter").innerHTML = clicks;
                swap(this.innerHTML - 1); 

                
                if (finish()){ 
                    setTimeout(win,700) 
                }
            }
          } else {
              alert("Хитрец, сначала нажми кнопку 'перемешать'!");
          }
        }
    }
   

    let shuffle = document.getElementById('shuffleButton'); 

    spaceX = '300px';
    spaceY = '300px';

    shuffle.onclick = function shuffle(){ 
        check = true;
        setInterval(timer,1000);
        flag = true;
        document.getElementById("counter").innerHTML = 0;
        clicks = 0;
        time = 0;
        for (let i = 0; i < 400; i++) {

            let rand = parseInt(Math.random() * 100) % 4;

            if (rand == 0) {
                let temp = up(spaceX, spaceY);

                if (temp != -1){
                    swap(temp);
                }
            }

            if (rand == 1) {
                let temp = down(spaceX, spaceY);

                if (temp != -1){
                    swap(temp);
                }
            }

            if (rand == 2) {
                let temp = left(spaceX, spaceY);

                if (temp != -1){
                    swap(temp);
                }
            }


            if (rand == 3) {
                let temp = right(spaceX, spaceY);

                if (temp != -1){
                    swap(temp);
                }
            }
        }
    }
}

function forGame() {
    alert('Для начала игры нажмите кнопку "перемешать"');
}

function checkMove(position) 

{
    
    if (right(spaceX, spaceY) == (position - 1)){
        return true;
    }

    if (up(spaceX, spaceY) == (position - 1)) {
        return true;
    }

    if (down(spaceX, spaceY) == (position - 1)) {
        return true;
    }

    if (left(spaceX, spaceY) == (position - 1)) {
        return true;
    }
    
}



function win(){ 
alert('Поздравляем, вы великолепны! (нет)'); 
        alert('Кликов сделано: ' + clicks + '\nСекунд потрачено: ' + time);
        flag = false;
        clicks = 0;
        time = 0;
        check = false;
}


function finish(){ //checks when the game reaches its end

    let flag = true;

    for (let i = 0; i < gamePiece.length; i++){ 
        
        let top = parseInt(gamePiece[i].style.top);
        let left = parseInt(gamePiece[i].style.left);


        if (left != (i % 4 * 100) || top != parseInt(i / 4) * 100){ 
            flag = false;
            break;
        }
    }

    return flag;

}



function right(x, y) 

{

    let cordX = parseInt(x);
    let cordY = parseInt(y);

    if (cordX > 0) {

        for (let i = 0; i < gamePiece.length; i++){

            if (parseInt(gamePiece[i].style.left) + 100 == cordX && parseInt(gamePiece[i].style.top) == cordY) {
                return i;
            }
        }
    } else {
        return -1;
    }
}



function left(x, y) 
{
    let cordX = parseInt(x);
    let cordY = parseInt(y);

    if (cordX < 300) {
        
        for (let i = 0; i < gamePiece.length; i++) {

            if (parseInt(gamePiece[i].style.left) - 100 == cordX && parseInt(gamePiece[i].style.top) == cordY) {
                return i;
            }
        }
    } else {
        return -1;
    }
}


function down(x, y) 
{
    let cordX = parseInt(x);
    let cordY = parseInt(y);

    if (cordY > 0) {
        
        for (let i = 0; i < gamePiece.length; i++) {
            
            if (parseInt(gamePiece[i].style.top) + 100 == cordY && parseInt(gamePiece[i].style.left) == cordX) {
                return i;
            }
        } 
    } else {
        return -1;

    }

}



function up(x, y) 

{
    let cordX = parseInt(x);
    let cordY = parseInt(y);
    if (cordY < 300) {
        for (let i = 0; i < gamePiece.length; i++) {
            if (parseInt(gamePiece[i].style.top) - 100 == cordY && parseInt(gamePiece[i].style.left) == cordX)

            {
                return i;
            }
        }
    } else {
        return -1;
    }
}

function swap(position){ 
    let temp = gamePiece[position].style.top;

    gamePiece[position].style.top = spaceY;
    spaceY = temp;
    temp = gamePiece[position].style.left;
    gamePiece[position].style.left = spaceX;
    spaceX = temp;
}

function timer() {
    if(check === true) {
    time += 1;
    document.getElementById('timer').innerHTML = time;
    } else {
        return;
    }
}