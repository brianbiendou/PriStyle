import styles from "./EnfantSection.module.css";
import EnfantGrid from "./EnfantGrid";
import { getEnfantPairs } from "@/lib/data";

const FALLBACK_PAIRS = [
  { front: "/images/categories/enfant-1.webp", back: "/images/categories/enfant-2.webp" },
  { front: "/images/categories/enfant-1.webp", back: "/images/categories/enfant-2.webp" },
  { front: "/images/categories/enfant-1.webp", back: "/images/categories/enfant-2.webp" },
];

export default async function EnfantSection() {
  let allPairs = await getEnfantPairs();
  if (!allPairs.length) allPairs = FALLBACK_PAIRS;

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

      <EnfantGrid allPairs={allPairs} />

      <div className={styles.ctaRow}>
        <a
          href="/enfant"
          className="btn btn-outline"
          id="btn-enfant-collection"
        >
          Voir la collection enfant
        </a>
      </div>
    </section>
  );
}
