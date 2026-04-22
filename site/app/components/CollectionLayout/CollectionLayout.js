import Link from 'next/link';
import Image from 'next/image';
import styles from './CollectionLayout.module.css';

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
const WA_MESSAGE = encodeURIComponent('Bonjour, je suis intéressé(e) par ce modèle PriStyle. Pouvez-vous me donner plus d\'informations ?');

function buildWaLink(src) {
  const msg = encodeURIComponent(`Bonjour, je suis intéressé(e) par ce modèle PriStyle : ${src}`);
  return `https://wa.me/${WA_NUMBER}?text=${msg}`;
}

export default function CollectionLayout({
  gender,
  title,
  subcategories,
  selectedCat,
  products,
  total,
  page,
  limit,
}) {
  const remaining = Math.max(0, total - page * limit);
  const hasNext = remaining > 0;
  const hasPrev = page > 1;

  return (
    <main className={styles.main}>
      {/* Header en 2 colonnes alignées avec le layout :
          colonne gauche = "← Accueil" (sous la sidebar)
          colonne droite = titre (au-dessus de la grille) */}
      <div className={styles.splitHeader}>
        <div className={styles.splitHeaderLeft}>
          <Link href="/" className={styles.backBtn}>← Accueil</Link>
        </div>
        <div className={styles.splitHeaderRight}>
          <h1 className={styles.pageTitle}>{title}</h1>
        </div>
      </div>

      <div className={styles.layout}>
        {/* Sidebar catégories */}
        <aside className={styles.sidebar}>
          <p className={styles.sidebarTitle}>Catégories</p>
          <nav className={styles.catList}>
            {subcategories.map(sub => (
              <Link
                key={sub.slug}
                href={`/${gender}?cat=${sub.slug}&page=1`}
                className={`${styles.catLink} ${selectedCat === sub.slug ? styles.catLinkActive : ''}`}
              >
                <span>{sub.name}</span>
                <span className={styles.catCount}>{sub.count}</span>
              </Link>
            ))}
          </nav>
        </aside>

          {/* Zone produits */}
          <div className={styles.gridArea}>
            {products.length === 0 ? (
              <p className={styles.empty}>Aucun produit dans cette catégorie.</p>
            ) : (
              <>
                <p className={styles.gridMeta}>
                  {total} modèle{total > 1 ? 's' : ''} — page {page}
                </p>

                <div className={styles.bentoGrid}>
                  {products.map((p, i) => (
                    <div key={p.id ?? i} className={styles.bentoCard}>
                      <div className={styles.bentoImgWrap}>
                        <Image
                          src={p.src}
                          alt="Modèle PriStyle"
                          width={600}
                          height={800}
                          className={styles.bentoImg}
                          sizes="(max-width: 480px) 50vw, (max-width: 860px) 50vw, 30vw"
                          loading={i < 2 ? 'eager' : 'lazy'}
                          priority={i === 0}
                          quality={68}
                          placeholder="empty"
                        />
                      </div>
                      <div className={styles.bentoOverlay}>
                        <a
                          href={buildWaLink(p.src)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.bentoCta}
                        >
                          <span className={styles.ctaLong}>💬 Commander sur mesure</span>
                          <span className={styles.ctaShort}>💬 Commander</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                {(hasPrev || hasNext) && (
                  <div className={styles.pagination}>
                    {hasPrev && (
                      <Link
                        href={`/${gender}?cat=${selectedCat}&page=${page - 1}`}
                        className={styles.paginationBtn}
                      >
                        ← Précédent
                      </Link>
                    )}
                    {hasNext && (
                      <Link
                        href={`/${gender}?cat=${selectedCat}&page=${page + 1}`}
                        className={styles.paginationBtn}
                      >
                        Suivant ({remaining} restant{remaining > 1 ? 's' : ''}) →
                      </Link>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
  );
}
