/*
 * Copyright (c) 2019. Code contained in this file is written by and the intellectual property of Jesse Green except where otherwise noted. Reuse for educational, open source or reference uses is freely available provided reference to the original source is cited with use. Reuse for commercial purposes is prohibited without the consent of the owner.
 */
import {Player} from "./Player";
import {Character} from "./Character";
import * as constants from '../const';

export class Game {
	constructor(props) {
		this.gameId = props.gameId;
		console.log('New game = '+this.gameId);
		
		this.maxPlayers = props.maxPlayers;
		this.playersList = {};
		this.characterList = {};
		this.gameStatus = 0;
		this.turnList = {};
		this.result = constants.GAME_RES_IN_PROGRESS;
		this.winners = {};
		this.mapWidth = 700;
		this.mapHeight = 400;
	}
	
	addPlayer(player) {
		let playerId = Object.keys(this.playersList).length;
		if (playerId >= this.maxPlayers) {
			console.log('Game '+this.gameId+': could not add player. Maximum' +
				' players reached.');
			return -1;
		} else {
			let playerName = player.name;
			for (var i in this.playersList) {
				if(this.playersList[i].playerName == playerName) {
					let j = 1;
					let uniqueTest = false;
					while (!uniqueTest) {
						uniqueTest = true;
						for (var k in this.playersList) {
							if(this.playersList[k].playerName == playerName+j+'') {
								uniqueTest = false;
							}
						}
						if (!uniqueTest) {
							j++;
						}
					}
					playerName = playerName+j+'';
				}
			}
			this.playersList[playerId] = new Player({playerName:playerName})
			
			console.log('Game '+this.gameId+': added player '+this.playersList[playerId].playerName+'.');
			return playerId;
		}
	}
	
	addCharacter(playerId, char) {
		console.log('Attempting to add character to game');
		if(this.playersList[playerId] != null) {
			this.characterList[playerId] = new Character(char);
			console.log('Character added: '+char);
			if(Object.keys(this.characterList).length == Object.keys(this.playersList).length) {
				this.setGameStatus(2)
			}
		} else {
			console.log('Player could not be found: '+playerId+' \n\t' +
				' Character addition aborted.');
			return false;
		}
	}
	
	setGameStatus(status) {
		this.gameStatus = status;
	}

	async calculateGame() {
		console.log('Calculating game. GameID: '+this.gameId);
		let characterTurn = {};
		this.initialiseGame();
		while(this.result == constants.GAME_RES_IN_PROGRESS) {
			characterTurn = {};
			for (var char in this.characterList) {
				let charName = this.playersList[char].playerName;

				// If opponent is within attack range, and not moving away, and not dead. Attack.
				for (var charA in this.characterList) {
					if (char != charA && this.characterList[charA].health > 0) {
						let dist = Math.abs(this.characterList[char].x - this.characterList[charA].x);
						if (dist <= this.characterList[char].atkRange) {
							characterTurn.target = charA;
						}
					}
				}
				if (!characterTurn.target) {

				}
			}
		}
		console.log(this.winners[0]);
	}

	initialiseGame() {

		// Split characters up
		let numOfChar = Object.keys(this.characterList).length;
		let avgGap = (this.mapWidth - numOfChar*constants.CHAR_WIDTH)/(numOfChar + 1);
		for (var char in this.characterList) {
			let currChar = this.characterList[char];
			currChar.setX(avgGap+char*(avgGap+constants.CHAR_WIDTH));
			console.log('Character for player '+this.playersList[char].playerName+
			' is positioned at X:'+currChar.x+', Y:'+currChar.y);
		}


		this.checkWinner();

	}

	checkWinner() {
		let charAlive = 0;

		for (var char in this.characterList) {
			if (this.characterList[char].health > 0) {
				this.winners[charAlive] = this.playersList[char];
				charAlive++;
			}
		}

		if (charAlive <= 0) {
			this.result = constants.GAME_RES_DRAW;
		} else if (charAlive == 1) {
			this.result = constants.GAME_RES_WIN;
		} else {
			this.winners = {};
		}
	}
}
