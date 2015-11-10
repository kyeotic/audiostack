import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import App from './app';

export default class Root extends Component {
	static propTypes = {
		store: PropTypes.isRequired
	}
	render() {
		const { store } = this.props;
		return (
			<Provider store={store}>
				<App />
			</Provider>
		);
	}
}