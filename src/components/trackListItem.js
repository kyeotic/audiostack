import React, { Component, PropTypes } from 'react';
import readTags from 'audio/tag-reader';

export default class TrackListItem extends Component {
	static propTypes = {
		onDecodeClick: PropTypes.func.isRequired,
		id: PropTypes.string.isRequired,
		filename: PropTypes.string.isRequired
	}

	constructor(...args) {
		super(...args);
		this.playTrack = this.playTrack.bind(this);
		this.decodeTrack = this.decodeTrack.bind(this);
	}

	playTrack() {
		this.props.source.start(0);
	}

	decodeTrack() {
		this.props.onDecodeClick();
	}

	render() {
		let button;

		return (
			<div>
				<h1>{this.props.filename} <small>{this.props.id}</small></h1>
				<p>{this.props.title}</p>
				<p>{this.props.artist}</p>
				<button type="button" onClick={this.playTrack}>Play</button>
			</div>
		);
	}
}