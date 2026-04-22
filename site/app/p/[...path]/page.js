import { redirect } from 'next/navigation';

const STORAGE_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/catalog-media/`;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://pristyle.vercel.app';

// Map dossier racine → page collection
const GENDER_ROUTES = {
  femme: '/femme',
  homme: '/homme',
  'tenue-mariage': '/mariage',
  enfant: '/enfant',
};

export async function generateMetadata({ params }) {
  const { path } = await params;
  const imagePath = path.join('/');
  const imageUrl = `${STORAGE_URL}${imagePath}`;

  const root = path[0];
  const collectionLabel = {
    femme: 'Collection Femme',
    homme: 'Collection Homme',
    'tenue-mariage': 'Tenue de Mariage',
    enfant: 'Collection Enfant',
  }[root] || 'Collection PriStyle';

  const title = `Modèle PriStyle – ${collectionLabel}`;
  const description = 'Tenues africaines sur mesure, livrées partout. Commandez sur WhatsApp.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/p/${imagePath}`,
      siteName: 'PriStyle',
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 1067,
          alt: title,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function SharePage({ params }) {
  const { path } = await params;
  const root = path[0];
  const destination = GENDER_ROUTES[root] || '/';
  redirect(destination);
}
