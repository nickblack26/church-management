import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../lib/mongodb';
import Image from 'next/image';
import { Campus, Member } from '../../typings';
import styles from '../../styles/MemberPage.module.css';

interface Props {
	member: Member;
	primary_campus: Campus;
}

export const getServerSideProps = async (context) => {
	const { db } = await connectToDatabase();
	const { id } = context.params;

	const member: Member = await db
		.collection('members')
		.findOne({ _id: new ObjectId(id) });

	const primaryCampus: Campus = await db
		.collection('campuses')
		.findOne({ _id: new ObjectId(member.primary_campus) });

	return {
		props: {
			member: JSON.parse(JSON.stringify(member)),
			primary_campus: JSON.parse(JSON.stringify(primaryCampus)),
		},
	};
};

const MemberPage = ({ member, primary_campus }: Props) => {
	return (
		<div>
			<header>
				<div>
					<Image src={member.image} height={75} width={75} />
					<div>
						{member.full_name}
						<div></div>
					</div>
				</div>
				<div>
					<button>{member.membership_status}</button>
					<button>{primary_campus.name}</button>
				</div>
			</header>
			<div style={{ marginTop: '15vh' }}>
				<h4>Contact Information</h4>
				{member.emails.map((email) => (
					<div
						key={email.address}
						style={{ display: 'flex', alignItems: 'center' }}
					>
						<div>{email.type}</div>
						<p key={email.address}>{email.address}</p>
						{email.primary === true ? (
							<div className={styles.star}></div>
						) : null}
					</div>
				))}
			</div>
		</div>
	);
};

export default MemberPage;

// // This function gets called at build time
// export async function getStaticPaths() {
// 	// Call an external API endpoint to get posts
// 	const { db } = await connectToDatabase();
// 	const members = await db.collection('members').find({}).toArray();

// 	// Get the paths we want to pre-render based on posts
// 	const paths = members.map((member: Member) => ({
// 		params: { id: member._id },
// 	}));

// 	// We'll pre-render only these paths at build time.
// 	// { fallback: false } means other routes should 404.
// 	return { paths, fallback: false };
// }

// export async function getStaticProps({ params }) {
// 	const { db } = await connectToDatabase();
// 	const { id } = params;

// 	const member: Member = await db
// 		.collection('members')
// 		.findOne({ _id: new ObjectId(id) });

// 	const primaryCampus: Campus = await db
// 		.collection('campuses')
// 		.findOne({ _id: new ObjectId(member.primary_campus) });

// 	return {
// 		props: {
// 			member: JSON.parse(JSON.stringify(member)),
// 			primary_campus: JSON.parse(JSON.stringify(primaryCampus)),
// 		},
// 	};
// }
