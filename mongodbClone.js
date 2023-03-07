/*  ╦┌┬┐┌─┐┌─┐┬─┐┌┬┐┌─┐
    ║│││├─┘│ │├┬┘ │ └─┐
    ╩┴ ┴┴  └─┘┴└─ ┴ └─┘ */
import express from 'express';
import {MongoClient} from 'mongodb';
import * as dotenv from 'dotenv';
import cors from 'cors';

const corsOptions = {
	origin: '*',
	optionsSuccessStatus: 200,
};

// Load environment variables from .env file and begin Express app
dotenv.config();
const database = process.env.MONGODB_DB;
const collection = process.env.MONGODB_COLLECTION;
const uri = process.env.MONGODB_URI;
const app = express();
app.use(cors(corsOptions));
app.set('json spaces', 4);

// Connect to the database
MongoClient.connect(uri, {useUnifiedTopology: true})
	.then(client => {
		const db = client.db(database);
		app.locals.db = db;
		console.log('Connected to MongoDB database');
	})
	.catch(err => {
		console.error('Error connecting to MongoDB database', err);
	});

// Define a utility function to fetch a single JSON document from MongoDB
// eslint-disable-next-line require-jsdoc
async function findOne(collection, filter, projection) {
	const db = app.locals.db;
	const collectionName = db.collection(collection);
	const cursor = await collectionName.find(filter, projection).limit(1);
	const result = await cursor.toArray();
	return JSON.parse(JSON.stringify(result[0]));
}

// Define the route and query parameters
app.get('/findOne', async (req, res) => {
	const propertyType = req.query.property_type || 'Apartment';
	const bedrooms = parseInt(req.query.bedrooms) || 1;
	const beds = parseInt(req.query.beds) || 1;

	// Define the filter and projection
	const filter = {
		property_type: propertyType,
		bedrooms: {$gte: bedrooms},
		beds: {$gte: beds},
	};
	const projection = {
		_id: 1,
		listing_url: 1,
		name: 1,
		summary: 1,
		host: 0,
	};

	try {
		// Await the results of the query and send them to the client
		const result = await findOne(collection, filter, projection);
		const filteredResult = {
			_id: result._id,
			listing_url: result.listing_url,
			name: result.name,
			summary: result.summary,
			property_type: result.property_type,
			bedrooms: result.bedrooms,
			beds: result.beds,
		};
		res.json(filteredResult);
	} catch (error) {
		console.error(error);
		res.status(500).send('Internal server error');
	}
});

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
