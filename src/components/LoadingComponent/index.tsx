import styles from "@/components/LoadingComponent/styles.module.scss";

export function LoadingComponent() {
  return (
    <div className={styles.container}>
      <span>Loading...</span>
    </div>
  );
}
