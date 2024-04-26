import { useContext, useEffect } from "react";

import { EpisodesList } from "@/components/EpisodesList";
import { Header } from "@/components/Header";
import { LoadingComponent } from "@/components/LoadingComponent";
import { ShowsContext } from "@/context/shows";
import styles from "@/pages/Details/styles.module.scss";
import { removeTagsFromText } from "@/utils/removeTagsFromText";

export function Details() {
  const {
    selectedShow: show,
    seasons,
    loading,
    onSelectSeason,
    episodesBySeason,
    loadSeasonsAndEpisodes,
  } = useContext(ShowsContext);

  const Info = ({ title, value }: { title: string; value: string }) => {
    return (
      <span>
        <strong>{title}: </strong>
        {value}
      </span>
    );
  };

  useEffect(() => {
    loadSeasonsAndEpisodes();
  }, []);

  return (
    <div className={styles.container}>
      <Header />

      {loading && <LoadingComponent />}

      {!loading && (
        <div className={styles.content}>
          <div className={styles.info}>
            <div className={styles.coverContainer}>
              <img src={show?.image?.original || show?.image?.medium} alt="" />
            </div>

            <div className={styles.infoContent}>
              <Info title="Title" value={show.name} />
              <Info
                title="Description"
                value={removeTagsFromText({ text: show.summary })}
              />
            </div>
          </div>

          <div className={styles.infoDetails}>
            <Info title="Release date" value={show.premiered} />
            <Info title="Status" value={show.status} />

            <div className={styles.genderContainer}>
              <Info title="Genres" value={""} />
              <div className={styles.genderCards}>
                {show?.genres?.map((gender) => (
                  <span key={gender} className={styles.genderCard}>
                    {gender}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.seasons}>
            <div className={styles.selectContainer}>
              <span>Select a season</span>
              <select
                name="seasons"
                onChange={(event) =>
                  onSelectSeason({ seasonNumber: Number(event.target.value) })
                }
              >
                {seasons?.map((season) => (
                  <option
                    value={season.number}
                    key={season.id}
                  >{`Season ${season.number}`}</option>
                ))}
              </select>
            </div>

            <EpisodesList episodes={episodesBySeason} />
          </div>
        </div>
      )}
    </div>
  );
}
