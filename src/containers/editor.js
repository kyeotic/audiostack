import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadSongFile, removeTrack } from 'actions/index';
import TrackAdd from 'components/trackAdd';
import TrackList from 'components/trackList';

@connect(state => ({
		tracks: Object.keys(state.tracksById).map(key => {
			return {
				id: key,
				...state.tracksById[key]
			};
		})
	}),
	{ loadSongFile, removeTrack }
)
export default class Editor extends Component {
	
	render() {
		const { loadSongFile, removeTrack, tracks } = this.props;

		return (
			<div>
				<TrackAdd onChange={loadSongFile} />
				<TrackList onRemoveClick={removeTrack} 
							tracks={this.props.tracks} />
			</div>			
		);
	}
}