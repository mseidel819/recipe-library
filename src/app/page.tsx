"use client";

import styles from "./page.module.css";
import BasicTabs from "@/components/tabs/tabs.component";

export default function Home() {
  return (
    <main className={styles.main}>
      <BasicTabs />
    </main>
  );
}
