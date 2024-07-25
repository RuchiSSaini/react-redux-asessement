import React from 'react';
import styles from './header.module.css';
import logo from '../assets/stackline_logo.svg';

const Header: React.FC = () => {
	return (
		<header className={styles.header}>
			<img src={logo} alt="Logo" className={styles.logo} />
		</header>
	);
};

export default Header;