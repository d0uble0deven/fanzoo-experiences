import { Link } from "@remix-run/react";
import { Home, Calendar } from "lucide-react";
import styles from "../styles/NavBar.module.css";

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navLinks}>
        <li className={styles.leftNav}>
          <Link to="/">
            <Home className={styles.icon} />
          </Link>
        </li>
        <li className={styles.centerNav}>
          <Link
            to="https://www.fanzoo.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.logo}
          >
            <img
              src="public/fanzoo_logo.jpg"
              // src="public/fanzoo_logo.jpeg"
              // src="public/FanZooLogo.png"
              alt="FanZoo Logo"
              className={styles.logoImage}
            />
          </Link>
        </li>
        <li className={styles.rightNav}>
          <Link to="/success">
            <Calendar className={styles.icon} />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
