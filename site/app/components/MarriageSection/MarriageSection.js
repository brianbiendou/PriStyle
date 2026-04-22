import styles from "./MarriageSection.module.css";
import MarriageCarousel from "./MarriageCarousel";
import { getMarriageImages } from "@/lib/data";

// Fallback : images locales si Supabase vide
const FALLBACK_IMAGES = Array.from({ length: 8 }, (_, i) => ({
  src: `/images/categories/mariage-${i + 1}.webp`,
  isBestSeller: i < 3,
}));

export default async function MarriageSection() {
  let allImages = await getMarriageImages();
  if (!allImages.length) allImages = FALLBACK_IMAGES;

  return (
    <section className={styles.section} id="mariage">
      <div className="text-center">
        <span className="section-label">Mariage sur Mesure</span>
        <h2 className="section-title">Votre Tenue de Rêve,<br />Confectionnée pour Vous</h2>
        <p className="section-subtitle center">
          Choisissez votre modèle, nous l'adaptons à vos mesures et vos couleurs.
          <strong> 100% personnalisé, livré où vous êtes.</strong>
        </p>
      </div>

      <MarriageCarousel allImages={allImages} />

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
          href="https://wa.me/33644814218?text=Bonjour%2C%20je%20suis%20int%C3%A9ress%C3%A9(e)%20par%20une%20tenue%20de%20mariage"
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
