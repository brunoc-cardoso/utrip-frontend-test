import { Link } from "react-router-dom";

import styles from "@/pages/NoMach/styles.module.scss";

export function NoMatch() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>Error 404</h2>
        <h3>Page not found</h3>

        <button>
          <Link className={styles.linkText} to="/">
            {"< Return to home page"}
          </Link>
        </button>
      </div>
    </div>
  );
}
