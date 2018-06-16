$(document).ready(function() {
	
	let question1 = {
		ask: "What is the most dangerous delicacy", 
		answer: "Fugu",
		choices: ["Fiji Apple", "Furikake", "Saba"],
		correct: false,
	}

	let question2 = {
		ask: "Which one is not a real potato chip", 
		answer: "Pringles",
		choices: ["Lays", "Ruffles", "Kettle Brand"],
		correct: false,
	}

	let question3 = {
		ask: "How did pound cake get its name?", 
		answer: "The original recipe called for a pounnd each of butter, eggs, sugar, and flour.",
		choices: ["The original recipe made you gain a pound after eatting.", "The original recipe was named after Dick Pound, first president of the World Anti-Doping Angency.", "The product of the original recipe was used a unit of measurement."],
		correct: false,
	}

	let question4 = {
		ask: "What category does corn fall under", 
		answer: "Grain",
		choices: ["Vegetable", "Fruit", "Legume"],
		correct: false,
    }
   
    let question5 = {
        ask: "Where do orange carrots originate from?", 
        answer: "Holland, Dutch farmers grew them in honor of William of Orange.",
        choices: ["China, Chinese believe orange is the color of luck.", "Amazon, Francisco de Orellana discovered when exploring the deep forest.", "England, hybridized crop between sweet potato and white radish."],
        correct: false,
    }
  
    let question6 = {
        ask: "Red colored Skittles get there color from what?", 
        answer: "Salt made from the powdered scales insect bodies of cochineal.",
        choices: ["Food coloring made from pomegranate extract.", "Unicorn blood.", "Pigment from cherries."],
        correct: false,
    }

    let question7 = {
        ask: "Arsenic can be found in the following:", 
        answer: "All of the above",
        choices: ["Vegetables", "Rice", "Wine"],
        correct: false,
    }
    
    let questionHolder = [question1, question2, question3, question4, question5, question6, question7];
    let number = 0;
    let intervalId = 0;
    let rights = 0;
    let wrongs = 0;
    let time = 10;

    $("#start-game").on("click", function() { 
        generateQuestions(questionHolder[number])
        $("#main-menu").css('display', 'none');
	    $("#question-screen").css('display', 'inherit');
    });

    function generateQuestions(questionHolder) {
        intervalId = setInterval(decrement, 1000);
        $("#ask").html("<div><h4>" + questionHolder.ask + "</h4></div>" );
        $("#answer-choices").html("<div class='btn btn-info btn-block'>" + questionHolder.answer);

        for (let i = 0; i < questionHolder.choices.length; i++) {
            $("#answer-choices").append("<div class='btn btn-info btn-block'>" + questionHolder.choices[i]);
        };

        correct();
    }

    function nextQuestion() {
        genrerateQuestions(questionHolder[number]);
    }

    function correct() {
        $("#answer-choices").on("click", function() {
            let choiceRight = $(this).data("correct")

            if (choiceRight === true) {
                $("#right-choices").html("<h6>" + right + "</h6>");
                rights++;
                number++
                clearInterval(intervalId);
                time = 10;
                setTimeout(function() {
                    gameCheckEnd();
                }, 500);
            }     
            else { 
                number++;
                wrongs++;
                clearInterval(intervalId);
                time = 10;
                setTimeout(function() {
                    gameCheckEnd();
                }, 500);
            }    
            
        });
    } 
               
    function gameCheckEnd () {
        if (number === questionHolder.length) {
            $("#quuestion-screen").css('display', 'none');
            $("#gameover").css('display', 'inhereit');
        }
    }

    function decrement() {
       
        $("#timer").html("<h3>" + number + "</h3>");
        $("#timer").css('visibility', 'inherit');
        if (time === 0) {
            clearInterval(intervalId);
            time = 10;
            alert("Time Up!");
        }

    }

    $("#restart-game").on("click", function() {
        count = 0;
        rights = 0;
        wrongs = 0;

        for (let i = 0; i < questionHolder.length; i++) {
            questionHolder[i].correct = false;  
        }

        $("#gameover").css('display', 'none');
        $("#questoion-screen").css('display', 'inherit'); 
    });
});