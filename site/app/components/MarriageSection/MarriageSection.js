"use client";

import Image from "next/image";
import styles from "./MarriageSection.module.css";

const MARRIAGE_IMAGES = Array.from({ length: 8 }, (_, i) => ({
  src: `/images/categories/mariage-${i + 1}.webp`,
  alt: `Tenue de mariage couple wax ${i + 1}`,
}));

export default function MarriageSection() {
  return (
    <section className={styles.section} id="mariage">
      <div className="text-center">
        <span className="section-label">Mariage</span>
        <h2 className="section-title">Sublimez Votre Union</h2>
        <p className="section-subtitle center">
          Des tenues de couple assorties, confectionnées sur mesure pour le plus
          beau jour de votre vie
        </p>
      </div>

      <div className={styles.showcase}>
        <div className={styles.scrollContainer} id="marriage-scroll">
          {MARRIAGE_IMAGES.map((img, i) => (
            <div key={i} className={styles.marriageCard}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className={styles.marriageImage}
                sizes="300px"
              />
              <div className={styles.marriageOverlay} />
              {i < 3 && (
                <span className={styles.goldBadge}>Best-seller</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className={`${styles.stats} reveal`}>
        <div className={styles.stat}>
          <div className={styles.statNumber}>127+</div>
          <div className={styles.statLabel}>Modèles couple</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statNumber}>500+</div>
          <div className={styles.statLabel}>Couples habillés</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statNumber}>100%</div>
          <div className={styles.statLabel}>Sur mesure</div>
        </div>
      </div>

      <div className={styles.ctaRow}>
        <a
          href="https://wa.me/33XXXXXXXXXX?text=Bonjour%2C%20je%20suis%20int%C3%A9ress%C3%A9(e)%20par%20une%20tenue%20de%20mariage"
          className="btn btn-primary"
          target="_blank"
          rel="noopener noreferrer"
          id="btn-mariage-whatsapp"
        >
          💬 Discuter de votre tenue de mariage
        </a>
      </div>
    </section>
  );
}
