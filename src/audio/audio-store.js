import {bufferToBase64, base64ToBuffer } from 'audio/audio-buffer-encoder';
import localforage from 'localforage';

export function saveTrack(track) {
	return localforage.setItem(track.id, track);
}

export function loadTrack(trackId) {
	return localforage.getItem(trackId);
}

export function getTrackIds() {
	return localforage.keys();
}

export function loadAllTracks() {
	return getTrackIds()
		.then(keys => Promise.all(keys.map(loadTrack)));
}