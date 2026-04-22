import { getCollectionSubcategories, getSubcategoryProducts } from '../../lib/data';
import CollectionLayout from '../components/CollectionLayout/CollectionLayout';

export const metadata = {
  title: 'Tenues Enfant | PriStyle',
  description: 'Découvrez nos tenues africaines pour enfant, confectionnées sur mesure en tissu wax.',
};

export default async function EnfantPage({ searchParams }) {
  const params = await searchParams;

  const subcategories = await getCollectionSubcategories('enfant');
  const selectedCat = params?.cat || subcategories[0]?.slug || '';
  const page = Math.max(1, parseInt(params?.page || '1', 10));

  const { products, total } = await getSubcategoryProducts(selectedCat, page, 18);

  return (
    <CollectionLayout
      gender="enfant"
      title="Collection Enfant"
      subcategories={subcategories}
      selectedCat={selectedCat}
      products={products}
      total={total}
      page={page}
      limit={18}
    />
  );
}
