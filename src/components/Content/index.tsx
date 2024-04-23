import { useContext } from "react";
import { Link } from "react-router-dom";

import styles from "@/components/Content/styles.module.scss";
import { ShowsContext } from "@/context/shows";

export function Content() {
  const { showsGrouped, handleSelectShow } = useContext(ShowsContext);

  return (
    <div className={styles.container}>
      {showsGrouped?.map(({ gender, shows }) => (
        <div className={styles.listContainer} key={gender}>
          <h3>{gender}</h3>
          <div className={styles.list}>
            {shows.map((show) => (
              <Link to="/details" className={styles.textLink} key={show.id}>
                <div
                  className={styles.card}
                  onClick={() => handleSelectShow({ show })}
                >
                  <img src={show.image.medium} alt="" draggable="false" />
                  <span>{show.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
