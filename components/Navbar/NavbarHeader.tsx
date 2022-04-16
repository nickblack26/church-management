import NavbarUser from './NavbarUser';

const NavbarHeader = () => {
	return (
		<div>
			<div
				style={{
					display: 'flex',
					flex: '1',
					justifyContent: 'space-between',
				}}
			>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: '1rem',
					}}
				>
					<img src='/logo.svg' />
					<div>People</div>
				</div>

				<NavbarUser />
			</div>
		</div>
	);
};

export default NavbarHeader;
