import React, { Component, PropTypes } from 'react';
import TrackListItem from './trackListItem';

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
		const {onDecodeClick} = this.props;
		return (
			<ul>
				{ this.props.tracks.map((track) => 
					<li key={track.id}>
						<TrackListItem {...track }
							onDecodeClick={() => onDecodeClick(track.id)} />
					</li>
				)}
			</ul>
		);
	}
}