import { combineReducers } from 'redux';
import tracks from './tracks';
import slices from './slices';

const rootReducer = combineReducers({
	tracks,
	slices
});

export default rootReducer;