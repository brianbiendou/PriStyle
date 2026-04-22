import Image from "next/image";
import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} id="footer">
      <div className={styles.footerContent}>
        <div className={styles.brand}>
          <Image
            src="/images/logos/logoimagetexte.png"
            alt="Sublime Wax"
            width={130}
            height={50}
            style={{ filter: "brightness(10) invert(0)", width: "auto", height: "auto" }}
          />
          <p className={styles.brandDesc}>
            Haute couture africaine sur mesure. Des créations uniques en tissu
            wax, confectionnées avec passion et savoir-faire artisanal.
          </p>
          <div className={styles.socialLinks}>
            <a
              href="https://www.instagram.com/"
              className={styles.socialLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              id="footer-instagram"
            >
              📸
            </a>
            <a
              href="https://www.facebook.com/"
              className={styles.socialLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              id="footer-facebook"
            >
              📘
            </a>
            <a
              href="https://wa.me/33XXXXXXXXXX"
              className={styles.socialLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              id="footer-whatsapp"
            >
              💬
            </a>
          </div>
        </div>

        <div>
          <h4 className={styles.footerTitle}>Collections</h4>
          <div className={styles.footerLinks}>
            <a href="#femme" className={styles.footerLink}>
              Collection Femme
            </a>
            <a href="#homme" className={styles.footerLink}>
              Collection Homme
            </a>
            <a href="#mariage" className={styles.footerLink}>
              Tenues Mariage
            </a>
            <a href="#" className={styles.footerLink}>
              Collection Enfant
            </a>
          </div>
        </div>

        <div>
          <h4 className={styles.footerTitle}>Catégories</h4>
          <div className={styles.footerLinks}>
            <a href="#" className={styles.footerLink}>
              Boubous
            </a>
            <a href="#" className={styles.footerLink}>
              Robes Africaines
            </a>
            <a href="#" className={styles.footerLink}>
              Ensembles
            </a>
            <a href="#" className={styles.footerLink}>
              Jupes & Hauts
            </a>
            <a href="#" className={styles.footerLink}>
              Vestes & Bombers
            </a>
          </div>
        </div>

        <div>
          <h4 className={styles.footerTitle}>Informations</h4>
          <div className={styles.footerLinks}>
            <a href="#apropos" className={styles.footerLink}>
              À propos
            </a>
            <a href="#contact" className={styles.footerLink}>
              Contact
            </a>
            <a href="#" className={styles.footerLink}>
              Livraison
            </a>
            <a href="#" className={styles.footerLink}>
              Mentions légales
            </a>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <span className={styles.copyright}>
          © {year} Sublime Wax — Tous droits réservés
        </span>
        <span className={styles.footerCredit}>
          Créé avec ♥ par{" "}
          <a href="https://matricx.fr" target="_blank" rel="noopener noreferrer">
            Matricx Consulting
          </a>
        </span>
      </div>
    </footer>
  );
}
