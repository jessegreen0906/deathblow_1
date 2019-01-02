/*
 * Copyright (c) 2019. Code contained in this file is written by and the intellectual property of Jesse Green except where otherwise noted. Reuse for educational, open source or reference uses is freely available provided reference to the original source is cited with use. Reuse for commercial purposes is prohibited without the consent of the owner.
 */
import {Player} from "./Player";

export class Game {
	constructor(props) {
		this.gameId = props.gameId;
		console.log('New game = '+this.gameId);
		
		this.playersList = {};
		this.characterList = {};
	}
	
	addPlayer(player) {
		let playerId = Object.keys(this.playersList).length;
		this.playersList[playerId] = new Player({playerName:player.name})
		
		console.log('Game '+this.gameId+': added player '+this.playersList[playerId].playerName+'.');
		return playerId;
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
