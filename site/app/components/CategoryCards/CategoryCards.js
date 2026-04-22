import Image from "next/image";
import styles from "./CategoryCards.module.css";
import { getCategoryCardsData } from "@/lib/data";

function CategoryCard({ title, image1, image2, count, slug, gender }) {
  return (
    <a
      href={`/${gender}?cat=${slug}&page=1`}
      className={`${styles.card} reveal`}
      id={`category-card-${slug}`}
    >
      <div className={styles.imageContainer}>
        <Image
          src={image1}
          alt={title.replace("\n", " ")}
          fill
          className={styles.cardImagePrimary}
          sizes="(max-width: 600px) 50vw, (max-width: 1024px) 50vw, 25vw"
        />
        <Image
          src={image2}
          alt={`${title.replace("\n", " ")} — vue alternative`}
          fill
          className={styles.cardImageSecondary}
          sizes="(max-width: 600px) 50vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>
      <div className={styles.cardOverlay} />
      <span className={styles.imageCount}>{count} modèles</span>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>
          {title.split("\n").map((line, i) => (
            <span key={i}>
              {line}
              {i === 0 && <br />}
            </span>
          ))}
        </h3>
        <span className={styles.cardCta}>Voir la collection</span>
      </div>
    </a>
  );
}

export default async function CategoryCards() {
  const femmeCategories = await getCategoryCardsData('femme');
  const hommeCategories = await getCategoryCardsData('homme');

  return (
    <>
      {/* Section Femme */}
      <section
        className={`${styles.section} ${styles.sectionFemme}`}
        id="femme"
      >
        <div className={styles.sectionHeader}>
          <div className={styles.sectionHeaderText}>
            <span className={styles.sectionEyebrow}>Pour Elle</span>
            <h2 className={styles.sectionTitleLarge}>Collection Femme</h2>
          </div>
          <div className={styles.sectionDivider} />
          <p className={styles.sectionSubtitleSide}>
            Robes, boubous, jupes et vestes — l&apos;élégance africaine réinventée
          </p>
        </div>

        <div className={`${styles.grid} stagger`}>
          {femmeCategories.map((cat) => (
            <CategoryCard key={cat.slug} {...cat} gender="femme" />
          ))}
        </div>

        <div className={styles.ctaRow}>
          <a href="/femme" className="btn btn-outline" id="btn-toutes-collections-femme">
            Toutes les collections femme
          </a>
        </div>
      </section>

      {/* Section Homme */}
      <section
        className={`${styles.section} ${styles.sectionHomme}`}
        id="homme"
      >
        <div className={styles.sectionHeader}>
          <div className={styles.sectionHeaderText}>
            <span className={styles.sectionEyebrow}>Pour Lui</span>
            <h2 className={styles.sectionTitleLarge}>Collection Homme</h2>
          </div>
          <div className={styles.sectionDivider} />
          <p className={styles.sectionSubtitleSide}>
            Boubous, ensembles raffinés et chemises wax — l&apos;art du style masculin
          </p>
        </div>

        <div className={`${styles.grid} stagger`}>
          {hommeCategories.map((cat) => (
            <CategoryCard key={cat.slug} {...cat} gender="homme" />
          ))}
        </div>

        <div className={styles.ctaRow}>
          <a href="/homme" className="btn btn-outline" id="btn-toutes-collections-homme">
            Toutes les collections homme
          </a>
        </div>
      </section>
    </>
  );
}
