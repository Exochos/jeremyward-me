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
const URI = process.env.MONGODB_URI;
const app = express();
app.use(cors(corsOptions));
app.set('json spaces', 4);

// Define the routes
app.post('/findOne', async (req, res) => {
	express.json()(req, res, async () => {
		const {database, collection, filter, projection} = req.body;
		console.log(req.body);
		// Check for required parameters
		if (!database || !collection || !filter || !projection) {
			res.status(400).send('Missing required parameters');
			return;
		}

		// Connect to MongoDB database and return the result
		try {
			const client = await MongoClient.connect(URI, {useUnifiedTopology: true});
			const db = client.db(database);
			console.log(db);
			const result = await db
				.collection(collection)
				.find(filter, projection)
				.limit(1)
				.toArray();
			client.close();
			res.status(200).send(result);
		} catch (err) {
			console.error('Error connecting to MongoDB database', err);
			res.status(500).send('Error connecting to MongoDB database');
		}
	});
});

// Listen for requests
const port = process.env.PORT || 4000;
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
