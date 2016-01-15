import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadSongFile, removeTrack,
		 loadTrackSource, unloadTrackSource } from 'actions/index';
import TrackAdd from 'components/trackAdd';
import TrackList from 'components/trackList';

@connect(state => ({
		tracks: Object.keys(state.tracks).map(key => {
			return {
				id: key,
				...state.tracks[key]
			};
		})
	}),
	{ loadSongFile, removeTrack, loadTrackSource, unloadTrackSource }
)
export default class Editor extends Component {
	static propTypes = {
		loadSongFile: PropTypes.func.isRequired,
		loadTrackSource: PropTypes.func.isRequired,
		removeTrack: PropTypes.func.isRequired,
		tracks: PropTypes.arrayOf(PropTypes.shape({
			artist: PropTypes.string,
			id: PropTypes.string.isRequired,
			filename: PropTypes.string.isRequired,
			title: PropTypes.string
		}).isRequired).isRequired,
		unloadTrackSource: PropTypes.func.isRequired
	}
	render() {
		const { loadSongFile, removeTrack, tracks, loadTrackSource, unloadTrackSource } = this.props;

		// let fill = Array.apply(null, new Array(100))
		// 			.map((i, n) => <p key={n}>{n}</p>);

		return (
			<div className="editor-main">
				<div className="editor-track-list">
					<TrackList 
						onRemoveClick={removeTrack} 
						onLoadClick={loadTrackSource} 
						onUnloadClick={unloadTrackSource} 
						tracks={tracks} 
					/>
					<TrackAdd onChange={loadSongFile} />
				</div>
				<div className="editor-deck">
					<div className="stage">
						<p>{'Stage'}</p>
					</div>
					<div className="slice-deck">
						<p>{'Slice Deck'}</p>
					</div>
				</div>

			</div>		
		);
	}
}