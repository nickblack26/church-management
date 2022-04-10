import { connectToDatabase } from '../../lib/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { db } = await connectToDatabase();

	const data = await db
		.collection('members')
		.aggregate([
			{
				$search: {
					search: {
						query: req.query.term,
						path: ['full_name', 'email', 'numbers'],
					},
				},
			},
			{
				$project: {
					full_name: 1,
					email: 1,
					numbers: 1,
				},
			},
			{
				$limit: 20,
			},
		])
		.toArray();

	res.json(data);
}
