import {INCREMENT} from "../Constant";

const initState = 0;

export default function Count(preState = initState, newState) {
	const {type, data} = newState;
	switch (type) {
		case INCREMENT:
			return data;
		default:
			return preState;
	}
}
