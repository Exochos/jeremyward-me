import React from 'react';
import {Routes, Route, HashRouter} from 'react-router-dom';
import './App.css';
import Card from './components/card/card.js';
import DogFact from './components/dogFacts/DogFact.js';
import Airbnb from './components/airBnB/Airbnb.js';
import NavBar from './components/navBar/navBar.js';
import Main from './components/main/main.js';

function App() {
	return (
		<HashRouter>
			<div>
				<NavBar />
				<Card>
					<Routes>
						<Route path='/'	element={<Main/>} />
						<Route path='/dog-fact' element={<DogFact/>} />
						<Route path='/airbnb' element={<Airbnb/>} />
					</Routes>
				</Card>
			</div>
		</HashRouter>
	);
}

export default App;
