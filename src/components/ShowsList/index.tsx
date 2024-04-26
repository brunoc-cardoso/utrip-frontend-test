import { Link } from "react-router-dom";

import styles from "@/components/ShowsList/styles.module.scss";
import { ShowsGrouped } from "@/context/shows/types";

type ShowListProps = {
  shows: ShowsGrouped[];
};

export function ShowsList({ shows }: ShowListProps) {
  return (
    <div className={styles.container}>
      {shows?.map(({ gender, shows }) => (
        <div className={styles.listContainer} key={gender}>
          <h3>{gender}</h3>

          <div className={styles.list}>
            {shows.map((show) => (
              <Link
                to={`/details?showId=${show.id}`}
                className={styles.textLink}
                key={show.id}
              >
                <div className={styles.card}>
                  <img
                    src={show.image.medium}
                    alt={`Cover image from ${show.name}`}
                    draggable="false"
                  />
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
