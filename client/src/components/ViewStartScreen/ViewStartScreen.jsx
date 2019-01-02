/*
 * Copyright (c) 2019. Code contained in this file is written by and the intellectual property of Jesse Green except where otherwise noted. Reuse for educational, open source or reference uses is freely available provided reference to the original source is cited with use. Reuse for commercial purposes is prohibited without the consent of the owner.
 */

import React from 'react';
import View from '../View/View';
import  * as constants from '../../util/const.js';
import Logger from "../../util/Logger";
import Button from '../Button/Button';

export default class ViewStartScreen extends View {
	constructor(props) {
		super(props);
		this.startNewGameHandler = this.startNewGame.bind(this);
	}
	
	startNewGame() {
		Logger.debugLog('Starting new game', this.props.debugState);
		Logger.debugLog('Session ID = '+this.props.sessionId, this.props.debugState);
		this.requestNewSession().then( (sessionId) => {
			this.props.setSessionId(sessionId.gameId);
			Logger.debugLog('Session ID = '+this.props.sessionId, this.props.debugState);
			this.joinGame().then((resp) => {
				Logger.debugLog('Successfully joined session', this.props.debugState);
				this.props.assignPlayerId(resp.playerId);
				this.transitionToView(constants.VIEW_NAME_CHAR_CREATION);
			}, () => {
				this.props.serverConnectionFailed();
			})
		}, ()=>{
			this.props.serverConnectionFailed();
		});
		
		this.props.setSessionId
	}
	
	async joinGame() {
		const response = await fetch('http://localhost:9301/joinSession', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				sessionId: this.props.sessionId,
				playerName: this.props.playerName
			})
		});
		const responseJson = response.json();
		return responseJson;
	}
	
	async requestNewSession() {
		Logger.debugLog('Requesting new session from the server');
		const response = await fetch('http://localhost:9301/newSession')
		const responseJson = response.json();
		return responseJson;
	}
	
	render() {
		return (
			<div className="view" id="view-start-screen">
				<h1>DEATHBLOW</h1>
				<Button
					text="Start new game"
					debugStatus={this.props.debugStatus}
					onClick={this.startNewGameHandler}
				/>
			</div>
		);
	}
}