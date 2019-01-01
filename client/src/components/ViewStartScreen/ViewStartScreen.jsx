/*
 * Copyright (c) 2019. Code contained in this file is written by and the intellectual property of Jesse Green except where otherwise noted. Reuse for educational, open source or reference uses is freely available provided reference to the original source is cited with use. Reuse for commercial purposes is prohibited without the consent of the owner.
 */

import React from 'react';
import View from '../View/View';
import Button from '../Button/Button';
import Logger from "../../util/Logger";

export default class ViewStartScreen extends View {
	constructor(props) {
		super(props);
		this.startNewGameHandler = this.startNewGame.bind(this);
	}
	
	startNewGame() {
		Logger.debugLog('Starting new game', this.props.debugState);
		Logger.debugLog('Session ID = '+this.props.sessionId, this.props.debugState);
		this.props.setSessionId(this.requestNewSession());
		Logger.debugLog('Session ID = '+this.props.sessionId, this.props.debugState);
	}
	
	requestNewSession() {
		return -2;
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