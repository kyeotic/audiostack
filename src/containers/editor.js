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
	static propTypes = {
		loadSongFile: PropTypes.func.isRequired,
		removeTrack: PropTypes.func.isRequired,
		tracks: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.string.isRequired,
			filename: PropTypes.string.isRequired
		}).isRequired).isRequired
	}
	render() {
		const { loadSongFile, removeTrack, tracks } = this.props;

		return (
			<div>
				<TrackAdd onChange={loadSongFile} />
				<TrackList onRemoveClick={removeTrack} 
					tracks={tracks} 
				/>
			</div>			
		);
	}
}