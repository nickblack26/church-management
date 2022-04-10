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
	console.log(members);
	return (
		<div>
			{members.map((member) => {
				const { image, first_name, last_name, full_name, _id } = member;

				return (
					<Link key={full_name} href={`/members/${_id}`}>
						<a
							style={{
								display: 'flex',
								width: '100%',
								justifyContent: 'space-evenly',
								alignItems: 'center',
							}}
						>
							<Image
								src={image}
								style={{ borderRadius: '0.5rem' }}
								width={40}
								height={40}
							/>
							<p>{first_name}</p>
							<p>{last_name}</p>
						</a>
					</Link>
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
	const qSnap = await getDocs(q);
	let members = [];
	qSnap.forEach((member) => {
		members = [...members, member.data()];
	});

	return {
		props: {
			members: JSON.parse(JSON.stringify(members)),
		},
	};
}
