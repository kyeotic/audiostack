import { sourceFromBuffer } from 'audio/audio-source';
import localforage from 'localforage';

const trackStore = localforage.createInstance({name: 'tracks'});
const trackBufferStore = localforage.createInstance({name: 'buffers'});
const sliceStore = localforage.createInstance({name: 'slices'});

export function saveTrack(track) {
	let trackToSave = Object.assign({}, track);
	delete trackToSave.source;
	return trackStore.setItem(track.id, trackToSave)
		.then(() => track);
}

export function loadTrack(trackId) {
	return trackStore.getItem(trackId);
}

export function saveTrackBuffer(trackId, buffer) {
	return trackBufferStore.setItem(trackId, {buffer})
		.then(() => buffer);
}

export function loadTrackBuffer(trackId) {
	return trackBufferStore.getItem(trackId)
		.then(r => r.buffer);
}

export function removeTrack(trackId) {
	return Promise.all([
		trackStore.removeItem(trackId),
		trackBufferStore.removeItem(trackId)
	]);
}

export function getTrackIds() {
	return trackStore.keys();
}

export function loadAllTracks() {
	return getTrackIds()
		.then(keys => Promise.all(keys.map(loadTrack)))
		.then(tracks => Promise.all(tracks.map(track => {
			if (track.isLoaded)
				return new Promise((resolve) => {
					loadTrackBuffer(track.id)
						.then(sourceFromBuffer)
						.then(source => {
							track.source = source;
							resolve(track);
						});
				});
			return Promise.resolve(track);
		})))
}

export function saveSlice(slice) {
	return sliceStore.setItem(slice.id, slice)
		.then(() => slice);
}

export function loadSlice(sliceId) {
	return sliceStore.getItem(sliceId);
}

export function removeSlice(sliceId) {
	return sliceStore.removeItem(sliceId);
}

export function getSliceIds() {
	return sliceStore.keys();
}

export function loadAllSlices() {
	return getSliceIds()
		.then(keys => Promise.all(keys.map(loadSlice)));
}