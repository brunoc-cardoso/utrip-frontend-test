import { useContext, useEffect } from "react";

import { Content } from "@/components/Content";
import { Header } from "@/components/Header";
import { ShowsContext } from "@/context/shows";
import styles from "@/pages/Home/styles.module.scss";

export function Home() {
  const { loadShows, loading } = useContext(ShowsContext);

  useEffect(() => {
    loadShows();
  }, []);

  if (loading) {
    return <span>carregando home...</span>;
  }

  return (
    <div className={styles.container}>
      <Header />
      <Content />
    </div>
  );
}
