import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import styles from './PopularCarousel.module.css';

// Server component to read the files
export default function PopularCarousel() {
  const imagesDir = path.join(process.cwd(), 'public', 'images', 'populaires');
  let items = [];
  
  try {
    const files = fs.readdirSync(imagesDir);
    items = files.filter(f => f.endsWith('.webp')).map(file => {
      // Clean up the name: remove extension and (numbers)
      let name = file.replace('.webp', '');
      name = name.replace(/\s*\(\d+\)\s*/g, ''); // Remove (14)
      name = name.replace(/-/g, ' '); // Replace hyphens with spaces
      // Capitalize first letter of each word
      name = name.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
      
      return {
        filename: file,
        name: name,
        src: `/images/populaires/${file}`
      };
    });
  } catch (error) {
    console.error("Error reading popular images:", error);
  }

  if (items.length === 0) return null;

  // Duplicate items for infinite scroll effect
  const carouselItems = [...items, ...items];

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Nos robes les plus populaires</h2>
        <p className={styles.subtitle}>Nos créations les plus demandées — disponibles en quantité limitée.</p>
      </div>

      <div className={styles.carouselContainer}>
        <div className={styles.carouselTrack}>
          {carouselItems.map((item, index) => (
            <div key={`${item.filename}-${index}`} className={styles.carouselItem}>
              <div className={styles.imageWrapper}>
                <Image
                  src={item.src}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 250px, 350px"
                  className={styles.image}
                  style={{ objectFit: 'cover' }}
                />
                <div className={styles.overlay}>
                  <a href="https://wa.me/33XXXXXXXXXX" target="_blank" rel="noopener noreferrer" className={styles.ctaBtn}>
                    ✦ Commander sur mesure
                  </a>
                </div>
              </div>
              <div className={styles.itemInfo}>
                <h3 className={styles.itemName}>{item.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
