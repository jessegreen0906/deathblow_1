/*
 * Copyright (c) 2019. Code contained in this file is written by and the intellectual property of Jesse Green except where otherwise noted. Reuse for educational, open source or reference uses is freely available provided reference to the original source is cited with use. Reuse for commercial purposes is prohibited without the consent of the owner.
 */

import { Game } from "./classes/Game";
import restify from "restify";
import corsMiddleware from "restify-cors-middleware";
import * as constants from './const';
var gameList = {};

function createNewSession(req, res, next) {
	let gameId = Object.keys(gameList).length;
	console.log('Creating new session');
	gameList[Object.keys(gameList).length] = new Game({
		gameId:gameId,
		maxPlayers: constants.MAX_PLAYERS
	});
	
	
	res.send({result:true, gameId});
	next();
}

function joinSession(req, res, next) {
	let gameId = req.params.sessionId;
	let playerName = req.params.playerName;
	let playerId = gameList[gameId].addPlayer({name:playerName});
	if(playerId != -1){
		playerName = gameList[gameId].playersList[playerId].playerName;
		
		res.send({result:true, playerId, playerName});
		next();
	} else {
		res.send({
			result:false,
			messsage: 'Player could not be added'
		});
		next();
	}
}

function saveCharacter(req, res, next) {
	let gameId = req.params.sessionId;
	let playerId = req.params.playerId;
	let char = req.params.character;
	
	if (gameList[gameId] != null) {
		gameList[gameId].addCharacter(playerId, char);

		if(gameList[gameId].gameStatus == 2) {
			gameList[gameId].calculateGame();
		}
		res.send({result:true});
		next();
	} else {
		res.send({result: false});
	}
	
}

function getLobbyDetails(req, res, next) {
	let gameId = req.params.sessionId;
	
	if(gameList[gameId] != null) {
		let game = gameList[gameId];
		res.send({
			result: true,
			maxPlayers: game.maxPlayers,
			playersList: game.playersList,
			gameStatus: game.gameStatus
		});
		next();
	} else {
		res.send({
			result: false
		});
		next();
	}
	
}

function startGame(req, res, next){
	let gameId = req.params.sessionId;
	
	if(gameList[gameId] != null) {
		gameList[gameId].setGameStatus(1);
		res.send({
			result: true
		});
		next();
	} else {
		res.send({
			result: false
		});
		next();
	}
}

var server = restify.createServer();
const cors = corsMiddleware({
	origins:['*'],
	allowHeaders: ['*'],
});
server.pre(cors.preflight);
server.use(cors.actual);
server.use(restify.plugins.queryParser({
	mapParams: true
}));
server.use(restify.plugins.bodyParser({
	mapParams: true
}));

server.get('/newSession', createNewSession);
server.post('/joinSession', joinSession);
server.post('/saveCharacter', saveCharacter);
server.post('/getLobbyDetails', getLobbyDetails);
server.post('/startGame', startGame);

server.listen(9301, function() {
	console.log('%s listening at %s', server.name, server.url);
});