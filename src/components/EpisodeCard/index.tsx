import styles from "@/components/EpisodeCard/styles.module.scss";
import { Episode } from "@/context/shows/types";
import { removeTagsFromText } from "@/utils/removeTagsFromText";

type EpisodeCardProps = {
  episode: Episode;
};

export function EpisodeCard({ episode }: EpisodeCardProps) {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        {episode?.image?.original ? (
          <img src={episode?.image?.original} alt="" />
        ) : (
          <span>No image</span>
        )}
      </div>
      <div className={styles.cardInfo}>
        <span>
          <strong>{episode.name}</strong>
        </span>
        <p>{removeTagsFromText({ text: episode.summary })}</p>
        <span>{episode.runtime} min</span>
      </div>
    </div>
  );
}
