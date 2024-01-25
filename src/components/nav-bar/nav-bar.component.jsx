"use client";
import { useSession, signOut as authSignOut } from "next-auth/react";

import styles from "./nav-bar.module.css";
import Link from "next/link";

const NavBar = () => {
  const { data: session, status } = useSession();

  const url = process.env.NEXT_PUBLIC_API_URL;
  const signOut = async () => {
    const response = await fetch(`${url}/api/user/logout/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response2 = await authSignOut();
  };

  return (
    <nav className={styles.navBar}>
      <Link href="/" className={styles.title}>
        <span>JustGiveMeTheRecipe-</span>
        <span>IdidntAskForYourLifeStory-</span>
        <span>OrAllOfTheseAds.com</span>
      </Link>
      <ul className={styles.navBarList}>
        <li className={styles.navBarListItem}>
          {session && <Link href="/favorites">Favorites</Link>}
        </li>
        <li className={styles.navBarListItem}>
          {session && <p>{session.user?.email}</p>}
          {!session && <Link href="/auth">Sign in</Link>}
          {session && <button onClick={() => signOut()}>Log out</button>}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
