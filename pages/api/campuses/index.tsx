import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../../lib/mongodb';

/* /API/CAMPUSES */

// api end point to get all campuses, create new campus for a church

export default async function handler(req, res) {
	const { db } = await connectToDatabase();
	const churchId = new ObjectId('624ce6d2044ba7dbbd3862f9');

	if (req.method === 'GET') {
		const campuses = await db
			.collection('campuses')
			.find({ church: churchId })
			.toArray();

		res.json(campuses);
	} else if (req.method === 'POST') {
	} else if (req.method === 'UPDATE') {
	} else {
	}
}
