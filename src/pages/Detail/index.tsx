import { useContext, useEffect } from "react";

import { EpisodesList } from "@/components/EpisodesList";
import { Header } from "@/components/Header";
import { ShowsContext } from "@/context/shows";
import styles from "@/pages/Detail/styles.module.scss";

export function Detail() {
  const {
    selectedShow: show,
    seasons,
    loading,
    onSelectSeason,
    episodesBySeason,
  } = useContext(ShowsContext);

  const removeTagsFromText = ({ value }: { value: string }) => {
    return value
      .replace("<p>", "")
      .replace("</p>", "")
      .replace("<b>", "")
      .replace("</b>", "");
  };

  const handleSelectSeason = ({
    seasonNumber = 1,
  }: {
    seasonNumber?: number;
  }) => {
    onSelectSeason({ seasonNumber });
  };

  const Info = ({ title, value }: { title: string; value: string }) => {
    return (
      <span>
        <strong>{title}: </strong>
        {value}
      </span>
    );
  };

  useEffect(() => {
    handleSelectSeason({});
  }, []);

  if (loading) {
    return <span>carregando ...</span>;
  }

  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.content}>
        <div className={styles.info}>
          <div className={styles.coverContainer}>
            <img src={show?.image?.original || show?.image?.medium} alt="" />
          </div>

          <div className={styles.infoContent}>
            <Info title="Title" value={show.name} />
            <Info title="Description" value={show.summary} />
            <Info title="Release date" value={show.premiered} />
            <Info title="Status" value={show.status} />

            <div className={styles.genderContainer}>
              <Info title="Genres" value={""} />
              <div className={styles.genderCards}>
                {show?.genres?.map((gender) => (
                  <span className={styles.genderCard}>{gender}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.seasons}>
          <div className={styles.selectContainer}>
            <span>Select a season</span>
            <select
              name="seasons"
              onChange={(event) =>
                handleSelectSeason({ seasonNumber: Number(event.target.value) })
              }
            >
              {seasons.map((season) => (
                <option
                  value={season.number}
                >{`Season ${season.number}`}</option>
              ))}
            </select>
          </div>

          <EpisodesList episodes={episodesBySeason} />
        </div>
      </div>
    </div>
  );
}

{
  /* <Link to="/" className={styles.backButton}>
          <button>{`< Voltar`}</button>
        </Link> */
}
