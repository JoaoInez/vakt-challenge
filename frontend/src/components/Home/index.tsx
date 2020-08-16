import useSessionContext from "hooks/useSessionContext";
import Link from "next/link";
import styles from "./Home.module.scss";

const Home = () => {
  const [session] = useSessionContext();

  return (
    <section>
      <article className={styles.article}>
        <h1>VAKT Trading</h1>
        <p className={styles.subtitle}>An online market for the world trader</p>
        <div>
          {!session.user ? (
            <>
              <Link href="/signup">
                <a className={styles.primaryBtn}>Sign Up</a>
              </Link>
              <Link href="/login">
                <a className={styles.outlineBtn}>Login</a>
              </Link>
            </>
          ) : (
            <Link href="/listings">
              <a className={styles.primaryBtn}>See all listings</a>
            </Link>
          )}
        </div>
      </article>
    </section>
  );
};

export default Home;
