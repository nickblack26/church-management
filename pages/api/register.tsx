import { connectToDatabase } from '../../lib/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { db } = await connectToDatabase();
	const data = req.query;

	const response = await db.collection('register').insertOne(data);

	res.json(response);
}
