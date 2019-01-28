import React from 'react';
import Input from "../Input/Input";

export default class InputToggle extends Input {
	constructor(props) {
		super(props);
	}

	render() {
		return <div>
			<span>{this.props.question}</span>
			<span>{this.props.label1}</span>
			<input type="checkbox" name={this.props.name} defaultChecked={this.props.value} onChange={this.props.on_Change}/>
			<span>{this.props.label2}</span>
		</div>;
	}
}