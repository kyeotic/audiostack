import shortId from 'shortid';
import { sourceFromBuffer } from 'audio/audio-source';
import * as store from 'audio/audio-store';
import actionCreator from './actionCreator';

export const SHOW_TRACK_SLICE = 'SHOW_TRACK_SLICE';
export const HIDE_TRACK_SLICE = 'HIDE_TRACK_SLICE';
export const CREATE_SLICE_START = 'CREATE_SLICE_START';
export const CREATE_SLICE_SUCCESS = 'CREATE_SLICE_SUCCESS';

export let showTrackSlice = actionCreator(SHOW_TRACK_SLICE);
export let hideTrackSlice = actionCreator(HIDE_TRACK_SLICE);

let createSliceStart = actionCreator(CREATE_SLICE_START);
let createSliceSuccess = actionCreator(CREATE_SLICE_SUCCESS);

export function createSlice(trackId, start, length) {
	return (dispatch, getState) => {
		let track = getState().tracksById[trackId];
		dispatch(createSliceStart(trackId));
	}
}