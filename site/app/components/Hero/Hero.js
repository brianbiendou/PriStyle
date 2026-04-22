import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero} id="hero">
      <div className={styles.heroImageWrapper}>
        <Image
          src="/images/hero/hero.webp"
          alt="Sublime Wax — Haute Couture Africaine"
          fill
          priority
          className={styles.heroImage}
          sizes="100vw"
        />
      </div>

      <div className={styles.heroOverlay} />

      <div className={styles.heroContent}>

        <h1 className={styles.heroTitle}>
          L&apos;Art du <span className={styles.heroAccent}>Wax</span>
          <br />
          Sublimé
        </h1>
        <p className={styles.heroSubtitle}>
          Haute couture africaine sur mesure — Des créations uniques
          confectionnées avec passion et savoir-faire artisanal
        </p>
        <div className={styles.heroCta}>
          <a href="#collections" className="btn btn-primary" id="hero-cta-discover">
            Découvrir nos créations
          </a>
          <a
            href="https://wa.me/33XXXXXXXXXX"
            className="btn btn-outline"
            style={{ borderColor: "rgba(255,255,255,0.5)", color: "#fff" }}
            target="_blank"
            rel="noopener noreferrer"
            id="hero-cta-contact"
          >
            ✦ Commander sur mesure
          </a>
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <span className={styles.scrollText}>Défiler</span>
        <div className={styles.scrollLine} />
      </div>

      <div className={styles.heroGoldLine} />
    </section>
  );
}
