/*
 * Copyright (c) 2019. Code contained in this file is written by and the intellectual property of Jesse Green except where otherwise noted. Reuse for educational, open source or reference uses is freely available provided reference to the original source is cited with use. Reuse for commercial purposes is prohibited without the consent of the owner.
 */

import React from 'react';
import View from '../View/View';
import Logger from "../../util/Logger";

export default class ViewCharacterCreation extends View {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<div className={"view-character-creation"}>
				<h2>Character creation</h2>
			</div>
			);
	}
}