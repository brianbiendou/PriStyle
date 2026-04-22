"use client";

import Image from "next/image";
import styles from "./EnfantSection.module.css";

const ENFANT_IMAGES = [
  { src: "/images/categories/enfant-1.webp", alt: "Robe wax pour fille" },
  { src: "/images/categories/enfant-2.webp", alt: "Tenue wax enfant" },
];

export default function EnfantSection() {
  return (
    <section className={styles.section} id="enfant">
      <div className="text-center">
        <span className="section-label">Pour les petits</span>
        <h2 className="section-title">Collection Enfant</h2>
        <p className="section-subtitle center">
          D&apos;adorables tenues wax pour les plus jeunes — le style africain
          dès le plus jeune âge
        </p>
      </div>

      <div className={`${styles.grid} stagger`}>
        {ENFANT_IMAGES.map((img, i) => (
          <div key={i} className={`${styles.card} reveal`}>
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className={styles.cardImage}
              sizes="(max-width: 600px) 50vw, 200px"
            />
            <div className={styles.cardOverlay} />
          </div>
        ))}
      </div>

      <div className={styles.ctaRow}>
        <a
          href="https://wa.me/33XXXXXXXXXX?text=Bonjour%2C%20je%20suis%20int%C3%A9ress%C3%A9(e)%20par%20la%20collection%20enfant"
          className="btn btn-outline"
          target="_blank"
          rel="noopener noreferrer"
          id="btn-enfant-whatsapp"
        >
          Voir la collection enfant
        </a>
      </div>
    </section>
  );
}
