import React from 'react';
import { render } from 'react-dom';
import Root from './containers/root';
import configureStore from './store/configureStore';
import { loadAllTracks } from 'audio/audio-store';


const appRoot = document.getElementById('app-host');

loadAllTracks().then(tracks => {
	const store = configureStore({
		tracksById: tracks.reduce((obj, track) => {
			obj[track.id] = track;
			return obj
		}, {})
	});
	render(<Root store={store} />, appRoot);
});

