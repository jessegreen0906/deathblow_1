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
		this.state = {
			joinSessionId: '',
			joinDialogActiveClass: 'inactive',
			startMenuActiveClass: 'active'
		};
		this.joinDialogOnChange = this.joinDialogOnChange.bind(this);
		this.playerNameDialogOnChange = this.playerNameDialogOnChange.bind(this);
		this.joinGame = this.joinGame.bind(this);
	}
	
	startNewGame() {
		Logger.debugLog('Starting new game', this.props.debugState);
		Logger.debugLog('Session ID = '+this.props.sessionId, this.props.debugState);
		this.requestNewSession().then( (sessionId) => {
			this.props.setSessionId(sessionId.gameId);
			Logger.debugLog('Session ID = '+this.props.sessionId, this.props.debugState);
			this.joinGame(null);
		}, ()=>{
			this.props.serverConnectionFailed();
		});
		
		this.props.setSessionId
	}
	
	enableJoinGameDialog() {
		this.setState({joinDialogActiveClass: 'active', startMenuActiveClass: 'inactive'});
	}
	
	joinDialogOnChange(event) {
		this.props.setSessionId(event.target.value);
	}
	
	playerNameDialogOnChange(event) {
		this.props.setPlayerName(event.target.value);
	}
	
	joinGame(event) {
		this.sendJoinGameReq().then((resp) => {
			if (resp.result) {
				Logger.debugLog('Successfully joined session', this.props.debugState);
				this.props.assignPlayerId(resp.playerId);
				this.props.setPlayerName(resp.playerName);
				this.transitionToView(constants.VIEW_NAME_CHAR_CREATION);
			} else {
				Logger.debugLog('Could not join session.', this.props.debugState);
				Logger.debugLog(resp.message, this.props.debugState);
			}
		}, () => {
			this.props.serverConnectionFailed();
		});
		if(event != null) {
			event.preventDefault();
		}
	}
	
	async sendJoinGameReq() {
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
		Logger.debugLog('Requesting new session from the server', this.props.debugState);
		const response = await fetch('http://localhost:9301/newSession')
		const responseJson = await response.json();
		if(responseJson.result) {
			return responseJson;
		} else {
			return PromiseRejectionEvent;
		}
	}
	
	render() {
		return (
			<div className="view" id="view-start-screen">
				<h1>DEATHBLOW</h1>
				<div className={['start-menu', this.state.startMenuActiveClass].join(' ')}>
					<Button
						text="Start new game"
						debugStatus={this.props.debugStatus}
						onClick={this.startNewGameHandler}
					/>
					<Button
						text={"Join a game"}
						onClick={this.enableJoinGameDialog.bind(this)}
					/>
				</div>
				<div className={['player-name-dialog', this.state.playerNameDialogActiveClass].join(' ')}>
					<form>
						<label>Player name: </label>
						<input
							type={"text"}
							value={this.props.playerName}
							onChange={this.playerNameDialogOnChange}
						/>
						<input
							onClick={this.joinGame}
							type={"submit"}
						/>
					</form>
				</div>
				<div className={['join-dialog', this.state.joinDialogActiveClass].join(' ')}>
					<form>
						<label>Game ID: </label>
						<input
							type={"text"}
							value={this.props.sessionId}
							onChange={this.joinDialogOnChange}
						/>
						<input
							onClick={this.joinGame}
							type={"submit"}
						/>
					</form>
				</div>
				<div className={['pre-game-lobby'].join(' ')}>
				
				</div>
			</div>
		);
	}
}