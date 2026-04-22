import styles from "./Contact.module.css";

export default function Contact() {
  return (
    <section className={styles.section} id="contact">
      <div className={`${styles.content} reveal`}>
        <div className={styles.whatsappIcon}>💬</div>
        <span className="section-label">Contact</span>
        <h2 className="section-title">Un Modèle Vous Plaît ?</h2>
        <p className={styles.subtitle}>
          Commandez votre tenue sur mesure directement via WhatsApp. Nous vous
          accompagnons du choix du tissu à la livraison, pour une expérience
          personnalisée et unique.
        </p>

        <span className={styles.phone}>📞 +33 X XX XX XX XX</span>

        <div className={styles.ctaGroup}>
          <a
            href="https://wa.me/33XXXXXXXXXX?text=Bonjour%2C%20je%20suis%20int%C3%A9ress%C3%A9(e)%20par%20vos%20cr%C3%A9ations%20Sublime%20Wax"
            className="btn btn-whatsapp"
            target="_blank"
            rel="noopener noreferrer"
            id="contact-whatsapp-btn"
          >
            💬 Commander sur WhatsApp
          </a>
          <span className={styles.orText}>ou</span>
          <a
            href="https://www.instagram.com/"
            className="btn btn-outline"
            target="_blank"
            rel="noopener noreferrer"
            id="contact-instagram-btn"
          >
            📸 Suivez-nous sur Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
