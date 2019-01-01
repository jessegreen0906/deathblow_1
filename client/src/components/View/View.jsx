/*
 * Copyright (c) 2019. Code contained in this file is written by and the intellectual property of Jesse Green except where otherwise noted. Reuse for educational, open source or reference uses is freely available provided reference to the original source is cited with use. Reuse for commercial purposes is prohibited without the consent of the owner.
 */

import React from 'react';
import Logger from '../../util/Logger';

export default class View extends React.Component {
	constructor(props) {
		super(props);
		this.startView(props.debugState);
	}
	
	startView(debugState) {
		Logger.debugLog('View started', debugState);
	}
}