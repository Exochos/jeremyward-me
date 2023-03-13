async function getRestaurants(restaurantName) {
	try {
		const requestOptions = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				collection: 'restaurants',
				database: 'sample_restaurants',
				dataSource: 'Cluster0',
				projection: {
					name: restaurantName,
					cuisine: 1,
					address: 1,
					borough: 1,
					grades: 1,
				},
				filter: {name: {$regex: restaurantName, $options: 'i'}},
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

export default getRestaurants;
