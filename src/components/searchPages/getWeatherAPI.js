async function getWeather(st) {
	try {
		const requestOptions = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				collection: 'data',
				database: 'sample_weatherdata',
				dataSource: 'Cluster0',
				filter: {
					// eslint-disable-next-line object-shorthand
					st: st,
				},
				projection: {
					_id: 1,
					position: 1,
					airTemperature: 1,
					dewPoint: 1,
					pressure: 1,
					wind: 1,
					visibility: 1,
					skyCondition: 1,
					precipitationEstimatedObservation: 1,
					elevation: 1,
				},
			}),
		};

		const response = await fetch(
			'http://localhost:4000/findOne',
			requestOptions,
		);

		console.log(response);
		if (response.ok) {
			const data = await response.json();
			console.log(data);
			return data;
		}

		throw new Error('Network response was not ok.');
	} catch (error) {
		console.error(error);
	}
}

export default getWeather;
