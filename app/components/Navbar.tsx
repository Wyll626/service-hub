import Link from 'next/link';
import React from 'react';
import styles from '../styles/Navbar.module.css';

const serviceTypes = ["service", "endpoint", "mapper"];

function capitalizeFirstLetter(str:string) {
  if (!str) return str; // return original string if it's empty
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <Link className={styles.homeLink} href="/">
        Home
      </Link>
      {serviceTypes.map(type => {
        return (
          <Link key={type} className={styles.navLink} href={`/lookup?type=${type}`}>
            {capitalizeFirstLetter(type)}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navbar;
