//Globals
const tableBody = document.querySelector('#board > tbody');
const scoreBoard = document.getElementById('score');
const startGameButton = document.getElementById('start-game');
const textStatus = document.getElementById('text-status');

let word;
let gameOver = true;
let tableRow;
let previousRow;
let score = 0;

// Ultilities

const createTableRow = () => {
    previousRow = tableRow;
    const row = document.createElement('tr');
    tableBody.appendChild(row);
    tableRow = row;
    checkWordMatch();
}

const createTableData = (letter) => {
    const td = document.createElement('td');
    td.innerText = letter;
    tableRow.appendChild(td);

}

const deleteTableData = () => {
    tableRow.removeChild(tableRow.lastChild);
}

const changeTableDataBackground = (index, color) => {
    previousRow.children[index].style.backgroundColor = color
} 



// Event listener

const listener = event => {
const isLetter = event.keyCode >= 65 && event.keyCode <=90 ? true : false;
const isWordLengthBelowLimit = tableRow.children.length < 5 ? true : false;
const isWordLengthAboveZero = tableRow.children.length > 0 ? true : false;
const isEnter = event.key == "Enter" ? true : false;
const isBackspace = event.key == "Backspace" ? true : false;
const isEsc = event.key == "Escape" ? true : false;

isLetter && isWordLengthBelowLimit && !gameOver ? createTableData(event.key.toLowerCase()) : null;
isBackspace && isWordLengthAboveZero && !gameOver ? deleteTableData() : null;
isEnter && !isWordLengthBelowLimit && !gameOver ? createTableRow() : null;
isEsc && gameOver ? startOver() : null;

isGameOver();

}




//API

const getWord = async() => {

    const response = await fetch('https://random-word-api.herokuapp.com/word?length=5');
    const word = await response.json();

    return word[0];
}



// Game Functions

const checkWordMatch = () => {
    let guessedWord = [];
    if(previousRow){
        for(let i = 0; i < previousRow.children.length; i++){
            guessedWord.push(previousRow.children[i].innerText);
        }
        for(let i = 0; i < word.length; i++){
            for(let j  = 0; j < guessedWord.length; j++){
                const letterExistsInWord = word[i] == guessedWord[j];
                letterExistsInWord ? changeTableDataBackground(j, 'yellow') : null;
            }
        }

        //If this were to be put in the previous for loop the yellow would have overwritten the green background color for certain words - tooth

        for(let i = 0; i < word.length; i++){
            for(let j  = 0; j < guessedWord.length; j++){
                const letterAndIndexMatch = word[i] == guessedWord[j] && i == j;
                letterAndIndexMatch ? changeTableDataBackground(j, 'green') : null;
            }
        }
    }
    if(previousRow && guessedWord.join('') == word){
        addWin();
    }
}


const isGameOver = () => {
    const isOver = tableBody.children.length <= 5 ? true : false;
    isOver ? null : gameOver = true;
    isOver ? setTextStatus(' ') : setTextStatus(`Game Over! The word was ${word}. Press Esc to restart`)
}

const startOver = () => {
    setScore(0)
    restartGame();

}

const setScore = (scoreToSet) => {
    score = scoreToSet;
    scoreBoard.innerText = score;
} 

const setTextStatus = (text) => {
    
    textStatus.innerText = text;
}

const addWin = () => {
    setScore(score + 1)
    restartGame();
}

const startGame = async() => {
    window.removeEventListener('keydown', listener)
    word = await getWord();
    startGameButton.style = 'display: none'
    createTableRow();
    gameOver = false;
    console.log(word)
    window.addEventListener('keydown', listener)
    setTextStatus('Start typing...');
}

const restartGame = () => {
    gameOver = true;
    tableBody.innerHTML = '';
    tableRow.innerHTML = '';
    previousRow.innerHTML = '';
    word = '';
    startGame();
    
}





