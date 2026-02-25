"use client";
import { signIn, signOut } from "next-auth/react";
import styles from "./Header.module.css";

export default function Header({ session, onUpgrade }) {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span className={styles.bolt}>⚡</span>
        <span className={styles.wordmark}>HustleSpark</span>
      </div>
      <nav className={styles.nav}>
        {session ? (
          <>
            <button className={styles.upgradeBtn} onClick={onUpgrade}>
              Upgrade ✦
            </button>
            <div className={styles.user}>
              <img
                src={session.user.image}
                alt={session.user.name}
                className={styles.avatar}
              />
              <button className={styles.signOut} onClick={() => signOut()}>
                Sign out
              </button>
            </div>
          </>
        ) : (
          <button className={styles.signInBtn} onClick={() => signIn("google")}>
            Sign in
          </button>
        )}
      </nav>
    </header>
  );
}
