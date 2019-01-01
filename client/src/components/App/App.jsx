/*
 * Copyright (c) 2019. Code contained in this file is written by and the intellectual property of Jesse Green except where otherwise noted. Reuse for educational, open source or reference uses is freely available provided reference to the original source is cited with use. Reuse for commercial purposes is prohibited without the consent of the owner.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import ViewStartScreen from '../ViewStartScreen/ViewStartScreen';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.sessionId = -1;
		this.setSessionIdHandle = this.setSessionId.bind(this);
	}
	
	setSessionId(value) {
		this.sessionId = value;
	}
	
	render() {
		return (
			<ViewStartScreen
				debugState={this.props.debug}
				setSessionId={this.setSessionIdHandle}
				sessionId={this.sessionId}
			/>
		);
	}
}
ReactDOM.render(
	<App debug={true}/>,
	document.getElementById('root')
)