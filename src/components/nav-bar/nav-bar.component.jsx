"use client";
import { signIn, useSession } from "next-auth/react";

import styles from "./nav-bar.module.css";
import Link from "next/link";

const NavBar = () => {
  const { data: session, status } = useSession();

  return (
    <nav className={styles.navBar}>
      <Link href="/" className={styles.title}>
        <span>JustGiveMeTheRecipe-</span>
        <span>IdidntAskForYourLifeStory-</span>
        <span>OrAllOfTheseAds.com</span>
      </Link>
      <ul className={styles.navBarList}>
        <li className={styles.navBarListItem}>
          <Link href="/blogs/">Favorites</Link>
        </li>
        <li className={styles.navBarListItem}>
          {session && <Link href="/contact">Log out</Link>}
          {!session && (
            <button onClick={() => signIn(undefined, { callbackUrl: "/" })}>
              Sign in
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
