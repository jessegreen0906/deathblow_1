/*
 * Copyright (c) 2019. Code contained in this file is written by and the intellectual property of Jesse Green except where otherwise noted. Reuse for educational, open source or reference uses is freely available provided reference to the original source is cited with use. Reuse for commercial purposes is prohibited without the consent of the owner.
 */
import {Player} from "./Player";
import * as constants from '../const';

export class Game {
	constructor(props) {
		this.gameId = props.gameId;
		console.log('New game = '+this.gameId);
		
		this.playersList = {};
		this.characterList = {};
	}
	
	addPlayer(player) {
		let playerId = Object.keys(this.playersList).length;
		if (playerId >= constants.MAX_PLAYERS) {
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
			this.characterList[playerId] = char;
			console.log('Character added: '+char);
		} else {
			console.log('Player could not be found: '+playerId+' \n\t' +
				' Character addition aborted.');
			return false;
		}
	}
}
