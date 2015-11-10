import React, { Component, PropTypes } from 'react';

export default class TrackListItem extends Component {
	static propTypes = {
		artist: PropTypes.string.isRequired,
		filename: PropTypes.string.isRequired,
		id: PropTypes.string.isRequired,
		onRemoveClick: PropTypes.func.isRequired,
		source: PropTypes.isRequired,
		title: PropTypes.string.isRequired
	}

	constructor(...args) {
		super(...args);
		this.playTrack = this.playTrack.bind(this);
		this.removeTrack = this.removeTrack.bind(this);
	}

	playTrack() {
		this.props.source.start(0);
	}

	removeTrack() {
		this.props.onRemoveClick();
	}

	render() {
		let button;

		return (
			<div>
				<h1>{this.props.filename} <small>{this.props.id}</small></h1>
				<p>{this.props.title}</p>
				<p>{this.props.artist}</p>
				<button type="button" onClick={this.playTrack}>{'Play'}</button>
				<button type="button" onClick={this.removeTrack}>{'Remove'}</button>
			</div>
		);
	}
}