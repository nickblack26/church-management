import { Church } from '../typings';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

interface Props {
	church: Church;
}

export default function Home({ church }: Props) {
	const { name, email, number, campuses } = church;
	return (
		<div>
			<div>{name}</div>
			<div>{email}</div>
			<div>{number}</div>
			<h2>Campuses</h2>
			{campuses.map((campus) => {
				const { _id, name, street, city, state, zip } = campus;
				return (
					<div key={_id}>
						<h3>{name}</h3>
						<div>
							{street}
							<div>
								{city}, {state} {zip}
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export async function getServerSideProps() {
	const churchRef = doc(db, 'churches', 'v7e7DRo9JTtUUqPp3ODW');
	const churchInfo = await getDoc(churchRef);
	const campusRef = collection(churchRef, 'campuses');
	const campuses = await getDocs(campusRef);
	const eventsRef = collection(churchRef, 'events');
	const events = await getDocs(eventsRef);
	const ministriesRef = collection(churchRef, 'ministries');
	const ministries = await getDocs(ministriesRef);
	const membersRef = collection(churchRef, 'members');
	const members = await getDocs(membersRef);

	const { id } = churchInfo;
	const { name, email, number, website } = churchInfo.data();

	const campusesInfo = [{}];
	const eventsInfo = [{}];
	const ministriesInfo = [{}];
	const membersInfo = [{}];

	campuses.forEach((campus) => {
		campusesInfo.push(campus.data());
	});
	events.forEach((event) => {
		eventsInfo.push(event.data());
	});
	ministries.forEach((ministry) => {
		ministriesInfo.push(ministry.data());
	});
	members.forEach((member) => {
		membersInfo.push(member.data());
	});

	const church = {
		_id: id,
		name,
		email,
		number,
		website,
		campuses: campusesInfo,
		events: eventsInfo,
		ministries: ministriesInfo,
		members: JSON.parse(JSON.stringify(membersInfo)),
	};

	return {
		props: {
			church,
		},
	};
}
