import fs from 'fs';
import path from 'path';
import styles from './PopularCarousel.module.css';
import PopularCarouselClient from './PopularCarouselClient';

// Server component — lit les fichiers et passe les données au client
export default function PopularCarousel() {
  const imagesDir = path.join(process.cwd(), 'public', 'images', 'populaires');
  let items = [];

  try {
    const files = fs.readdirSync(imagesDir);
    items = files.filter(f => f.endsWith('.webp')).map(file => {
      let name = file.replace('.webp', '');
      name = name.replace(/\s*\(\d+\)\s*/g, '');
      name = name.replace(/-/g, ' ');
      name = name.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
      return { filename: file, name, src: `/images/populaires/${file}` };
    });
  } catch (error) {
    console.error("Error reading popular images:", error);
  }

  if (items.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Nos robes les plus populaires</h2>
        <p className={styles.subtitle}>Nos créations les plus demandées — disponibles en quantité limitée.</p>
      </div>
      {/* Le client shuffle les 37 images à chaque visite */}
      <PopularCarouselClient items={items} />
    </section>
  );
}
