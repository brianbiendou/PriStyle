import CollectionLayout from '../components/CollectionLayout/CollectionLayout';
import { getCollectionSubcategories, getSubcategoryProducts } from '../../lib/data';

export const metadata = {
  title: 'Collection Femme | PriStyle',
  description: 'Découvrez nos tenues africaines pour femme : robes wax, boubous, jupes, hauts et plus encore. Sur mesure et livrés partout.',
};

export default async function FemmePage({ searchParams }) {
  const params = await searchParams;

  const subcategories = await getCollectionSubcategories('femme');
  const selectedCat = params?.cat || subcategories[0]?.slug || '';
  const page = Math.max(1, parseInt(params?.page || '1', 10));

  const { products, total } = await getSubcategoryProducts(selectedCat, page, 18);

  return (
    <CollectionLayout
      gender="femme"
      title="Collection Femme"
      subcategories={subcategories}
      selectedCat={selectedCat}
      products={products}
      total={total}
      page={page}
      limit={18}
    />
  );
}
