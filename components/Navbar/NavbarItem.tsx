const NavbarItem = ({ Icon, text }) => {
	return (
		<li style={{ display: 'flex', alignItems: 'center' }}>
			{Icon && <Icon />}
			<span>{text}</span>
		</li>
	);
};

export default NavbarItem;
