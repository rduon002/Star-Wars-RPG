
$(document).ready(function() {
	
	let question1 = {
		ask: "What is the most dangerous delicacy?", 
		answer: "Fugu",
		choices: ["Fiji Apple", 
                  "Furikake", 
                  "Saba", 
                  "Fugu"],
		correct: false,
	}

	let question2 = {
		ask: "Which one is not a real potato chip", 
		answer: "Pringles",
		choices: ["Lays", 
                  "Ruffles",
                  "Pringles", 
                  "Kettle Brand"],
		correct: false,
	}

	let question3 = {
		ask: "How did pound cake get its name?", 
		answer: "The original recipe called for a pounnd each of butter, eggs, sugar, and flour.",
		choices: ["The original recipe made you gain a pound after eatting.", 
                  "The original recipe was named after Dick Pound, first president of the World Anti-Doping Angency.", 
                  "The product of the original recipe was used a unit of measurement.", 
                  "The original recipe called for a pounnd each of butter, eggs, sugar, and flour."],
		correct: false,
	}

	let question4 = {
		ask: "What category does corn fall under?", 
		answer: "Grain",
		choices: ["Grain", 
                  "Vegetable", 
                  "Fruit", 
                  "Legume"],
		correct: false,
    }
   
    let question5 = {
        ask: "Where do orange carrots originate from?", 
        answer: "Holland, Dutch farmers grew them in honor of William of Orange.",
        choices: ["China, Chinese believe orange is the color of luck.", 
                  "Holland, Dutch farmers grew them in honor of William of Orange.", 
                  "Amazon, Francisco de Orellana discovered when exploring the deep forest.", 
                  "England, hybridized crop between sweet potato and white radish."],
        correct: false,
    }
  
    let question6 = {
        ask: "Red colored Skittles get there color from what?", 
        answer: "Salt made from the powdered scales insect bodies of cochineal.",
        choices: ["Food coloring made from pomegranate extract.", 
                  "Unicorn blood.", 
                  "Salt made from the powdered scales insect bodies of cochineal.", 
                  "Pigment from cherries."],
        correct: false,
    }

    let question7 = {
        ask: "Arsenic can be found in the following:", 
        answer: "All of the above",
        choices: ["Vegetables", 
                  "Rice", 
                  "Wine", 
                  "All of the above"],
        correct: false,
    }
    
    let questionHolder = [question1, question2, question3, question4, question5, question6, question7];
    let questionNumber = 0;
    let intervalId = 0;
    let rights = 0;
    let wrongs = 0;
    let time = 10;

    $("#start-game").on("click", function() { 
        if(checkEndGame() === "false") {
            generateQuestions(questionHolder[questionNumber])
            $("#main-menu").css('display', 'none');
            $("#start-game").css('display', 'none');
            $("#question-screen").css('display', 'inherit');
            $("#gameover").css('display', 'none');
        }
//        else {
//            resetTimer();
//            $("#question-screen").css('display', 'none');
//            $("#question-screen").css('finalScores', 'inherit');
//            alert("game Over");
//        }
        
    });

    function generateQuestions(questionHolder) {      
        $("#timerAndresults").css('display', 'inherit');
        
        intervalId = setInterval(decrement, 1000);
        
        $("#ask").html("<div><h4>" + questionHolder.ask + "</h4></div>" );

//        populating the first value and iteration through the rest later
        let choiceList = "<button type='button' class='btn btn-primary btn-lg btn-block' id='"+ questionHolder.choices[0] +"'>" + questionHolder.choices[0] + "</button>";
        for (let i = 1; i < questionHolder.choices.length; i++) {
            choiceList = choiceList + "<button type='button' class='btn btn-primary btn-lg btn-block' id='"+ questionHolder.choices[i] +"'>" + questionHolder.choices[i] + "</button>";
        };
        $("#answer-choices").html(choiceList); // add the constructed list to the dom
    }
    
    function resetTimer() {
        time = 10;
        clearInterval(intervalId); // reset the Timer
    }

    function nextQuestion() {
        questionNumber++;
        time = 10; //reset timer back to 10 seconds
        $("#timeCounter").text(time);
        generateQuestions(questionHolder[questionNumber]);
        return ;
    }
    
    $("#answer-choices").on("click", function(event) {        
        selectedChoice = event.target.id; //captures event on screen
        choiceRight = questionHolder[questionNumber].answer;
        
        if(choiceRight === selectedChoice) 
            rights++;
        else
            wrongs++;
        $("#rightAnswers").text(rights);
        $("#wrongAnswers").text(wrongs);
        
        if(checkEndGame() === "false") {
            resetTimer();
            nextQuestion();
        } else {
            time = 0;
            clearInterval(intervalId);

            $("#question-screen").css('display', 'none');
            $("#question-screen").css('finalScores', 'inherit');
            $("#gameover").css('display', 'inherit');
            
        }
    });
    
    
    function updateWrongScoreOnTimeout() {
        wrongs++;
        $("#wrongAnswers").text(wrongs);
        resetTimer();
        nextQuestion();
    }
               
    function checkEndGame() {        
        if (questionNumber === (questionHolder.length-1))
            return "true"; //last question
        return "false";
    }

    function decrement() {       
        time = time-1;
        $("#timeCounter").text(time);
        if (time <= 0) {
            updateWrongScoreOnTimeout();
        }
    }

    
    $("#restart-game").on("click", function() {
        count = 0;
        rights = 0;
        wrongs = 0;
        questionNumber = 0;
        intervalId = 0;
        resetAll();
        
        generateQuestions(questionHolder[questionNumber])
        $("#main-menu").css('display', 'none');
        $("#question-screen").css('display', 'inherit');
        $("#gameover").css('display', 'none');
        
    });
    

    function resetAll() {
        $("#rightAnswers").text(rights);
        $("#wrongAnswers").text(wrongs);
        $("#timeCounter").text(time);
        resetTimer();
    }
});