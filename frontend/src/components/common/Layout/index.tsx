import Navbar from "../Navbar";
import styles from "./Layout.module.scss";

const Layout = ({ children }) => {
  return (
    <main className={styles.main}>
      <Navbar />
      {children}
    </main>
  );
};

export default Layout;
