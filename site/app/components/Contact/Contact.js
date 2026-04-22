import styles from "./Contact.module.css";

export default function Contact() {
  return (
    <section className={styles.section} id="contact">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className="section-label">Contact</span>
          <h2 className={`section-title ${styles.title}`}>Un Modèle Vous Plaît ?</h2>
        </div>

        <div className={styles.grid}>
          {/* Colonne gauche : coordonnées */}
          <div className={styles.coordonnees}>
            <h3 className={styles.colTitle}>Nos coordonnées</h3>

            <div className={styles.card}>
              <div className={styles.cardIcon}>📞</div>
              <div className={styles.cardBody}>
                <p className={styles.cardLabel}>Téléphone</p>
                <p className={styles.cardSub}>Appelez-nous directement</p>
                <a href="tel:+33644814218" className={styles.cardValue}>+33 6 44 81 42 18</a>
              </div>
            </div>

            <a
              href="https://wa.me/33644814218?text=Bonjour%2C%20je%20suis%20int%C3%A9ress%C3%A9(e)%20par%20vos%20cr%C3%A9ations%20PriStyle"
              className="btn btn-whatsapp"
              target="_blank"
              rel="noopener noreferrer"
              id="contact-whatsapp-btn"
            >
              💬 Commander sur WhatsApp
            </a>
          </div>

          {/* Colonne droite : localisation */}
          <div className={styles.localisation}>
            <h3 className={styles.colTitle}>Notre localisation</h3>

            <div className={styles.mapWrapper}>
              <iframe
                src="https://maps.google.com/maps?q=Makepe+BM,+Douala,+Cameroun&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className={styles.map}
                loading="lazy"
                title="Localisation PriStyle"
              />
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Makepe+BM%2C+Douala%2C+Cameroun"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mapOverlay}
                aria-label="Obtenir l'itinéraire"
              >
                <span className={styles.mapCta}>📍 Obtenir l’itinéraire →</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

