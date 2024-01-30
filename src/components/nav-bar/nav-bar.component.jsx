"use client";
import { useSession, signOut as authSignOut } from "next-auth/react";
import BakeryDiningIcon from "@mui/icons-material/BakeryDining";
import { pink } from "@mui/material/colors";
import Favorite from "@mui/icons-material/Favorite";

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
        <BakeryDiningIcon fontSize="large" />
      </Link>
      <ul className={styles.navBarList}>
        <li className={styles.navBarListItem}>
          {session && (
            <Link href="/favorites">
              <Favorite
                sx={{
                  color: pink[800],
                }}
              />
            </Link>
          )}
        </li>
        <li className={`${styles.navBarListItem} ${styles.userContainer}`}>
          {session && <p className={styles.userName}>{session.user?.email}</p>}
          {!session && (
            <Link className={styles.logBtn} href="/auth">
              Sign in
            </Link>
          )}
          {session && (
            <button className={styles.logout} onClick={() => signOut()}>
              Log out
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
