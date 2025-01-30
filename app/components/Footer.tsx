import { Link } from "@remix-run/react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import styles from "../styles/Footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.socialIcons}>
        <Link
          to="https://www.fanzoo.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Facebook className={styles.icon} />
        </Link>
        <Link
          to="https://x.com/fanzooinc"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Twitter className={styles.icon} />
        </Link>
        <Link
          to="https://www.instagram.com/fanzooinc/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Instagram className={styles.icon} />
        </Link>
        <Link
          to="https://www.linkedin.com/company/fanzoo/posts/?feedView=all"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Linkedin className={styles.icon} />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
