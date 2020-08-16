import Link from "next/link";
import useSessionContext from "hooks/useSessionContext";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  const [session] = useSessionContext();

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.container}`}>
        <Link href="/">
          <a>
            <h2>VAKT Trading</h2>
          </a>
        </Link>
        <div className={styles.nav}>
          {!session.user ? (
            <>
              <Link href="/login">
                <a className={styles.link}>Login</a>
              </Link>
              <Link href="/signup">
                <a className="btn-primary">Sign Up</a>
              </Link>
            </>
          ) : (
            <>
              <Link href="/listings">
                <a className={styles.link}>Listings</a>
              </Link>
              <Link href="/user/[id]" as={`/user/${session.user.id}`}>
                <a className={styles.user}>{session.user.username}</a>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
