import Image from 'next/image';
import { Member } from '../../typings';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

interface Props {
	id: string;
	member: Member;
}

export const getServerSideProps = async (context) => {
	const { id } = context.params;
	const churchRef = doc(db, 'churches', 'v7e7DRo9JTtUUqPp3ODW');
	const memberRef = doc(churchRef, 'members', id);
	const memberInfo = await getDoc(memberRef);
	const member = memberInfo.data();

	return {
		props: {
			member: JSON.parse(JSON.stringify(member)),
		},
	};
};

const MemberPage = ({ id, member }: Props) => {
	console.log(id);
	const {
		image,
		full_name,
		membership_status,
		emails,
		numbers,
		addresses,
		first_name,
	} = member;
	return (
		<div>
			<header>
				<div>
					{image ? (
						<Image src={image} height={75} width={75} />
					) : (
						<div
							style={{
								display: 'inline-block',
								backgroundColor: 'gray',
								padding: '1rem',
								borderRadius: '50%',
								height: '25px',
								width: '25px',
								lineHeight: '25px',
								textAlign: 'center',
								fontWeight: 'bold',
								color: 'white',
							}}
						>
							{first_name[0]}
						</div>
					)}

					<div>
						{full_name}
						<div></div>
					</div>
				</div>
				<div>
					<button>{membership_status}</button>
				</div>
			</header>
		</div>
	);
};

export default MemberPage;
