async function getMflix(movieName) {
	try {
		const requestOptions = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				collection: 'movies',
				database: 'sample_mflix',
				dataSource: 'Cluster0',
				projection: {
					title: movieName,
					year: 1,
					directors: 1,
					cast: 1,
					plot: 1,
					runtime: 1,
					imdb: 1,
				},
				filter: {title: {$regex: movieName, $options: 'i'}},
			}),
		};

		const response = await fetch(
			'http://localhost:4000/findOne',
			requestOptions,
		);

		if (response.ok) {
			const data = await response.json();
			return data;
		}

		throw new Error('Network response was not ok.');
	} catch (error) {
		console.error(error);
	}
}

export default getMflix;
