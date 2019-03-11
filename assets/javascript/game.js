window.onload = function() {


	var dictionary = ["demon", "souls", "gorillaz","noodle","harry", "monkey", "manana", "murdoc", "november", "russel", "damon", "dare", "albarn", "westbourne", "platinum"];
	var word;
	var arrayWd;
	var triesCounter;
	var dashesArr;
	var winsCounter = 0;
	var lossesCounter = 0;
	var guesses = [];

	
	getNewWord();


	document.onkeyup = function(event){
		document.getElementById("alert").innerHTML = "";
		var userChoice = event.key;
		var lcUserChoice = userChoice.toLowerCase();		
			
		
		if(guesses.indexOf(lcUserChoice) === -1){
			guesses.push(lcUserChoice);
			document.getElementById("guesses").innerHTML = guesses.join(" ");
			triesCounter--;	
			document.getElementById("counter").innerHTML = "Attempts Remaining: " + triesCounter;
		}

		if (triesCounter !== 0){					
			if(event.which <= 90 && event.which >= 65)
			{
				letterChecker(lcUserChoice, arrayWd);						
			}
			else{
				document.getElementById("alert").innerHTML = "Input failed, try again."				
			}
		}
		else{
			document.getElementById("alert").innerHTML = "You got lost in the Monkey's head. You lose.";
			lossesCounter ++;
			document.getElementById("wl").innerHTML = "Wins: " + winsCounter + "	vs.  " + "  Losses: " + lossesCounter;
			getNewWord();
		}
	}


	function getNewWord(){
		guesses = [];
		arrayWd = [];
		dashesArr = [];	
		word = getRandomWord();
		arrayWd = splitWord(word);
		triesCounter = arrayWd.length + 5;
		document.getElementById("counter").innerHTML = "Attempts Remaining: " + triesCounter;
		dashesArr = createDashesArray(arrayWd, dashesArr);
		document.getElementById("word").innerHTML = dashesArr.join(" ");	
		document.getElementById("guesses").innerHTML = guesses.join(" ");
	}

	function createDashesArray(arrayWd, dashesArray){
		for (var i = 0; i < arrayWd.length; i++){	
			dashesArray.push("_");		
		}
		console.log(arrayWd.length);
		return dashesArray;
	}

	function letterChecker(letter, arrayOfLetters){
		
		if (arrayWd.indexOf(letter) !== -1){
			
			var letterIndexes = [];
			var index = arrayWd.indexOf(letter);

			while(index != -1){
				letterIndexes.push(index);
				index = arrayWd.indexOf(letter, index + 1);
			}

			
			for (var i=0; i< letterIndexes.length; i++){
				
				dashesArr[letterIndexes[i]] = letter;
				
				arrayWd[letterIndexes[i]] = "_";
				
				document.getElementById("word").innerHTML = dashesArr.join(" ");

				if(dashesArr.indexOf("_") === -1){
					document.getElementById("alert").innerHTML = "You may continue your journey to Feel Good Inc.."
					winsCounter++;
					document.getElementById("wl").innerHTML = "Wins: " + winsCounter + "	vs.  " + "  Losses: " + lossesCounter;
	
					getNewWord();
				}
			}
		}
		else{
			document.getElementById("alert").innerHTML = "Input failed, not part of the word."
		}
	}

	function getRandomWord(){
		var ranNumber = Math.floor((Math.random() * dictionary.length -1) + 1);
		var word = dictionary[ranNumber];

		return word;
	}

	
	function splitWord(word){
		var arrayOfLetters = word.split("");
		return arrayOfLetters;
	}

}