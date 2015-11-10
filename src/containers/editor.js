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
			<div className="editor-main">
				<div className="editor-track-list">
					<TrackList onRemoveClick={removeTrack} 
						tracks={tracks} 
					/>
					<TrackAdd onChange={loadSongFile} />
				</div>
				<div className="editor-deck">
					<div className="stage">
						{'Stage'}
					</div>
					<div className="slice-deck">
						{'Slice Deck'}
					</div>
				</div>

			</div>		
		);
	}
}