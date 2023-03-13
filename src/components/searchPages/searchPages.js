/* eslint-disable operator-linebreak */

/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import {Button} from 'react-bootstrap';
// Import {Container} from 'react-bootstrap';
import {Modal, Tab} from 'react-bootstrap';
import {Tabs} from 'react-bootstrap';
import {Form} from 'react-bootstrap';
import {FormControl} from 'react-bootstrap';
import {Card} from 'react-bootstrap';
import getRestaurants from './getRestaurantAPI.js';
import getMflix from './getMflixApi.js';
import getWeather from './getWeatherAPI.js';
import 'bootstrap/dist/css/bootstrap.css';

function SearchPages() {
	const [whichPage, setWhichPage] = useState('restaurants');
	const [returnedRestaurantsValue, setReturnedValue] = useState([]);
	const [returnedMflixValue, setReturnedMflixValue] = useState([]);
	const [returnedWeatherValue, setReturnedWeatherValue] = useState([]);
	const [restaurantName, setRestaurantName] = useState(null);
	const [movieName, setMovieName] = useState(null);
	const [st, setSt] = useState(null);

	const handleNavClick = page => {
		setWhichPage(page);
	};

	const handleMflixSearch = () => {
		if (movieName) {
			getMflix(movieName)
				.then(data => {
					setReturnedMflixValue(data);
				})
				.catch(error => console.error(error));
		}
	};

	const handleRestaurantSearch = () => {
		if (restaurantName) {
			getRestaurants(restaurantName)
				.then(data => {
					setReturnedValue(data);
				})
				.catch(error => console.error(error));
		}
	};

	const handleWeatherSearch = () => {
		if (st) {
			getWeather(st)
				.then(data => {
					setReturnedWeatherValue(data);
				})
				.catch(error => console.error(error));
		}
	};

	return (
		<Tabs defaultActiveKey='restaurants' id='uncontrolled-tab-example'>
			<Tab
				eventKey='restaurants'
				title='Restaurants'
				variant='primary'
				onClick={() => handleNavClick('restaurants')}
			>
				<div
					className='restaurants__card'
					style={{display: 'flex', flexDirection: 'row', width: '100%'}}
				>
					<Card
						className='restaurants__card'
						style={{width: '40em', marginTop: '1em'}}
					>
						<div className='restaurants__search'>
							<Form inline='true'>
								<FormControl
									type='text'
									placeholder='Search for a restaurant'
									className='mr-sm-2'
									id='search'
									onChange={e => setRestaurantName(e.target.value)}
								/>
								<br />
								<Button
									variant='outline-success'
									className='ml-auto'
									style={{marginLeft: 'auto'}}
									onClick={handleRestaurantSearch}
								>
									Search
								</Button>
							</Form>
							<p>
								<br />
								<i>Some example searches: </i>
								<br />
								<div
									onClick={() => {
										setRestaurantName('The Movable Feast');
										document.getElementById('search').value =
											'The Movable Feast';
									}}
								>
									<u>The Movable Feast</u>
								</div>
								<div
									onClick={() => {
										setRestaurantName('Glorious Food');
										document.getElementById('search').value = 'Glorious Food';
									}}
								>
									<u>Glorious Food</u>
								</div>
								<div
									onClick={() => {
										setRestaurantName('White Castle');
										document.getElementById('search').value = 'White Castle';
									}}
								>
									<u>White Castle</u>
								</div>
							</p>
						</div>
					</Card>

					<div className='restaurants__search' style={{flexGrow: 1}}></div>
					{returnedRestaurantsValue && (
						<Card style={{width: '40em', margin: '1em'}}>
							<div className='restaurants__results'>
								<Card.Title>Restaurant results: </Card.Title>
								{returnedRestaurantsValue.map((restaurant, index) => (
									<div key={index}>
										<br />
										<Card.Subtitle>
											<b>Name:</b> {restaurant.name}
										</Card.Subtitle>
										<Card.Text>
											<b>Cuisine:</b> {restaurant.cuisine}
											<br />
											<b>Address:</b> {restaurant.address.building}{' '}
											{restaurant.address.street} {restaurant.address.zipcode}
											<br />
											<b>Borough:</b> {restaurant.borough}
											<br />
										</Card.Text>
									</div>
								))}
							</div>
						</Card>
					)}
				</div>
			</Tab>

			<Tab
				eventKey='mflix'
				title='Mflix'
				variant='primary'
				onClick={() => handleNavClick('mflix')}
			>
				<div
					className='mflix__card'
					style={{display: 'flex', flexDirection: 'row', width: '100%'}}
				>
					<Card style={{width: '40em', marginTop: '1em'}}>
						<div className='mflix__search'>
							<Form inline='true'>
								<FormControl
									type='text'
									placeholder='Search for a movie'
									className='mr-sm-2'
									id='msearch'
									onChange={e => setMovieName(e.target.value)}
								/>
								<br />
								<Button
									variant='outline-success'
									className='ml-auto'
									style={{marginLeft: 'auto'}}
									onClick={handleMflixSearch}
								>
									Search
								</Button>
							</Form>
							<p>
								<br />
								<i>Some example searches: </i>
								<br />
								<div
									onClick={() => {
										setMovieName('The Godfather');
										document.getElementById('msearch').value = 'The Godfather';
									}}
								>
									<u>The Godfather</u>
								</div>
								<div
									onClick={() => {
										setMovieName('The Shawshank Redemption');
										document.getElementById('msearch').value =
											'The Shawshank Redemption';
									}}
								>
									<u>The Shawshank Redemption</u>
								</div>
								<div
									onClick={() => {
										setMovieName('The Dark Knight');
										document.getElementById('msearch').value =
											'The Dark Knight';
									}}
								>
									<u>The Dark Knight</u>
								</div>
							</p>
						</div>
					</Card>

					<div className='mflix__search' style={{flexGrow: 1}}></div>
					{returnedMflixValue && (
						<Card style={{width: '40em', margin: '1em'}}>
							<div className='mflix__results'>
								<Card.Title>Movie results: </Card.Title>
								{returnedMflixValue.map((movie, index) => (
									<div key={index}>
										<br />
										<Card.Subtitle>
											<b>Title:</b> {movie.title}
										</Card.Subtitle>
										<Card.Text>
											<b>Year:</b> {movie.year}
											<br />
											<b>Rated:</b> {movie.rated}
											<br />
											<b>Released:</b> {movie.released}
											<br />
											<b>Runtime:</b> {movie.runtime} minutes
											<br />
											<b>Plot: </b> {movie.plot}
										</Card.Text>
									</div>
								))}
							</div>
						</Card>
					)}
				</div>
			</Tab>

			<Tab
				eventKey='weather'
				title='Weather'
				variant='primary'
				onClick={() => handleNavClick('weather')}
			>
				<div
					className='weather__card'
					style={{display: 'flex', flexDirection: 'row', width: '100%'}}
				>
					<Card style={{width: '40em', marginTop: '1em'}}>
						<div className='weather__search'>
							<Form inline='true'>
								<FormControl
									type='text'
									placeholder='Search for st object'
									className='mr-sm-2'
									id='wsearch'
									onChange={e => setSt(e.target.value)}
								/>
								<br />
								<Button
									variant='outline-success'
									className='ml-auto'
									style={{marginLeft: 'auto'}}
									onClick={handleWeatherSearch}
								>
									Search
								</Button>
							</Form>
							<p>
								<br />
								<i>Some example searches: </i>
								<br />
								<div
									onClick={() => {
										setSt('x+47600-047900');
										document.getElementById('wsearch').value = 'x+47600-047900';
									}}
								>
									<u> x+47600-047900 </u>
								</div>
								<div
									onClick={() => {
										setSt('x+45200-066500');
										document.getElementById('wsearch').value = 'x+45200-066500';
									}}
								>
									<u> x+45200-066500 </u>
								</div>
								<div
									onClick={() => {
										setSt('x+51900+003600');
										document.getElementById('wsearch').value = 'x+51900+003600';
									}}
								>
									<u> x+51900+003600 </u>
								</div>
							</p>
						</div>
					</Card>

					<div className='weather__search' style={{flexGrow: 1}}></div>
					{returnedWeatherValue && (
						<Card style={{width: '40em', margin: '1em'}}>
							<div className='weather__results'>
								<Card.Title>Weather results:</Card.Title>
								{returnedWeatherValue.map((weather, index) => (
									<div key={index}>
										<Card.Subtitle>
											<b>St:</b> {weather.st}
										</Card.Subtitle>
										<Card.Text>
											<b>Temperature:</b> {weather.airTemperature.value} degrees
											<br />
											<b>Dew Point:</b> {weather.dewPoint.value} degrees
											<br />
											<b>Wind: </b> {weather.wind.direction.angle} angle {' '}<br/>
										</Card.Text>
									</div>
								))}
							</div>
						</Card>
					)}
				</div>
			</Tab>
		</Tabs>
	);
}

export default SearchPages;
