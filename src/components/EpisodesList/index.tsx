import { EpisodeCard } from "@/components/EpisodeCard";
import styles from "@/components/EpisodesList/styles.module.scss";
import { Episode } from "@/context/shows/types";

type EpisodesListProps = {
  episodes: Episode[];
};

export function EpisodesList({ episodes }: EpisodesListProps) {
  return (
    <div className={styles.container}>
      {episodes?.map((episode) => (
        <EpisodeCard key={episode.id} episode={episode} />
      ))}
    </div>
  );
}
