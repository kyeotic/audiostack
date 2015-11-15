import { combineReducers } from 'redux';
import {
	READ_SONG_FILE, READ_SONG_FILE_SUCCESS,
	REMOVE_TRACK_START, REMOVE_TRACK_SUCCESS,
	LOAD_TRACK_SOURCE_START, LOAD_TRACK_SOURCE_SUCCESS,
	UNLOAD_TRACK_SOURCE_START, UNLOAD_TRACK_SOURCE_SUCCESS//,
	//DECODE_TRACK, DECODE_TRACK_SUCCESS, PLAY_TRACK, STOP_TRACK
} from 'actions/index';

function tracksById(state = { }, action) {
	switch (action.type) {
	case READ_SONG_FILE:
		return Object.assign({}, state, {
			[action.payload.id]: Object.assign({}, action.payload)
		});
	case READ_SONG_FILE_SUCCESS:
		return Object.assign({}, state, {
			[action.payload.id]: Object.assign({}, state[action.payload.id], action.payload)
		});
	case REMOVE_TRACK_START:
		return state;
	case REMOVE_TRACK_SUCCESS:
		let newState = Object.assign({}, state);
		delete newState[action.payload.id];
		return newState;
	case LOAD_TRACK_SOURCE_START:
		return state;
	case LOAD_TRACK_SOURCE_SUCCESS:
		return Object.assign({}, state, {
			[action.payload.id]: Object.assign({}, state[action.payload.id], {source: action.payload.source, isLoaded: true})
		});
	case UNLOAD_TRACK_SOURCE_START:
		return state;
	case UNLOAD_TRACK_SOURCE_SUCCESS:
		let newTrack = Object.assign({}, state[action.payload], {
			isLoaded: false
		});
		delete newTrack.source;
		return Object.assign({}, state, {
			[action.payload]: newTrack
		});
	default:
		return state;
	}
}

const rootReducer = combineReducers({
	tracksById
});

export default rootReducer;