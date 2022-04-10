import { connectToDatabase } from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
	const { id } = req.query;
	const { db } = await connectToDatabase();
	console.log(id);

	const member = await db
		.collection('members')
		.findOne({ _id: new ObjectId(id) });

	res.end();
}
