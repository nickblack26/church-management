import { connectToDatabase } from '../lib/mongodb';

const AddChurch = () => {
	const handleSubmit = async (e) => {
		e.preventDefault();
		const { name, email, number, website } = e.target.elements;

		const { db } = await connectToDatabase();
		// await db.collection('churches').insertOne({
		// 	name: name.value,
		// 	email: email.value,
		// 	number: number.value,
		// 	website: website.value,
		// });
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					<label>
						Name: <input type='text' name='name' />
					</label>
				</div>
				<div>
					<label>
						Email: <input type='email' name='email' />
					</label>
				</div>
				<div>
					<label>
						Number: <input type='tel' name='number' />
					</label>
				</div>
				<div>
					<label>
						Website: <input type='url' name='website' />
					</label>
				</div>

				<input type='submit' />
			</form>
		</div>
	);
};

export default AddChurch;
