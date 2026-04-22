import styles from "./Marquee.module.css";

const MARQUEE_ITEMS = [
  "Haute Couture Africaine",
  "Sur Mesure",
  "Tissu Wax Premium",
  "Fait Main",
  "Élégance Authentique",
  "Création Unique",
  "Mode Africaine",
  "Savoir-Faire Artisanal",
];

export default function Marquee() {
  // Duplicate items for seamless loop
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className={styles.marquee} id="marquee-banner">
      <div className={styles.marqueeTrack}>
        {items.map((text, i) => (
          <div key={i} className={styles.marqueeItem}>
            <span className={styles.marqueeText}>{text}</span>
            <span className={styles.marqueeDot} />
          </div>
        ))}
      </div>
    </div>
  );
}
