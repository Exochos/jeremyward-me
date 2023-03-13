/* eslint-disable max-len */
/* eslint-disable comma-dangle */
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
	const [xCord, setXcord] = useState(null);
	const [yCord, setYcord] = useState(null);

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
		if (xCord && yCord) {
			getWeather(xCord, yCord)
				.then(data => {
					setReturnedWeatherValue(data);
				})
				.catch(error => console.error(error));
		}
	};

	return (
		<Tabs defaultActiveKey='restaurants' id='uncontrolled-tab-example'>
			<p>restaurants case</p>
			<Tab
				eventKey='restaurants'
				title='Restaurants'
				variant='primary'
				onClick={() => handleNavClick('restaurants')}
			>
				<div
					className='restaurants__card'
					style={{display: 'flex', flexDirection: 'row', width: '80em'}}
				>
					<div className='restaurants__search' style={{flexGrow: 1}}></div>
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
								The Movable Feast
								<br />
								Glorious Food
								<br />
								White Castle
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
											<b>Grades: </b> {restaurant.grades[0].score}
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
					style={{display: 'flex', flexDirection: 'row', width: '80em'}}
				>
					<div className='mflix__search' style={{flexGrow: 1}}>
						<Card style={{width: '40em', marginTop: '1em'}}>
							<div className='mflix__search'>
								<Form inline='true'>
									<FormControl
										type='text'
										placeholder='Search for a movie'
										className='mr-sm-2'
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
									The Godfather
									<br />
									The Shawshank Redemption
									<br />
									The Dark Knight
								</p>
							</div>
						</Card>
					</div>

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
											<b>Runtime:</b> {movie.runtime}
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
					style={{display: 'flex', flexDirection: 'row', width: '80em'}}
				>
					<div className='weather__search' style={{flexGrow: 1}}>
						<Card style={{width: '40em', marginTop: '1em'}}>
							<div className='weather__search'>
								<Form inline='true'>
									<FormControl
										type='text'
										placeholder='x coordinate'
										className='mr-sm-2'
										onChange={e => setXcord(e.target.value)}
									/>
									<br />
									<FormControl
										type='text'
										placeholder='y coordinate'
										className='mr-sm-2'
										onChange={e => setYcord(e.target.value)}
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
							</div>
						</Card>
					</div>

					<div className='weather__search' style={{flexGrow: 1}}></div>
					{returnedWeatherValue && (
						<Card style={{width: '40em', margin: '1em'}}>
							<div className='weather__results'>
								<Card.Title>Weather results: </Card.Title>
								{returnedWeatherValue.map((weather, index) => (
									<div key={index}>
										<br />
										<Card.Subtitle>
											<b>Temperature:</b> {weather.temp}
										</Card.Subtitle>
										<Card.Text>
											<b>Wind Speed:</b> {weather.windSpeed}
											<br />
											<b>Wind Direction:</b> {weather.windDirection}
											<br />
											<b>Humidity:</b> {weather.humidity}
											<br />
											<b>Pressure:</b> {weather.pressure}
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
