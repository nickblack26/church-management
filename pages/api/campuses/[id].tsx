import { connectToDatabase } from '../../../lib/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req, res) {
	const { id } = req.query;
}
