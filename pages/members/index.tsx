import { Members } from '../../typings';
import Image from 'next/image';
import Link from 'next/link';
import {
	collection,
	doc,
	getDocs,
	limit,
	orderBy,
	query,
} from 'firebase/firestore';
import { db } from '../../firebase';

const MembersPage = ({ members }: Members) => {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '1rem',
				width: '100%',
			}}
		>
			{members.map((member) => {
				const { image, first_name, last_name, id, numbers } = member;
				const primaryNumber = numbers.filter(
					(number) => number.primary === true
				);
				return (
					<div key={id}>
						<Link href={`/members/${id}`}>
							<a
								style={{
									display: 'grid',
									gridTemplateColumns: 'repeat(4, 25%)',
								}}
							>
								{image ? (
									<Image
										src={image}
										style={{ borderRadius: '0.5rem' }}
										width={40}
										height={40}
									/>
								) : (
									<div
										style={{
											display: 'inline-block',
											backgroundColor: 'gray',
											padding: '1rem',
											borderRadius: '50%',
											height: '1.5rem',
											width: '1.5rem',
											lineHeight: '1.5rem',
											textAlign: 'center',
											fontWeight: 'bold',
											color: 'white',
										}}
									>
										{first_name[0]}
									</div>
								)}
								<p>{first_name}</p>
								<p>{last_name}</p>
								<p>{primaryNumber[0].number}</p>
							</a>
						</Link>
					</div>
				);
			})}
		</div>
	);
};

export default MembersPage;

export async function getServerSideProps() {
	const churchRef = doc(db, 'churches', 'v7e7DRo9JTtUUqPp3ODW');
	const membersRef = collection(churchRef, 'members');
	const q = query(membersRef, orderBy('last_name', 'asc'), limit(50));
	const members = (await getDocs(q)).docs.map((doc) => {
		return { id: doc.id, ...doc.data() };
	});

	return {
		props: {
			members: JSON.parse(JSON.stringify(members)),
		},
	};
}
