import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { FiUser } from 'react-icons/fi';

const NavbarUser = () => {
	const { data: session } = useSession();
	return (
		<div>
			{session ? (
				<Image
					onClick={signOut}
					src={session.user.image}
					width={40}
					height={40}
				/>
			) : (
				<button onClick={signIn}>Sign in</button>
			)}
		</div>
	);
};

export default NavbarUser;
