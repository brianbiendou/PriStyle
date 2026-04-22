import { supabase } from './supabase';

const STORAGE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL + '/storage/v1/object/public/catalog-media/';

export async function getCategoryCardsData(categorySlug) {
  const { data: category, error: catError } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', categorySlug)
    .single();

  if (catError || !category) {
    console.error('Error fetching category:', categorySlug, catError);
    return [];
  }

  const { data: subcategories, error } = await supabase
    .from('subcategories')
    .select(`
      id,
      name,
      slug,
      products (
        id,
        product_images (
          image_url
        )
      )
    `)
    .eq('category_id', category.id)
    .order('display_order');

  if (error) {
    console.error('Error fetching subcategories:', error);
    return [];
  }
  
  console.log(`Fetched ${subcategories.length} subcategories for ${categorySlug}`);

  return subcategories.map(sub => {
    const allImages = sub.products.flatMap(p => p.product_images.map(img => img.image_url));
    const count = sub.products.length;
    
    const image1 = allImages.length > 0 ? STORAGE_URL + allImages[0] : '/images/logos/logoimageonly.png';
    const image2 = allImages.length > 1 ? STORAGE_URL + allImages[1] : image1;

    const words = sub.name.split(' ');
    let title = sub.name;
    if (words.length >= 2) {
      title = words[0] + '\n' + words.slice(1).join(' ');
    }

    return {
      title,
      slug: sub.slug,
      image1,
      image2,
      count
    };
  }).filter(cat => cat.count > 0);
}

export async function getMarriageImages() {
  const { data: category, error: catError } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', 'tenue-mariage')
    .single();

  if (catError || !category) {
    console.error('Error fetching mariage category:', catError);
    return [];
  }

  const { data: subcategories, error: subError } = await supabase
    .from('subcategories')
    .select('id')
    .eq('category_id', category.id);

  if (subError || !subcategories?.length) {
    console.error('Error fetching mariage subcategories:', subError);
    return [];
  }

  const subcatIds = subcategories.map(s => s.id);

  const { data: products, error: prodError } = await supabase
    .from('products')
    .select(`
      id,
      is_best_seller,
      product_images (
        image_url
      )
    `)
    .in('subcategory_id', subcatIds)
    .eq('is_active', true);

  if (prodError || !products) {
    console.error('Error fetching mariage products:', prodError);
    return [];
  }

  return products.flatMap(p =>
    p.product_images.map(img => ({
      src: STORAGE_URL + img.image_url,
      isBestSeller: p.is_best_seller,
    }))
  );
}
