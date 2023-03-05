import React from 'react';
import {Routes, Route, HashRouter} from 'react-router-dom';
import './App.css';
import Card from './components/card/card.js';
import DogFact from './components/dogFacts/DogFact.js';
import Airbnb from './components/airBnB/Airbnb.js';
import NavBar from './components/navBar/navBar.js';

function App() {
	return (
		<HashRouter>
			<div>
				<NavBar />
				<Card>
					<Routes>
						<Route
							path='/'
							element={
								<div>
									<h1>
										Welcome to my personal webpage, built with react and
										mongodb!
									</h1>
									<img src='./me.jpg' alt='me' className='card-img-top' />
								</div>
							}
						/>
						<Route path='/dog-fact' element={<DogFact />} />
						<Route path='/airbnb' element={<Airbnb />} />
					</Routes>
				</Card>
			</div>
		</HashRouter>
	);
}

export default App;
