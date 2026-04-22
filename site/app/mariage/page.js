import { getCollectionSubcategories, getSubcategoryProducts } from '../../lib/data';
import CollectionLayout from '../components/CollectionLayout/CollectionLayout';

export const metadata = {
  title: 'Tenues Mariage | PriStyle',
  description: 'Découvrez nos tenues de mariage africaines sur mesure : robes, boubous et ensembles pour votre grand jour.',
};

export default async function MariagePage({ searchParams }) {
  const params = await searchParams;

  const subcategories = await getCollectionSubcategories('tenue-mariage');
  const selectedCat = params?.cat || subcategories[0]?.slug || '';
  const page = Math.max(1, parseInt(params?.page || '1', 10));

  const { products, total } = await getSubcategoryProducts(selectedCat, page, 18);

  return (
    <CollectionLayout
      gender="mariage"
      title="Tenues Mariage"
      subcategories={subcategories}
      selectedCat={selectedCat}
      products={products}
      total={total}
      page={page}
      limit={18}
    />
  );
}
