// pseudocoding stuff left to do...plus bonus janky hacky buggy code!

// 	need a start screen/instructions
//		start/reset buttons? 
// 	countdown timer - semi works, but breaks when answers...think i might need to change functions called and clear intervals somewhere
// 		timer reset, timer=zero actions
// 	make it prettier


var clockRunning;
var quizEnabled;
var scoreRight;
var scoreWrong;
var timerCount;
var questionsLeft;
var questionsRemaining;
var currentAnswer;
var questionAnswered;
var currentSelection;
var stillPlayin;
var tempVar;
var questionBank=[{
		questionId: 0,
		questionText: "Who wrote the book Alice In Wonderland?",
		questionChoices: ["Lewis Carroll", "J.K. Rowling", "Louis Carroll"],
		questionAnswerIndex: 0,
		questionStatus: "false"
	},{
		questionId: 1,
		questionText: "What is the abbreviation for Washington, D.C.?",
		questionChoices: ["DC", "WA", "WD"],
		questionAnswerIndex: 0,
		questionStatus: "false"
	},{
		questionId: 2,
		questionText: "Are walruses found in the South Pole?",
		questionChoices: ["Yes", "No", "No, they're found around New Zealand"],
		questionAnswerIndex: 1,
		questionStatus: "false"
	},{
		questionId: 3,
		questionText: "How many sonnets did William Shakespeare write?",
		questionChoices: ["154", "108", "167"],
		questionAnswerIndex: 0,
		questionStatus: "false"
	},{
		questionId: 4,
		questionText: "Were jeans always blue?",
		questionChoices: ["No", "Yes", "They were yellow"],
		questionAnswerIndex: 0,
		questionStatus: "false"
	}]

$("#timer").text("Countdown Timer: ** seconds");
resetGame();
displayQuestion();

// called when game resets...resets parameters and counters
function resetGame(){
	quizEnabled=false;
	scoreRight=0;
	scoreWrong=0;
	questionsRemaining=questionBank.length;
	for (i=0; i<questionBank.length;i++) {
		questionBank[i].questionStatus="false";
	}
	stillPlayin=true;
	refreshScores();
	questionsLeft();
	clockRunning=false;
}
// display a question
function displayQuestion () {
	var randQuestionIndex=Math.floor(Math.random()*questionBank.length);
	console.log("This is the new random question index: "+randQuestionIndex);
	refreshScores();
	clockStop();

	if (stillPlayin===true && questionBank[randQuestionIndex].questionStatus=="true") {
			refreshScores();
			console.log("question already used, trying again");
	        clockRunning = false;
			displayQuestion();

	}
	else if (stillPlayin===true && questionBank[randQuestionIndex].questionStatus=="false") {
		// changes displayed question
		$("#questionArea").html("<h2>"+questionBank[randQuestionIndex].questionText+"</h2>");
		// sets index of currently currect answer
		currentAnswer=questionBank[randQuestionIndex].questionAnswerIndex;
		console.log("Random question not already used, time to guess!");
		clockStart();
		refreshScores();
		
		// calls sub function
		displayAnswer();
		function displayAnswer () {
			$("#answerArea").html("<button class='guess' id='zero'>"+questionBank[randQuestionIndex].questionChoices[0]+"</button><br>");
			$("#answerArea").append("<button class='guess' id='one'>"+questionBank[randQuestionIndex].questionChoices[1]+"</button><br>");
			$("#answerArea").append("<button class='guess' id='two'>"+questionBank[randQuestionIndex].questionChoices[2]+"</button><br>");
			questionBank[randQuestionIndex].questionStatus="true";

		}

		$("#zero").click(function(){
			currentSelection=0;	
			if (currentSelection==currentAnswer) {
				gotItRight();
			}
			else {
				gotItWrong();
			}
			console.log("This question index has been marked used: "+randQuestionIndex);
			questionsLeft();
			clockRunning=false;
			questionAnswered=true;

			displayQuestion();
		});

		$("#one").click(function(){
			currentSelection=1;
			if (currentSelection==currentAnswer) {
				gotItRight();
			}
			else {
				gotItWrong();
			}
			console.log("This question index has been marked used: "+randQuestionIndex);
			questionsLeft();
			clockRunning=false;
			questionAnswered=true;
			displayQuestion();
		});

		$("#two").click(function(){
			currentSelection=2;
			if (currentSelection==currentAnswer) {
				gotItRight();
			}
			else {
				gotItWrong();
			}
			console.log("This question index has been marked used: "+randQuestionIndex);
			questionsLeft();
			clockRunning=false;
			questionAnswered=true;	
			displayQuestion();
		});
	}
	else {
		$("#questionArea").html("<h2>You won or lost...depends on how badly you scored</h2>");
		$("#answerArea").html("<p>Most likely, you need to study up and try again.</p>");
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
		stillPlayin=false;
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
	console.log("new right score: "+scoreRight);
}
// called when incorrect answer is selected
function gotItWrong(){
	scoreWrong++;
	console.log("new wrong score is: "+scoreWrong)
}
// starts countdown clock
function clockStart(){
	if (!clockRunning) {
        console.log("clock started");
        timerCount=5;
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
        		console.log("timer cleared");
        		questionAnswered=false;
        		questionsLeft();
        	}


        }, 1000);
    }
}

function clockStop(){
	if (clockRunning) {
		clearInterval(tempVar);
        console.log("clock stopped");
        clockRunning = false;
	}
}



  //   // DONE: increment time by 1, remember we cant use "this" here.
  //   stopwatch.time++;

  //   // DONE: Get the current time, pass that into the stopwatch.timeConverter function,
  //   //       and save the result in a variable.
  //   var converted = stopwatch.timeConverter(stopwatch.time);
  //   console.log(converted);

  //   // DONE: Use the variable we just created to show the converted time in the "display" div.
  //   $("#display").text(converted);
  // },


// ----------------------------------------------crap below this line....----------------------------------------------


// called when time runs out
// function timesUp () {
// 	console.log("function- time's up");
// 	gotItWrong();
// 	// increments incorrect answer var
// 	// makes noise
// }





// // stuff that doesn't quite work yet below
// function answerClick (){
// 	console.log("answerclick");
// }

// // function newCountdown(){
// // 	console.log("function- new countdown requested");
// // 	$("#timer").text("00:05");
// }

	// reset timer, start 5 second countdown
	// display answers on buttons
	// onclick check answer (get index of questionCHoices and compare to AnswerIndex)





// ### Option Two: Advanced Assignment (Timed Questions)

// ![Advanced](Images/2-advanced.jpg)

// **[Click Here to Watch the demo](advanced-trivia-demo.mov)**.

// * You'll create a trivia game that shows only one question until the player answers it or their time runs out.




// * If the player selects the correct answer, show a screen congratulating them for choosing the right option. After a few seconds, display the next question -- do this without user input.

// * The scenario is similar for wrong answers and time-outs.

//   * If the player runs out of time, tell the player that time's up and display the correct answer. Wait a few seconds, then show the next question.
//   * If the player chooses the wrong answer, tell the player they selected the wrong option and then display the correct answer. Wait a few seconds, then show the next question.

// * On the final screen, show the number of correct answers, incorrect answers, and an option to restart the game (without reloading the page).

 
// How old was Tony Hawk when he started skateboarding?
// 5
// 7
// 9
 
// What is the other name for General Motors?
// G Motors
// General M's
// G.M.

// Where were cats most honored?
// USA
// Greece
// Egypt 

// Complete this phrase-Dr. Livingstone,

// I presume
// I find
// I see

// What year did the penny start having Lincoln's face on it?

// 1909
// 1897
// 1898
