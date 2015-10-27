import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadSongFile, decodeTrack } from 'actions/index';
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
	{ loadSongFile, decodeTrack }
)
export default class Editor extends Component {
	
	render() {
		const { loadSongFile, decodeTrack, tracks } = this.props;

		return (
			<div>
				<TrackAdd onChange={loadSongFile} />
				<TrackList onDecodeClick={decodeTrack} 
							tracks={this.props.tracks} />
			</div>			
		);
	}
}