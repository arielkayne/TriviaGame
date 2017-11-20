// pseudocoding stuff left to do...plus bonus janky hacky buggy code!

// 	need a start screen/instructions
// 		make it prettier
// need to program in correct answer responses and delays for next questions
	// you got it right display w/ correct answer + 2 sec delay
	// you got it wrong display w/ correct answer+ 2 sec delay
	// if time's up, same as wrong+time's up alert
// program final screen with win/loss status

var clockRunning;
var quizEnabled;
var scoreRight;
var scoreWrong;
var timerCount;
var questionsLeft;
var questionsRemaining;
var currentCorrectAnswer;
var questionAnswered;
var currentSelection;
var nowPlayin;
var tempVar;
var randQuestionIndex;
var questionBank=[{
		questionId: 0,
		questionText: "Who wrote the book Alice In Wonderland?",
		questionChoices: ["Lewis Carroll", "J.K. Rowling", "Louis Carroll"],
		correctAnswerIndex: 0,
		questionStatus: "false"
	},{
		questionId: 1,
		questionText: "What is the abbreviation for Washington, D.C.?",
		questionChoices: ["DC", "WA", "WD"],
		correctAnswerIndex: 0,
		questionStatus: "false"
	},{
		questionId: 2,
		questionText: "Are walruses found in the South Pole?",
		questionChoices: ["Yes", "No", "No, they're found around New Zealand"],
		correctAnswerIndex: 1,
		questionStatus: "false"
	},{
		questionId: 3,
		questionText: "How many sonnets did William Shakespeare write?",
		questionChoices: ["154", "108", "167"],
		correctAnswerIndex: 0,
		questionStatus: "false"
	},{
		questionId: 4,
		questionText: "Were jeans always blue?",
		questionChoices: ["No", "Yes", "They were yellow"],
		correctAnswerIndex: 0,
		questionStatus: "false"
	},{
		questionId: 5,
		questionText: "How old was Tony Hawk when he started skateboarding?",
		questionChoices: ["5", "7", "9"],
		correctAnswerIndex: 2,
		questionStatus: "false"
	},{
		questionId: 6,
		questionText: "What is the other name for General Motors?",
		questionChoices: ["G Motors", "General M's", "G.M."],
		correctAnswerIndex: 2,
		questionStatus: "false"
	},{
		questionId: 7,
		questionText: "Complete this phrase: Dr. Livingstone,",
		questionChoices: ["I presume", "I find", "I see"],
		correctAnswerIndex: 0,
		questionStatus: "false"
	},{
		questionId: 8,
		questionText: "What year did the penny start having Lincoln's face on it?",
		questionChoices: ["1909", "1897", "1898"],
		correctAnswerIndex: 0,
		questionStatus: "false"
	},{
		questionId: 9,
		questionText: "Where were cats most honored?",
		questionChoices: ["USA", "Greece", "Egypt"],
		correctAnswerIndex: 2,
		questionStatus: "false"
	}]

resetGame();
gameOn();

