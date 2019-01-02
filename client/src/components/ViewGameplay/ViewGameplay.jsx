/*
 * Copyright (c) 2019. Code contained in this file is written by and the intellectual property of Jesse Green except where otherwise noted. Reuse for educational, open source or reference uses is freely available provided reference to the original source is cited with use. Reuse for commercial purposes is prohibited without the consent of the owner.
 */

import React from 'react';
import View from '../View/View';
import  * as constants from '../../util/const.js';
import Logger from "../../util/Logger";
import Button from '../Button/Button';

export default class ViewGameplay extends View {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<h2>Game time!</h2>
		)
	}
	
	
}
