import { Link } from "react-router-dom";

import { Search, Tv } from "lucide-react";

import styles from "@/components/Header/styles.module.scss";

export function Header() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Link className={styles.logoContainer} to="/">
          <Tv color="#52525b" size={24} />
          <span>TV SHOW</span>
        </Link>

        <div className={styles.inputContainer}>
          <input type="text" placeholder="Search..." />
          <Search color="black" size={24} style={{ cursor: "pointer" }} />
        </div>

        <div className={styles.profile}>
          <span>B</span>
        </div>
      </div>
    </div>
  );
}
