import { Church } from '../typings';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { getSession } from 'next-auth/react';

interface Props {
	church: Church;
	session: any;
}

export default function Home({ church, session }: Props) {
	const { name, email, number, campuses, events, members, ministries } =
		church;
	return <div></div>;
}

export async function getServerSideProps(context) {
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

	const session = await getSession(context);

	return {
		props: {
			church,
			session,
		},
	};
}
