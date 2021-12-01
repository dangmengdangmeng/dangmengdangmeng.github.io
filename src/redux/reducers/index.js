import {combineReducers} from "redux";
import Count from './Count';

const allReducers = combineReducers({
	count:Count
});
export default allReducers;
