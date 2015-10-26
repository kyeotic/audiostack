import React, { Component, PropTypes } from 'react';

export default class Track extends Component {
	static propTypes = {
		onDecodeClick: PropTypes.func.isRequired,
		id: PropTypes.string.isRequired,
		filename: PropTypes.string.isRequired,
		isDecoded: PropTypes.bool.isRequired,
		isDecoding: PropTypes.bool.isRequired
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
		return (
			<div>
				<h1>{this.props.filename} <small>{this.props.id}</small></h1>
				{ this.props.isDecoded ?
					<button type="button" onClick={this.playTrack}>Play</button>
					: <button type="button" onClick={this.decodeTrack}>Decode</button> }
			</div>
		);
	}
}