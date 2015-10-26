import React from 'react';
import { render } from 'react-dom';
import Root from './containers/root';
import configureStore from './store/configureStore';

const store = configureStore();
const appRoot = document.getElementById('app-host');

render(<Root store={store} />, appRoot);