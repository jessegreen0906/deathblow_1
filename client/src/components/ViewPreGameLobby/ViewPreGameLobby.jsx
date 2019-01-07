/*
 * Copyright (c) 2019. Code contained in this file is written by and the intellectual property of Jesse Green except where otherwise noted. Reuse for educational, open source or reference uses is freely available provided reference to the original source is cited with use. Reuse for commercial purposes is prohibited without the consent of the owner.
 */

import React from 'react';
import View from '../View/View';
import  * as constants from '../../util/const.js';
import Logger from "../../util/Logger";
import Button from '../Button/Button';

export default class ViewPreGameLobby extends View {
	constructor(props) {
		super(props);
		this.state = {
			maxPlayers: 0,
			playersList: {},
			gameStarting: false
		}
		this.getLobbyDetails = this.getLobbyDetails.bind(this);
		this.renderListItems = this.renderListItems.bind(this);
		this.updateLobbyDetails = this.updateLobbyDetails.bind(this);
	}
	
	componentDidMount() {
		Logger.debugLog('Retrieving lobby details', this.props.debugState);
		this.updateLobbyDetails();
	}
	
	updateLobbyDetails() {
		this.getLobbyDetails().then((resp)=>{
			let gameStarting = (resp.gameStatus > 0);
			this.setState({
				maxPlayers: resp.maxPlayers,
				playersList: resp.playersList,
				gameStarting: gameStarting
			});
		}, (resp)=> {
			this.props.serverConnectionFailed();
		})
		window.setTimeout(this.updateLobbyDetails, 1000);
	}
	
	async getLobbyDetails() {
		const response = await fetch(constants.SERVER_ADDR+constants.API_GET_LOBBY_DETAILS,{
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				sessionId: this.props.sessionId,
			})
		});
		const responseJson = response.json();
		return responseJson;
	}
	
	renderListItems(players) {
		let listItems = [];
		for (var player in players) {
			listItems.push(<li key={player}>{players[player].playerName}</li>);
		}
		
		while (listItems.length < this.state.maxPlayers) {
			listItems.push(<li key={listItems.length}>Waiting for player to join</li>)
		}
		return listItems;
	}
	
	render() {
		let listOfPlayers = this.renderListItems(this.state.playersList);
		if (this.state.gameStarting) {
			let footer = <p>Game starting...</p>;
		} else {
			let footer = <Button
				text={'Start game'}
				onClick={this.transitionToView(constants.VIEW_NAME_CHAR_CREATION)}
			/>;
		}
		return(
			<div>
				<h2>Pre game lobby</h2>
				<ul>
					{listOfPlayers}
				</ul>
				{footer}
			</div>
		)
	}
}