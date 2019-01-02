/*
 * Copyright (c) 2019. Code contained in this file is written by and the intellectual property of Jesse Green except where otherwise noted. Reuse for educational, open source or reference uses is freely available provided reference to the original source is cited with use. Reuse for commercial purposes is prohibited without the consent of the owner.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import ViewStartScreen from '../ViewStartScreen/ViewStartScreen';
import Logger from "../../util/Logger";
import ViewCharacterCreation
	from "../ViewCharacterCreation/ViewCharacterCreation";
import ViewGameplay from "../ViewGameplay/ViewGameplay";
import  * as constants from '../../util/const.js';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sessionId: '',
			currentView: 'startScreen',
			playerName: 'Player',
			playerId: -1
		}
		this.transitionToViewHandle = this.transitionToView.bind(this);
		this.setSessionIdHandle = this.setSessionId.bind(this);
		this.setPlayerNameHandle = this.setPlayerName.bind(this);
		this.serverConnectionFailedHandle = this.serverConnectionFailed.bind(this);
		this.playerIdAssignmentHandle = this. playerIdAssignment.bind(this);
	}
	
	setSessionId(value) {
		this.setState({sessionId: value}, () => {
			Logger.debugLog('In the app, sessionID = '+this.state.sessionId, this.props.debug);
		});
	}
	
	setPlayerName(value) {
		this.setState({playerName: value}, () => {
			Logger.debugLog('In the app, Player name = '+this.state.playerName, this.props.debug);
		});
	}
	
	serverConnectionFailed() {
		// TODO: give user feedback
		Logger.errorLog('App method server connection failed');
	}
	
	transitionToView(targetView) {
		this.setState({currentView: targetView}, () => {
			Logger.debugLog('Changing to view '+targetView, this.props.debug);
		});
	}
	
	playerIdAssignment(playerId) {
		this.setState({playerId: playerId}, () => {
			Logger.debugLog('Set player id to '+playerId, this.props.debug);
		})
	}
	
	render() {
		let view;
		switch(this.state.currentView) {
			case constants.VIEW_NAME_START_SCREEN:
				view = <ViewStartScreen
					debugState={this.props.debug}
					serverConnectionFailed={this.serverConnectionFailedHandle}
					transitionToView={this.transitionToViewHandle}
					setSessionId={this.setSessionIdHandle}
					setPlayerName={this.setPlayerNameHandle}
					assignPlayerId={this.playerIdAssignmentHandle}
					sessionId={this.state.sessionId}
					playerName={this.state.playerName}
					playerId={this.state.playerId}
				/>;
				break;
			case constants.VIEW_NAME_CHAR_CREATION:
				view = <ViewCharacterCreation
					debugState={this.props.debug}
					serverConnectionFailed={this.serverConnectionFailedHandle}
					transitionToView={this.transitionToViewHandle}
					sessionId={this.state.sessionId}
					playerId={this.state.playerId}
				/>;
				break;
			case constants.VIEW_NAME_GAMEPLAY:
				view = <ViewGameplay
					debugState={this.props.debug}
					serverConnectionFailed={this.serverConnectionFailedHandle}
					transitionToView={this.transitionToViewHandle}
				/>;
				break;
			default:
				Logger.errorLog('Cannot find view to transition to.');
				view = <div></div>;
		}
		return (
			<div className={"app-deathblow"}>
				{view}
			</div>
		);
	}
}
ReactDOM.render(
	<App debug={true}/>,
	document.getElementById('root')
)