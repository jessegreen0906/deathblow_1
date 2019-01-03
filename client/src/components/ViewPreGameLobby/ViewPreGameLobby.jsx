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
		this.state = {
			maxPlayers: 0,
			playersList: {}
		}
		this.getLobbyDetails = this.getLobbyDetails.bind(this);
		this.renderListItem = this.renderListItem.bind(this);
	}
	
	componentDidMount() {
		Logger.debugLog('Retrieving lobby details', this.props.debugState);
		this.getLobbyDetails().then((resp)=>{
			this.setState({
				maxPlayers: resp.maxPlayers,
				playersList: resp.playersList
			});
		}, (resp)=> {
			this.props.serverConnectionFailed();
		})
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
	
	renderListItem(player) {
		return <li key={player}>{this.state.playersList[player].playerName}</li>
	}
	
	render() {
		Object.keys(this.state.playersList).map.bind(this);
		let listOfPlayers = Object.keys(this.state.playersList).map(this.renderListItem(player));
		
		return(
			<div>
				<h2>Pre game lobby</h2>
				<ul>
					{listOfPlayers}
				</ul>
			</div>
		)
	}
}