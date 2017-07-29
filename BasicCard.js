// Require for NPM inquirer
var inquirer = require('inquirer');
// Require for file system
var fs = require('fs');
// New card array where user-created cards are pushed
var newCards = [];

// Inquirer prompt that prompts for user input
inquirer.prompt ({
		name: 'flashcard',
		type: 'list',
		message: 'Would you like to create a flashcard or review your flashcards?',
		choices: ['Create', 'Review']
	})
.then(function(response){
	// If the response is create, the run the createFlashCard function
	if (response.flashcard == 'Create') {
	// Call the createFlashCard function defined (hopefully) below
		createFlashCards();
	} else {
		// If the response is not create, run the reviewFlashCard function
	// Call the reviewFlashCards function defined (also hopefully) below
		reviewFlashCards();
	}
})

// The flashcard constructor defining front and back of card
function flashCard(front, back){
	this.front = front; 
	this.back = back;
};

// Function to create new flashcards.
function createFlashCards() {
	// Prompts the user to write a question and a corresopnding answer
	inquirer.prompt ([
	{
		name: "frontOfCard",
		type: "input",
		message: "Please type in your flashcard question."
	}, 
	{
		name: "backOfCard",
		type: "input",
		message: "Please type in the answer to your flashcard question."
	}
	])
	.then(function(newCard){
		// Pushes the users card into a new card array
		newCards.push(new flashCard(newCard.frontOfCard, newCard.backOfCard));
		console.log(newCards);
		// Appends the new flash card to a txt file that will store all the cards
		fs.writeFile("cards.txt", JSON.stringify(newCards), function(err) {
			if(err) throw err;
			else {
				console.log("Your card has been saved!");
			}
		});
	});
};

// Function to review already created flashcards.
function reviewFlashCards() {
	
};