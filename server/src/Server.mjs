/*
 * Copyright (c) 2019. Code contained in this file is written by and the intellectual property of Jesse Green except where otherwise noted. Reuse for educational, open source or reference uses is freely available provided reference to the original source is cited with use. Reuse for commercial purposes is prohibited without the consent of the owner.
 */

import { Game } from "./classes/Game";
import restify from "restify";
//var restify = require('restify');
var gameList = {};

function createNewSession(req, res, next) {
	let gameId = 2;
	console.log('Creating new session');
	gameList[Object.keys(gameList).length] = new Game({gameId:gameId})
	
	
	res.send({gameId});
	next();
}

var server = restify.createServer();
server.use(
	function crossOrigin(req,res,next){
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "X-Requested-With");
		return next();
	}
);
server.get('/newSession', createNewSession);
// server.head('/newSession', respond);

server.listen(9301, function() {
	console.log('%s listening at %s', server.name, server.url);
});