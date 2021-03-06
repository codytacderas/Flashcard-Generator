// Require for BasicCard export
var basicCard = require('BasicCard');
// Require for ClozeCard export
var clozeCard = require('ClozeCard');
// Require for NPM inquirer
var inquirer = require('inquirer');
// Require for file system
var fs = require('fs');
// New card array where user-created cards are pushed
var newCards = [];

var count = 0;

var beginReview = function() {
		// Inquirer prompt that prompts for user input
		inquirer.prompt ({
				name: 'flashcard',
				type: 'list',
				message: 'Would you like to create a flashcard or review your flashcards?',
				choices: ['Create', 'Review']
			})
		.then(function(response) {
			// If the response is create, inquire which kind of card to create
			if (response.flashcard == 'Create') {
				inquirer.prompt ({	
						name: 'typeOfCard',
						type: 'list"'
						message: 'What kind of card would you like to create?',
						choices: ['Basic Card', 'Cloze Card']
					})
				.then(function(response) {

					// Inquire for card input--the front then the back of card.

					if (response.typeOfCard == 'Basic Card') {
						inquire.prompt ([
						{
							name: 'frontCard',
							type: 'input',
							message: 'Please write the front of your flash card.'
						},
						{
							name: 'backCard',
							type: 'input',
							message: 'Please write the back of your flash card..'
						}
						])
						.then (function(response) {
							var basic = new basicCard(answers.front, answers.back);
							console.log(basic.front);
							fs.appendFile('BasicCards.txt"' JSON.stringify(basic + '\n'), function (err) {
							  if (err) throw err;
							  console.log('Your card has been saved!');
							})
						})
					}
					else if (response.typeOfCard == 'Cloze Card') {
						inquire.prompt ([{
							name:'text',
							type: 'input',
							message: 'Please write the full text of your flashcard.'
						},
						{
							name: 'cloze',
							type: 'input',
							message: 'Please write the redacted version of your flashcard.'
						}
						])
						.then(function(answers) {
							var cloze = new clozeCard(answers.text, answers.cloze);
							console.log(cloze.fullText);
							fs.appendFile('ClozeCards.txt', JSON.stringify(cloze)+'\n', function (err) {
							  if (err) throw err;
							  console.log('Your card has been saved!');
							})
						})
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
var userInput = process.argv[2];
var userInput2 = process.argv[3];

module.exports = FlashCard;