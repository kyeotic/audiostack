import React, { Component, PropTypes } from 'react';
import Track from './track';

export default class TrackList extends Component {
	static propTypes = {
		onDecodeClick: PropTypes.func.isRequired,
		tracks: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.string.isRequired,
			filename: PropTypes.string.isRequired,
			isDecoded: PropTypes.bool.isRequired,
			isDecoding: PropTypes.bool.isRequired
		}).isRequired).isRequired
	}

	render() {
		return (
			<ul>
				{ this.props.tracks.map((track, index) => 
					<li>
						<Track {...track }
							key={index}
							onDecodeClick={() => this.props.onDecodeClick(track.id)} />
					</li>
				)}
			</ul>
		);
	}
}