// used to start/reset game
function gameOn () {
	$("p").html("<button id='reset'>Reset</button> <button id='start'>Start</button> Press 'Start' when ready to start. You'll have 10 seconds to answer each question. Don't suck.");
	console.log("game on");	
	$("#reset").click(function(){
		resetGame();
		clockStop();
		$("#questionArea").hide();
		$("#answerArea").hide();

	});

	$("#start").click(function(){
		console.log("start clicked");
		resetGame();
		clockStop();
		$("#questionArea").show();
		$("#answerArea").show();
		displayQuestion();
	});
}
// called when game resets...resets parameters and counters
function resetGame(){
	quizEnabled=false;
	scoreRight=0;
	scoreWrong=0;
	questionsRemaining=questionBank.length;
	$("#timer").text("Countdown Timer: ** seconds");
	for (i=0; i<questionBank.length;i++) {
		questionBank[i].questionStatus="false";
	}
	nowPlayin=true;
	clockRunning=false;
	refreshScores();
	questionsLeft();
}
// display a question
function displayQuestion () {
	randQuestionIndex=Math.floor(Math.random()*questionBank.length);
	console.log("This is the new random question index: "+randQuestionIndex);
	refreshScores();
	clockRunning=false;

	if (nowPlayin===true && questionBank[randQuestionIndex].questionStatus=="true") {
			console.log("Index already used, randomizing again");
			displayQuestion();

	}
	else if (nowPlayin===true && questionBank[randQuestionIndex].questionStatus=="false") {
		// changes displayed question
		$("#questionArea").html("<h2>"+questionBank[randQuestionIndex].questionText+"</h2>");
		// sets index of currently currect answer
		currentCorrectAnswer=questionBank[randQuestionIndex].correctAnswerIndex;
		console.log("Index not already used, time to guess!");
		clockStart();
		
		// calls sub function
		displayAnswer();
		function displayAnswer () {
			$("#answerArea").html("<button class='guess' id='zero'>"+questionBank[randQuestionIndex].questionChoices[0]+"</button><br>");
			$("#answerArea").append("<button class='guess' id='one'>"+questionBank[randQuestionIndex].questionChoices[1]+"</button><br>");
			$("#answerArea").append("<button class='guess' id='two'>"+questionBank[randQuestionIndex].questionChoices[2]+"</button><br>");
			questionBank[randQuestionIndex].questionStatus="true";
			questionAnswered=false;
		}

		$("#zero").click(function(){
			currentSelection=0;	
			console.log("This question index has been marked used: "+randQuestionIndex);
			questionsLeft();
			clockRunning=false;
			questionAnswered=true;if (currentSelection==currentCorrectAnswer) {
				gotItRight();
			}
			else {
				gotItWrong();
			}
			clockStop();	
			displayQuestion();
		});

		$("#one").click(function(){
			currentSelection=1;
			console.log("This question index has been marked used: "+randQuestionIndex);
			questionsLeft();
			clockRunning=false;
			questionAnswered=true;
			if (currentSelection==currentCorrectAnswer) {
				gotItRight();
			}
			else {
				gotItWrong();
			}
			clockStop();	
			displayQuestion();
		});

		$("#two").click(function(){
			currentSelection=2;
			console.log("This question index has been marked used: "+randQuestionIndex);
			questionsLeft();
			clockRunning=false;
			questionAnswered=true;
			if (currentSelection==currentCorrectAnswer) {
				gotItRight();
			}
			else {
				gotItWrong();
			}
			clockStop();	
			displayQuestion();
		});
	}
	else {
		$("#questionArea").html("<h2>You won or lost...depends on how badly you scored</h2><br>");
		$("#answerArea").html("<p>You scored "+(scoreRight/questionBank.length*100)+"% on this quiz.</p><br>"+"<p>Best to study and try again.</p><br>"+"<p>Click the 'Reset' button above to start over.</p>");
	}	
}
// called to update questions remaining counter
function questionsLeft(){
	questionsRemaining=0;
	for (i=0; i<questionBank.length;i++){
		if (questionBank[i].questionStatus=="false") {
			questionsRemaining++;
		}
		else{ 
			console.log("function questionsLeft: you still have "+questionsRemaining+" unused questions");
		}
	}
	if (questionsRemaining==0) {
		nowPlayin=false;
		console.log("function questionsLeft: you're out of questions.");
	}
	$("#questionsRem").text("Questions Remaining: "+questionsRemaining);
}
// changes information displayed re: scores/timer
function refreshScores(){
	$("#questionsRight").text("Correct Answers: "+scoreRight);
	$("#questionsWrong").text("Incorrect Answers: "+scoreWrong);
	$("#questionsRem").text("Questions Remaining: "+questionsRemaining);	
}
// called when correct answer is selected
function gotItRight(){
	scoreRight++;
	$("#timer").text("Countdown Timer: ** seconds");
	console.log("new right score: "+scoreRight);
}
// called when incorrect answer is selected
function gotItWrong(){
	scoreWrong++;
	$("#timer").text("Countdown Timer: ** seconds");
	console.log("new wrong score is: "+scoreWrong)
}
// starts countdown clock
function clockStart(){
	if (!clockRunning) {
        console.log("clock started");
        timerCount=10;
    	$("#timer").text("Countdown Timer: "+timerCount+" seconds");
        clockRunning = true;

        tempVar = setInterval (function(){
        	timerCount--;      	
        	$("#timer").text("Countdown Timer: "+timerCount+" seconds");
        	console.log(timerCount);
        	
        	if (timerCount==0) {
				clockStop();
        		console.log("You ran out of time.");
        		questionsLeft();
        		gotItWrong();
        		displayQuestion();
        	}

        	else if (questionAnswered==true) {
        		clockStop();
        		console.log("quesetion answered, timer cleared");
        		questionsLeft();
        	}
        }, 1000);
    }
}
// stops clock
function clockStop(){
	clearInterval(tempVar);
    console.log("clock stopped");
    clockRunning = false;
}
