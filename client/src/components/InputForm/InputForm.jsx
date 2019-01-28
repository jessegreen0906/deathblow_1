import React from 'react';
import InputToggle from '../InputToggle/InputToggle';
import Logger from "../../util/Logger";

export default class InputForm extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;

	}

	buildFormInputs(inputs){
		let output = [];
		for (let i in inputs) {
			switch (inputs[i]["type"]) {
				case 'toggle':
					output.push(<InputToggle
						name={i.toString()}
						question={inputs[i]["question"]}
						label1={inputs[i]['label1']}
						label2={inputs[i]['label2']}
						value={inputs[i]['value']}
						on_Change={this.props.on_Change}
					/>);
				break;
				default:
					Logger.errorLog('Cannot find input type');
				break;
			}
		}
		return output;
	}

	render() {
		let inputs = this.buildFormInputs(this.props.formDef);
		return <form>
			{inputs}
		</form>
	}
}
