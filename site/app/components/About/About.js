import Image from "next/image";
import styles from "./About.module.css";

export default function About() {
  return (
    <section className={styles.section} id="apropos">
      <div className={styles.content}>
        <div className={`${styles.imageColumn} reveal-left`}>
          <div className={styles.imageGrid}>
            <div className={styles.imageWrapper}>
              <Image
                src="/images/categories/robes-1.webp"
                alt="Atelier Sublime Wax — confection artisanale"
                fill
                className={styles.aboutImage}
                sizes="(max-width: 900px) 50vw, 25vw"
              />
            </div>
            <div className={styles.imageWrapper}>
              <Image
                src="/images/categories/ensemble-homme-1.webp"
                alt="Tissu wax premium"
                fill
                className={styles.aboutImage}
                sizes="(max-width: 900px) 50vw, 15vw"
              />
            </div>
            <div className={styles.imageWrapper}>
              <Image
                src="/images/categories/jupes-1.webp"
                alt="Détail couture wax"
                fill
                className={styles.aboutImage}
                sizes="(max-width: 900px) 50vw, 15vw"
              />
            </div>
          </div>
          <div className={styles.goldFrame} />
        </div>

        <div className={`${styles.textColumn} reveal-right`}>
          <span className="section-label">Notre Histoire</span>
          <h2 className="section-title">L&apos;Art du Wax,<br />Notre Passion</h2>
          <p className={styles.description}>
            Depuis plus de 10 ans, notre atelier donne vie à des créations
            uniques en tissu wax. Chaque pièce est confectionnée à la main avec
            les plus beaux tissus importés d&apos;Afrique, alliant tradition
            ancestrale et design contemporain.
          </p>
          <p className={styles.description}>
            Notre mission : sublimer chaque personne avec des vêtements qui
            racontent une histoire, célèbrent la culture africaine et
            s&apos;adaptent parfaitement à chaque morphologie grâce au
            sur-mesure.
          </p>

          <div className={styles.features}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>✂️</div>
              <div className={styles.featureText}>
                <div className={styles.featureTitle}>100% Sur Mesure</div>
                <div className={styles.featureDesc}>
                  Chaque vêtement est confectionné à vos mesures exactes
                </div>
              </div>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>🌍</div>
              <div className={styles.featureText}>
                <div className={styles.featureTitle}>Tissus Premium</div>
                <div className={styles.featureDesc}>
                  Les meilleurs wax sélectionnés directement en Afrique
                </div>
              </div>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>💛</div>
              <div className={styles.featureText}>
                <div className={styles.featureTitle}>Fait Main avec Amour</div>
                <div className={styles.featureDesc}>
                  Un savoir-faire artisanal transmis de génération en génération
                </div>
              </div>
            </div>
          </div>

          <a
            href="https://wa.me/33XXXXXXXXXX"
            className="btn btn-primary"
            id="about-cta"
          >
            Découvrir notre atelier
          </a>
        </div>
      </div>
    </section>
  );
}
