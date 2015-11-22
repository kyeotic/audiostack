import React, { Component, PropTypes } from 'react';

export default class TrackListItem extends Component {
	static propTypes = {
		artist: PropTypes.string,
		filename: PropTypes.string.isRequired,
		id: PropTypes.string.isRequired,
		isLoaded: PropTypes.bool.isRequired,
		onLoadClick: PropTypes.func.isRequired,
		onRemoveClick: PropTypes.func.isRequired,
		onUnloadClick: PropTypes.func.isRequired,
		source: PropTypes.shape({
			start: PropTypes.func,
			stop: PropTypes.func
		}),
		title: PropTypes.string
	}

	constructor(...args) {
		super(...args);
		this.isShowingSlice = false;

	}

	createSlice = (...args) => {
		console.log('slicing', ...args);
	}

	playTrack = () => {
		this.props.source.start(0);
	}

	stopTrack = () => {
		this.props.source.stop();
	}

	loadTrack = () => {
		this.props.onLoadClick();
	}

	unloadTrack = () => {
		this.props.onUnloadClick();
	}

	removeTrack = () => {
		this.props.onRemoveClick();
	}

	render() {
		let buttons = [];

		if (this.props.isLoaded) {
			buttons.push(<button type="button" key="play" onClick={this.playTrack}>{'Play'}</button>);
			buttons.push(<button type="button" key="stop" onClick={this.stopTrack}>{'Stop'}</button>);
			buttons.push(<button type="button" key="unload" onClick={this.unloadTrack}>{'Unload'}</button>);
		} else {
			buttons.push(<button type="button" key="load" onClick={this.loadTrack}>{'Load'}</button>);
		}

		return (
			<div>
				<h1>{this.props.filename} <small>{this.props.id}</small></h1>
				<p>{this.props.title}</p>
				<p>{this.props.artist}</p>
				{buttons}
				<button type="button" onClick={this.removeTrack}>{'Remove'}</button>
			</div>
		);
	}
}