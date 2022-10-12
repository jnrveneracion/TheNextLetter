
//lagayan ng choices
var ansA;
var ansB;
var ansC;
var ansD;

//sagot & given
var correctAns;
var nextTo;
var nextIs;

//pop out
function goPlay() {
    document.getElementById("mainArea").style = "display: none;";
    document.getElementById("selectMode").style = "display: none;";
    document.getElementById("selectMethod").style = "display: block;";
}

// method
function playTyping(){
    document.getElementById("mainArea").style = "display: none;";
    document.getElementById("selectMode").style = "display: block;";
    document.getElementById("selectMethod").style = "display: none;";
    document.getElementById("choices").style = "display: none;";
    document.getElementById("typing").style = "display: block;";
    typingChecker();
}

function playChoices(){
    document.getElementById("mainArea").style = "display: none;";
    document.getElementById("selectMode").style = "display: block;";
    document.getElementById("selectMethod").style = "display: none;";
    document.getElementById("typing").style = "display: none;";
    document.getElementById("choices").style = "display: block;";
}


//if mode is with choices
function play(timerMode) {
    document.getElementById("mainArea").style = "display: none;";
    document.getElementById("selectMode").style = "display: none;";
    document.getElementById("selectMethod").style = "display: none;";
    document.getElementById("mainGame").style = "display: block;";
    levels();
    timer(timerMode);
}

function createProgressbar(id, duration, callback) {
    // We select the div that we want to turn into a progressbar
    var progressbar = document.getElementById(id);
    progressbar.className = 'progressbar';
  
    // We create the div that changes width to show progress
    var progressbarinner = document.createElement('div');
    progressbarinner.className = 'inner';
  
    // Now we set the animation parameters
    progressbarinner.style.animationDuration = duration;
  
    // Eventually couple a callback
    if (typeof(callback) === 'function') {
      progressbarinner.addEventListener('animationend', callback);
    }
  
    // Append the progressbar to the main progressbardiv
    progressbar.appendChild(progressbarinner);
  
    // When everything is set up we start the animation
    progressbarinner.style.animationPlayState = 'running';
}

    
function timer(timerMode){
    createProgressbar('progressbar4', timerMode , function() {
        document.getElementById("finishBox").style = "display: !important;";
        function animateValue(obj, start, end, duration) {
            let startTimestamp = null;
            const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
            };
            window.requestAnimationFrame(step);
        }
        const obj = document.getElementById("finishScore");
        animateValue(obj, 0, score, 2000);
    });
}

function levels(){
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var randomNum = Math.floor(Math.random() * 25); //25 letters starts 0

    //may plus sa dulo kasi kasunod sya na letter

    let unshuffled = [randomNum+1, randomNum+4, randomNum+3, randomNum+2];

    let shuffled = unshuffled
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)

    //after this letter 
    var result = characters.charAt(randomNum);
    document.getElementById("txt1").innerHTML = result;

    nextTo = characters.charAt(randomNum);
    nextIs = characters.charAt(randomNum+1);

    //correct ans
    correctAns = randomNum+1;


    //choices
    var result2 = characters.charAt(shuffled[0]);
    document.getElementById("choice1").innerHTML = result2;
    ansA = shuffled[0];
    
    var result3 = characters.charAt(shuffled[1]);
    document.getElementById("choice2").innerHTML = result3;
    ansB = shuffled[1];

    var result4 = characters.charAt(shuffled[2]);
    document.getElementById("choice3").innerHTML = result4;
    ansC = shuffled[2];

    var result5 = characters.charAt(shuffled[3]);
    document.getElementById("choice4").innerHTML = result5;
    ansD = shuffled[3];

}


//score
var score = 0;
  
//checker
function chosen(ans){
    if (ans == 'a'){
        if(ansA == correctAns){
            score+=500;
        }else{
            whenWrong();
        }
    }
    else if (ans == 'b'){
        if(ansB == correctAns){
            score+=500;
        }else{
            whenWrong();
        }    
    }
    else if (ans == 'c'){
        if(ansC == correctAns){
            score+=500;
        }else{
            whenWrong();
        }    
    }
    else if (ans == 'd'){
        if(ansD == correctAns){
            score+=500;
        }else{
            whenWrong();
        }    
    }
    levels();
}

function typingChecker(){
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var randomNum = Math.floor(Math.random() * 25); //25 letters starts 0

    //may plus sa dulo kasi kasunod sya na letter

    let unshuffled = [randomNum+1, randomNum+4, randomNum+3, randomNum+2];

    let shuffled = unshuffled
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)

    //after this letter 
    var result = characters.charAt(randomNum);
    document.getElementById("txt1").innerHTML = result;

    nextTo = characters.charAt(randomNum);
    nextIs = characters.charAt(randomNum+1);

    //correct ans
    correctAns = randomNum+1;

    //typing
    var inputAnswer = document.getElementById("answerTxt");
    inputAnswer.addEventListener("keypress", function(event){
    if (event.key == "Enter"){
        if(inputAnswer.value.toUpperCase() == characters.charAt(correctAns)){
            score+=500;
            inputAnswer.value = '';
            levels();
        }else{
            whenWrong();
            inputAnswer.value = '';
            levels();
        }
    } 
    });
}

//when wrong display this
function whenWrong(){
    document.getElementById("wrong").style.display = 'block';
    document.getElementById("nextTo").innerHTML = nextTo;
    document.getElementById("nextIs").innerHTML = nextIs;
    showCorrection();
}

//Show correction
function showCorrection() {
    if (document.getElementById("wrong") != null) {
      setTimeout(function() {
        document.getElementById('wrong').style.display = 'none';
      }, 1500);
    }else{
        console.log("error in viewing right answer");
    }
}

//buttons

function playAgain(){
    document.getElementById("finishBox").style = "display: none !important;";
    score = 0;
    play(timerMode);
}

function goHome(){
window.location = 'index.html';
}

function selectMode(){
    document.getElementById("selectMode").style = "display: !important;";
}

