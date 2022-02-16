let board = document.getElementById("board");
let condition = document.getElementById("condition");
let arrayCombi = []; // tableau qui va stocker les combinaisons
let arrayPosition = [] // tableau qui va stocker les positions
let lap = 1; // nombre de tour
let timer;
let sec = document.getElementById("time").value;
let arraySymbol = [];
let fullCase = [];
let audio = new Audio("Assets/audio/pika.mp3")

function timers() {
        if (timer) {
                clearInterval(timer);
              }
        timer = setInterval(function () {

                document.getElementById('safeTimerDisplay').innerHTML = sec;
                document.getElementById('safeTimerDisplay').style.color = 'black';
                sec--;
                if (sec < 60 && sec >= 10) {
                        document.getElementById('safeTimerDisplay').innerHTML = '00:' + sec;
                }
                if (sec < 10) {
                        document.getElementById('safeTimerDisplay').innerHTML = '00:0' + sec;
                        document.getElementById('safeTimerDisplay').style.color = 'red';
                }
                if (sec <= 0) {
                        clearInterval(timer);
                        document.getElementById('safeTimerDisplay').innerHTML = '00:00';
                        
                        if(fullCase.length < nb_row.value * nb_col.value ){
                                condition.innerHTML = 'Game Over';                        }
                }
                
        }, 1000);
}


function image(nb_col, nb_row){
        
        let size = nb_row * nb_col;
        for (let i = 1; i <= (nb_col * nb_row / 2); i++) {
                arraySymbol.push(`Assets/pictures/${i}.png`);
                arraySymbol.push(`Assets/pictures/${i}.png`);
        }  
        return size
}

function Nombre_Colonne() {
        
        board.innerHTML = '';
        plays_grid = [];
        let nb_row = document.getElementById('nb_row').value;// nombre de lignes
        let nb_col = document.getElementById('nb_col').value;// nombre de colonnes
        
        let size = image(nb_col, nb_row);

        if (size % 2 !== 0) { // si c'est un nombre impair, ca ne marche pas
                alert('Le nombre de cases n\'est pas paire !');
        } else {
                for (let x = 0; x < nb_col; x++) {
                        const tr_element = document.createElement('tr'); // créé des tr 
                        for (let y = 0; y < nb_row; y++) {
                                let numTemp = random(0, arraySymbol.length - 1);
                                const td_element = document.createElement('td'); // créé des td
                                tr_element.appendChild(td_element); // dit que les td créés se place dans les tr
                                const img = document.createElement('img'); // creer des span
                                td_element.appendChild(img); // dit que les span créés se place dans les td
                                td_element.className = 'board-cell'; // créé une classe css de nom board-cell
                                img.src = arraySymbol[numTemp];
                                img.hidden = true;
                                arraySymbol.splice(numTemp, 1);
                                
                                td_element.addEventListener('click', function () { // fonction click
                                        
                                        if (sec > 0) {
                                                
                                                if (img.hidden) {
                                                        arrayPosition.push(this)
                                                        
                                                        img.hidden = false;
                                                        arrayCombi.push(img.src)
                                                        lap++;
                                                        if (lap % 2 != 0 && arrayCombi[0] != arrayCombi[1]) {
                                                                setTimeout(() => {// appelle ma fonction avec un delai de 1sec
                                                                        arrayCombi.splice(0, 2);
                                                                        arrayPosition[0].firstChild.hidden = true;
                                                                        arrayPosition[1].firstChild.hidden = true;
                                                                        arrayPosition.splice(0, 2);
                                                                }, 1000);
                                                        } else if (lap % 2 != 0 && arrayCombi[0] === arrayCombi[1]) {
                                                                arrayPosition[0].style.background = 'teal';
                                                                arrayPosition[1].style.background = 'teal';
                                                                fullCase.push(1)
                                                                fullCase.push(1)
                                                                console.log(fullCase)
                                                                arrayCombi.splice(0, 2);
                                                                arrayPosition.splice(0, 2);
                                                                sec += 10
                                                        }
                                                }
                                        }
                                      victory(nb_col, nb_row)     
                                });
                                
                                tr_element.appendChild(td_element);
                        }
                        
                        board.appendChild(tr_element);
                }
                
        }
}

function reset(elem) {
        Nombre_Colonne();
        timers();
        elem.innerHTML = "Reset";
        arrayCombi.splice(0, 2);
        arrayPosition.splice(0, 2);
        sec = document.getElementById("time").value;
        fullCase = []
}

function victory(a, b) {
        if(fullCase.length === a * b && sec > 0){
                condition.innerHTML = 'Congratulation';
                audio.play()
                clearInterval(timer);
        }
}

function random(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
}


