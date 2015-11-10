import React, { Component, PropTypes } from 'react';

export default class TrackAdd extends Component {
	static propTypes = {
		onChange: PropTypes.func.isRequired
	}
	constructor(...args) {
		super(...args);
		this.handleOnChange = this.handleOnChange.bind(this);
	}
	handleOnChange(e) {
		this.props.onChange(e.target.files[0]);
		//e.target.files.length = 0;
	}
	render () {
		 return (
		 	<div className="track-add">
		 		<input type="file" onChange={this.handleOnChange} />
		 	</div>
	 	);
	}
}