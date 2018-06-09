// JavaScript function that wraps everything

	var characters = [{	name: "Darthmaul", thumbnail: "assets/images/DarthMaul-front.png", strength: 150, attackPower: 20},
					  { name: "Jar Jar", thumbnail: "assets/images/jar-face.png", strength: 120, attackPower: 5},
					  { name: "R2D2", thumbnail: "assets/images/r2d2-back.png", strength: 160, attackPower: 8},
					  { name: "Yoda", thumbnail: "assets/images/yoda-face.png", strength: 170, attackPower: 25}					
					];

	var choseAttacker = false;	
	var choseDefender = false;
	var attackerPower;
	var attackerStrength;
	var defenderStrength;
	var defenderPower;
	var counter = 0;
	var enhancedPower;
	var newOpponent = false;
	
$(document).ready(function() {
	 var mainCharacter;
	 var opponentCharacter;
		characters.forEach(function(obj){
	 	 var newDiv = $("<div>");
	 	 newDiv.addClass("image-container");
	 	 
	 	 var newElem = $("<h4>");
	 	 newElem.text(obj.name);
	 	 newDiv.append(newElem);
	 	 
	 	 var newImg = $("<img>");
		 newImg.attr("src", obj.thumbnail);
		 newImg.css({"height": "100px", "width" : "140px"});
		 newDiv.data("strength", obj.strength);
		 newDiv.data("power", obj.attackPower);
		 newDiv.append(newImg);
		 newDiv.attr("id", obj.name);
		 
		 var newH5 = $("<h5>");
		 newH5.text(obj.strength);
		 newH5.attr("data-attribute", obj.name);
		 newDiv.append(newH5);
		 $("#characters").append(newDiv);$(this).addClass("enemy-container");
});

	 
	$(".image-container").on("click", function(){
	 	$("#characters").hide();
	 	 if(!choseAttacker) {
	 		$(".myCharacter").append($(this));
	 		mainCharacter = $(this).attr("id");
	 		attackerPower = parseInt($(this).data("power"));
	 		attackerStrength = parseInt($(this).data("strength"));
	 		choseAttacker = true;
	 		
		 	$(".image-container").each(function(i){
		 		if(mainCharacter !== $(this).attr("id")) {
		 			$(".enemy").append($(this));
		 			$(this).css({"background-color":"red", "border-color":"black"});
		 		}
		 	});	
	 	} else {
	 		opponentCharacter = $(this).attr("id");
	 		choseDefender = true;
	 		$(".defenderCharacter").append($(this));
	 		defenderPower = parseInt($(this).data("power"));
	 		defenderStrength = parseInt($(this).data("strength"));
	 		$(this).addClass("defender");
	 	}	
	});

	$(".actionButton").on("click", function() {

		if(!choseAttacker ||  !choseDefender) {
			$(".message").html("You have no opponents!");
		}else {
			if(attackerStrength > 0) {

				counter++;
				enhancedPower = attackerPower * counter
				attackerStrength -= defenderPower;
				$(".myCharacter h5").text(attackerStrength);
				defenderStrength -= enhancedPower;
				$(".defenderCharacter h5").text(defenderStrength);
				$(".message").html("You attacked "+ opponentCharacter + " for "+ enhancedPower+" damage</br>"+opponentCharacter+ " attacked you back for "+ defenderPower+ " damage!");
				if(defenderStrength <= 0) {
					$(".message").html("You have defeated "+ opponentCharacter+" Chose another opponent!");
						$(".defenderCharacter").empty();
					if ( $('.enemy').children().length == 0 ) {
				    	$(".message").html("You have won! Restart the game to play again.");
				    }	
				}
			}else {
				$(".message").html("You have been defeated! Restart the game to play again.")
				choseAttacker = false;
				$(".defenderCharacter").empty();
			}
		}
	});	

	$("#restartButton").on('click', function() {
     console.log("inside");
     location.reload();
 	});
});
	



// Game logic : strength <= 0 lose game, restart button, 
// attack points = each opponent has a set attack points
// main attacker attack point increases after each attack  by multiples of 8
// var main character, opponent
// if no opponent in defender area message no one to fight