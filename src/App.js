import React, { Component } from 'react';
import './App.css';
import * as serviceWorker from './serviceWorker';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			promptRefresh: false,
		};
	}

	componentDidMount() {
		serviceWorker.register({
			onUpdate: (registration) => {
				if (registration && registration.waiting) {
					this.setState({ promptRefresh: true });
				} else {
					this.setState({ promptRefresh: false });
				}
			},
		});
	}

	handleRefreshForUpdate = () => {
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker
				.getRegistration()
				.then((reg) => {
					reg.waiting.postMessage({ type: 'SKIP_WAITING' });
					window.location.reload();
				})
				.catch((err) => console.log('Could not get registration: ', err));
		}
	};

	render() {
		const refreshButton = this.state.promptRefresh ? (
			<button onClick={this.handleRefreshForUpdate}>Refresh for updates</button>
		) : null;

		return (
			<div className='App'>
				{refreshButton}
				<h1>All Hail</h1>
				<img alt='fill muz' src='https://www.fillmurray.com/300/200' />
			</div>
		);
	}
}

export default App;
