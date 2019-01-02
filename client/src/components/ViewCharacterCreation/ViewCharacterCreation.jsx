/*
 * Copyright (c) 2019. Code contained in this file is written by and the intellectual property of Jesse Green except where otherwise noted. Reuse for educational, open source or reference uses is freely available provided reference to the original source is cited with use. Reuse for commercial purposes is prohibited without the consent of the owner.
 */

import React from 'react';
import View from '../View/View';
import Logger from "../../util/Logger";
import Button from "../Button/Button";
import  * as constants from '../../util/const.js';
import {VIEW_NAME_GAMEPLAY} from "../../util/const";

export default class ViewCharacterCreation extends View {
	constructor(props) {
		super(props);
	}
	
	saveCharacter() {
		let character = {
			health: 100
		};
		Logger.debugLog('Submitting character.', this.props.debug);
		this.sendCharacter(character).then((resp)=> {
			Logger.debugLog('Character submitted.', this.props.debug);
			this.transitionToView(VIEW_NAME_GAMEPLAY);
		}, (resp) => {
			this.props.serverConnectionFailed();
		});
	
	}
	
	async sendCharacter(character) {
		const response = await fetch(constants.SERVER_ADDR+constants.API_SAVE_CHAR, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				sessionId: this.props.sessionId,
				playerId: this.props.playerId,
				character: character
			})
		})
		const responseJson = response.json();
		return responseJson;
	}
	
	render() {
		return (
			<div className={"view-character-creation"}>
				<h2>Character creation</h2>
				<Button
					text={"Submit"}
					onClick={this.saveCharacter.bind(this)}
				/>
			</div>
			);
	}
}