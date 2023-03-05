// Importing React and useState as well as the css file for the DogFact component
import React, {useEffect, useState} from 'react';
import styles from './DogFact.css';

export default function DogApi() {
	// Setting the state for the returned value from the API
	const [returnedValue, setReturnedValue] = useState(null);

	// Fetching data from the API
	async function getData() {
		try {
			const url = 'https://dog-api.kinduff.com/api/facts?number=1';
			const response = await fetch(url);
			const data = await response.json();
			setReturnedValue(data);
		} catch (error) {
			console.log(error);
		}
	}

	// Calling the getData function when the component mounts
	useEffect(() => {
		getData();
	}, []);

	// Function to handle the click event
	function handleClick() {
		getData();
	}

	return (
		<React.Fragment>
			<container style={styles.container}>
				<span className='title'>Dog Fact Generator</span>
				<button className='button' onClick={handleClick}>Click Me for a new fact!</button>
				<p className='facts'>{returnedValue && returnedValue.facts[0]}</p>
				<p className='linkedIn'>This project was created by
					<a href='https://www.linkedin.com/in/jeremycward/'>Jeremy Ward</a><br/>
      Source code can be found <a href='https://github.com'>github.com</a></p>
			</container>
		</React.Fragment>
	);
}

