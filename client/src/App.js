import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './Home';
import { MapEditor } from './MapEditor';
import MapForm from './MapForm';
import NavBar from './NavBar';

export class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<NavBar />
				<section className='section'>
					<div className='container'>
						<Routes>
							<Route exact path='/' element={<Home />} />
							<Route path='/map/:mapId' element={<MapEditor />} />
							<Route
								exact
								path='/maps/new'
								element={<MapForm />}
							/>
						</Routes>
					</div>
				</section>
			</div>
		);
	}
}
