"use client";

import Image from "next/image";
import styles from "./GenderSection.module.css";

export default function GenderSection() {
  return (
    <section className={styles.section} id="collections">
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          Découvrez Tous Nos vêtements Et Accessoires Africains&nbsp;:
        </h2>
      </div>

      <div className={styles.grid}>
        <a href="/homme" className={styles.card} id="card-pour-lui">
          <div className={styles.cardImageWrapper}>
            <Image
              src="/images/genre/homme.webp"
              alt="Collection Homme — Mode africaine wax"
              fill
              className={styles.cardImage}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className={styles.cardOverlay} />
          <div className={styles.cardContent}>
            <h3 className={styles.cardLabel}>Pour Lui</h3>
        <span className={styles.cardBtn}>Découvrez la collection homme →</span>
          </div>
        </a>

        <a href="/femme" className={styles.card} id="card-pour-elle">
          <div className={styles.cardImageWrapper}>
            <Image
              src="/images/genre/femme.webp"
              alt="Collection Femme — Mode africaine wax"
              fill
              className={styles.cardImage}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className={styles.cardOverlay} />
          <div className={styles.cardContent}>
            <h3 className={styles.cardLabel}>Pour Elle</h3>
        <span className={styles.cardBtn}>Découvrez la collection femme →</span>
          </div>
        </a>
      </div>

      <div className={styles.ctaRow}>
        <a href="#femme" className={styles.ctaBtn} id="btn-toutes-collections">
          Toutes les collections
        </a>
      </div>
    </section>
  );
}
