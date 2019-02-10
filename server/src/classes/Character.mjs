import * as constants from '../const';

export class Character {
	constructor(props) {
		this[constants.CHAR_ATK_RANGE] = props[constants.CHAR_ATK_RANGE];
		this[constants.CHAR_HEALTH] = props[constants.CHAR_HEALTH];
		this[constants.CHAR_LUCK] = props[constants.CHAR_LUCK];
		this[constants.CHAR_SPEED] = props[constants.CHAR_SPEED];
		this[constants.CHAR_STRENGTH] = props[constants.CHAR_STRENGTH];
		this.x = 0;
		this.y = 0;
	}

	setX(x) {
		this.x = x;
	}
	setY(y) {
		this.y = y;
	}
}