import shortId from 'shortid';
import * as store from 'audio/audio-store';
import actionCreator from './actionCreator';

export const SHOW_TRACK_SLICE = 'SHOW_TRACK_SLICE';
export const HIDE_TRACK_SLICE = 'HIDE_TRACK_SLICE';
export const CREATE_SLICE_START = 'CREATE_SLICE_START';
export const CREATE_SLICE_SUCCESS = 'CREATE_SLICE_SUCCESS';

export let showTrackSlice = actionCreator(SHOW_TRACK_SLICE);
export let hideTrackSlice = actionCreator(HIDE_TRACK_SLICE);

let createSliceStart = actionCreator(CREATE_SLICE_START, slice => slice);
let createSliceSuccess = actionCreator(CREATE_SLICE_SUCCESS, sliceId => ({sliceId}));

export function createSlice(slice) {
	return (dispatch, getState) => {
		dispatch(createSliceStart(slice));
		return store.saveSlice(slice)
			.then(slice => dispatch(createSliceSuccess(slice.id)));
	}
}