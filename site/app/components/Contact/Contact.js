import styles from "./Contact.module.css";

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Bonjour, je suis intéressé(e) par vos créations PriStyle')}`;

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
              <div className={styles.cardIcon}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#9B7B5A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.01z" />
                </svg>
              </div>
              <div className={styles.cardBody}>
                <p className={styles.cardLabel}>Téléphone</p>
                <p className={styles.cardSub}>Envoyez-nous un message</p>
                <a href="tel:+33644814218" className={styles.cardValue}>+33 6 44 81 42 18</a>
              </div>
            </div>

            <a
              href={WA_LINK}
              className={`btn btn-whatsapp ${styles.waBtn}`}
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

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

