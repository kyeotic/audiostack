import React from 'react';
import { render } from 'react-dom';
import Root from './containers/root';
import Splash from './containers/splash';
import configureStore from './store/configureStore';
import { loadAllTracks } from 'audio/audio-store';


const appRoot = document.getElementById('app-host');

render(<Splash />, appRoot);

loadAllTracks().then(tracks => {
	const store = configureStore({
		tracks: tracks.reduce((obj, track) => {
			obj[track.id] = track;
			return obj
		}, {})
	});
	render(<Root store={store} />, appRoot);
});

