import React, { Component, PropTypes } from 'react';
import ReactSlider from 'react-slider';
import { ReusableAudioSourceNode } from 'audio/audio-source';
import { sliceAudioBuffer } from 'audio/audio-slicer';

export default class TrackSlice extends Component {
	static propTypes = {
		onCreate: PropTypes.func.isRequired,
		source: PropTypes.shape({
			buffer: PropTypes.shape({
				duration: PropTypes.number
			})
		}) 
	}

	constructor(...args) {
		super(...args);
		this.minValue = 0;
		this.maxValue = Math.floor(this.props.source.buffer.duration);
		this.state = {values: [this.minValue, this.maxValue], subSlice: false};
	}

	createSlice = () => {
		this.createSliceSource()
			.then(this.props.onCreate);
	}

	createSliceSource() {
		this.sliceSource = new ReusableAudioSourceNode();
		let values = this.state.values;
		return sliceAudioBuffer(this.props.source.buffer, values[0] * 1000, values[1] * 1000)
			.then(buffer => this.sliceSource.buffer = buffer)
			.then(() => this.sliceSource);
	}

	preview = () => {
		this.createSliceSource()
			.then(slice => slice.start(0))
			.catch(error => console.log(error));
	}

	stopPreview = () => {
		this.sliceSource.stop();
	}

	onChange = (values) => {
		//console.log('updating values', values);
		this.setState({values: values});
	}

	toggleSubSlice = () => {
		this.setState({
			subSlice : !this.state.subSlice,
			subSliceValues: this.state.values.slice(0)
		});
	}

	render() {
		let maxValue = this.state.subSlice ? this.state.subSliceValues[1] : this.maxValue,
			minValue = this.state.subSlice ? this.state.subSliceValues[0] : this.minValue;

		return (			
			<div>
				<button type="button" className="btn" onClick={this.preview}>{'Preview'}</button>
				<button type="button" className="btn" onClick={this.stopPreview}>{'Stop'}</button>
				<button type="button" className="btn" onClick={this.createSlice}>{'Slice'}</button>
				<button type="button" className="btn" onClick={this.toggleSubSlice}>{'Toggle Fine Slice'}</button>
				<p>{`Start: ${this.state.values[0]} Stop: ${this.state.values[1]}`}</p>
				<div className="slider-container">
					<ReactSlider 
						value={this.state.values}
						max={maxValue}
						min={minValue}
						minDistance={this.state.subSlice ? 0.1 : 1}
						step={this.state.subSlice ? 0.1 : 1}
						onChange={this.onChange}
						pearling
						withBars 
					/>
				</div>
			</div>
		);
	}
}