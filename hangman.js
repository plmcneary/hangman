//Global Variables

var hangmanWords = ["the","of","and","a","to","in","is","you","that","it","he","was","for","on","are","as","with","his","they","I","at","be","this","have","from","or","one","had","by","word","but","not","what","all","were","we","when","your","can","said","there","use","an","each","which","she","do","how","their","if","will","up","other","about","out","many","then","them","these","so","some","her","would","make","like","him","into","time","has","look","two","more","write","go","see","number","no","way","could","people","my","than","first","water","been","call","who","oil","its","now","find","long","down","day","did","get","come","made","may","part"];
var filteredWords=[];
var chosenWord;
var splitWord;
var hiddenWord=[];
var guess;
var currentWord = document.querySelector('h2');
var unmatched = [];
var lives = document.querySelector('h3');
var startingLives = 8;
var victoryArr = [];
var winLoseStatus = document.querySelector('h4');


//Sanitize

function filterArray(){
  for(i=0; i<hangmanWords.length; ++i){
    var selectedWord = hangmanWords[i];
    if (selectedWord.length > 2){
      filteredWords.push(selectedWord);
    }
  }
}

filterArray();

//Choose Word

function chooseWord(){
  chosenWord = filteredWords[Math.floor(Math.random()*filteredWords.length)];
}

chooseWord();

//Turn Chosen Word into Array of Characters

function splitChosenWord(){
  splitWord = chosenWord.split('');
}

splitChosenWord();

//Create Array of Dashes

function createHiddenWord(){
  for(i=0; i<splitWord.length; ++i){
    hiddenWord.push('-');
  }
}

createHiddenWord();

currentWord.innerHTML = hiddenWord.join('');

var userGuess = document.querySelector('.user-guess');

//Life Counter

lives.innerHTML = startingLives;

//Submit Guess Event

userGuess.addEventListener('submit', function(e){

  //Event Control

  e.stopPropagation();
  e.preventDefault();

  //Grab Guess

  guess = document.querySelector('.guess-input').value;

  //Reset Unmatched

  unmatched = [];

  //Update Hidden Word, Create Unmatched

  for(i=0; i<splitWord.length; ++i){
    if(guess === splitWord[i]){
      hiddenWord.splice(i, 1, splitWord[i]);
    }

    //Unmatched Array

    if(guess !== splitWord[i]){
      unmatched.push(guess);
    }
  }

    //Display Word

  currentWord.innerHTML = hiddenWord.join('').toUpperCase();

  //Decrement Counter

  if (splitWord.length === unmatched.length){
    lives.innerHTML = (lives.innerHTML-1);
  }

  //Win

  for(i=0; i<hiddenWord.length; ++i){
    if(hiddenWord[i] === guess){
      victoryArr.push(hiddenWord[i]);
    }
  }

  if(victoryArr.length === splitWord.length){
    winLoseStatus.innerHTML = 'You Won!';
  }

  //Lose

  if (lives.innerHTML === "0"){
    winLoseStatus.innerHTML = 'Game Over';
  }

});
