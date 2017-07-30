// Require for NPM inquirer
var inquirer = require('inquirer');
// Require for file system
var fs = require('fs');
// New card array where user-created cards are pushed
var newCards = [];

var count = 0;

var beginReview = function() {
	if (count <= 100) {
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
						newCards.push(new FlashCard(newCard.frontOfCard, newCard.backOfCard));
						// Appends the new flash card to a txt file that will store all the cards
						fs.writeFile("cards.txt", JSON.stringify(newCards), function(err) {
							if(err) throw err;
							else {
								console.log("Your card has been saved!");
								count++;
								beginReview();
							}
						});
					});
			} else {
				console.log("Something significant goes here.");
				return;
			}
		})
	}
}
// The flashcard constructor defining front and back of card
var FlashCard = function(front, back) {
	this.front = front; 
	this.back = back;
};

beginReview();

module.exports = FlashCard;