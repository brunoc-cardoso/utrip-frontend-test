import { useContext, useEffect } from "react";

import { Header } from "@/components/Header";
import { LoadingComponent } from "@/components/LoadingComponent";
import { ShowsList } from "@/components/ShowsList";
import { ShowsContext } from "@/context/shows";
import styles from "@/pages/Home/styles.module.scss";

export function Home() {
  const { loadShows, loading } = useContext(ShowsContext);

  useEffect(() => {
    loadShows();
  }, []);

  return (
    <div className={styles.container}>
      <Header />

      {loading && <LoadingComponent />}

      {!loading && <ShowsList />}
    </div>
  );
}
