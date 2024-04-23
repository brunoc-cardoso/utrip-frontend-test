import styles from "@/components/EpisodeCard/styles.module.scss";
import { Episode } from "@/context/shows/types";

type EpisodeCardProps = {
  episode: Episode;
};

export function EpisodeCard({ episode }: EpisodeCardProps) {
  const removeTagsFromText = ({ text }: { text: string }) => {
    return text
      .replace("<p>", "")
      .replace("</p>", "")
      .replace("<b>", "")
      .replace("</b>", "");
  };

  return (
    <div className={styles.container}>
      <img src={episode?.image?.original} alt="" />
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
