import React, { Component, PropTypes } from 'react';
import TrackListItem from './trackListItem';

export default class TrackList extends Component {
	static propTypes = {
		onLoadClick: PropTypes.func.isRequired,
		onRemoveClick: PropTypes.func.isRequired,
		onUnloadClick: PropTypes.func.isRequired,
		tracks: PropTypes.arrayOf(PropTypes.shape({
			artist: PropTypes.string,
			id: PropTypes.string.isRequired,
			filename: PropTypes.string.isRequired,
			title: PropTypes.string
		}).isRequired).isRequired
	}

	render() {
		const {onRemoveClick, onLoadClick, onUnloadClick} = this.props;
		return (
			<ul className="track-list">
				{this.props.tracks.map((track) => 
					<li key={track.id} className="track-item">
						<TrackListItem {...track } 
							onRemoveClick={() => onRemoveClick(track)} 
							onLoadClick={() => onLoadClick(track.id)} 
							onUnloadClick={() => onUnloadClick(track.id)} 
						/>
					</li>
				)}
			</ul>
		);
	}
}