// Import React and useState and styles
// Test
import React, {useState} from 'react';
import './Airbnb.css';

// Airbnb component
function Airbnb() {
	const [returnedValue, setReturnedValue] = useState(null);
	const [propertyType, setPropertyType] = useState('Apartment');
	const [bedrooms, setBedrooms] = useState(1);
	const [beds, setBeds] = useState(1);
	const propertyTypes = ['Apartment', 'House', 'Condo', 'Townhouse', 'Loft'];

	// Utility functions
	function handlePropertyType(event) {
		setPropertyType(event.target.value);
	}

	function handleBedrooms(event) {
		setBedrooms(event.target.value);
	}

	function handleBeds(event) {
		setBeds(event.target.value);
	}

	function handleSubmit() {
		getAirbnb();
	}

	// Fetch data from the server
	async function getAirbnb() {
		const url =	'/findOne?property_type=' + propertyType + '&bedrooms=' + bedrooms + '&beds=' +	beds;
		fetch(url)
			.then(response => response.json())
			.then(data => {
				setReturnedValue(data);
				console.log(data);
			})
			.catch(error => console.error(error));
	}

	return (
		<React.Fragment>
			<div className='airbnb'>
				<img
					src='https://static.dezeen.com/uploads/2014/07/Airbnb-rebrand-by-DesignStudio_dezeen_468_8.jpg'
					alt='Airbnb Logo'
					className='airB'
				/>
				<div>
					<label htmlFor='property-type' className='airB'>
						Property type:{' '}
					</label>
					<select
						id='property-type'
						name='property-type'
						className='airB'
						onClick={handlePropertyType}
					>
						{propertyTypes.map((propertyType, index) => (
							<option key={index} value={propertyType}>
								{propertyType}
							</option>
						))}
					</select>
					<br />
					<label htmlFor='bedrooms' className='airB'>
						{' '}
						Bedrooms:{' '}
					</label>
					<select
						id='bedrooms'
						name='bedrooms'
						className='airB'
						onClick={handleBedrooms}
					>
						<option value='1'>1</option>
						<option value='2'>2</option>
						<option value='3'>3</option>
						<option value='4'>4</option>
						<option value='5'>5+</option>
					</select>
					<br />
					<label htmlFor='beds' className='airB'>
						{' '}
						Beds:{' '}
					</label>
					<select id='beds' name='beds' className='airB' onClick={handleBeds}>
						<option value='1'>1</option>
						<option value='2'>2</option>
						<option value='3'>3</option>
						<option value='4'>4</option>
						<option value='5'>5</option>
					</select>
				</div>
				<button className='airB' onClick={handleSubmit}>
					Search
				</button>
				{returnedValue && (
					<div className='airBnBreturned'>
						<p className='airB'>
							Listing URL:{' '}
							<a href={returnedValue.listing_url}>
								{returnedValue.listing_url}
							</a>
						</p>
						<span className='airB'>{returnedValue.name}</span>
						<p className='airB'>{returnedValue.summary}</p>
						<p className='airB'>Property type: {returnedValue.property_type}</p>
						<p className='airB'>Bedrooms: {returnedValue.bedrooms}</p>
						<p className='airB'>Beds: {returnedValue.beds}</p>
					</div>
				)}
			</div>
		</React.Fragment>
	);
}

export default Airbnb;
