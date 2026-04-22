import CollectionLayout from '../components/CollectionLayout/CollectionLayout';
import { getCollectionSubcategories, getSubcategoryProducts } from '../../lib/data';

export const metadata = {
  title: 'Collection Homme | PriStyle',
  description: 'Découvrez nos tenues africaines pour homme : boubous, ensembles, chemises et plus encore. Sur mesure et livrés partout.',
};

export default async function HommePage({ searchParams }) {
  const params = await searchParams;

  const subcategories = await getCollectionSubcategories('homme');
  const selectedCat = params?.cat || subcategories[0]?.slug || '';
  const page = Math.max(1, parseInt(params?.page || '1', 10));

  const { products, total } = await getSubcategoryProducts(selectedCat, page, 18);

  return (
    <CollectionLayout
      gender="homme"
      title="Collection Homme"
      subcategories={subcategories}
      selectedCat={selectedCat}
      products={products}
      total={total}
      page={page}
      limit={18}
    />
  );
}
