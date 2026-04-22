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

    // Shuffle pour afficher des images différentes à chaque visite
    const shuffled = [...allImages];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const image1 = shuffled.length > 0 ? STORAGE_URL + shuffled[0] : '/images/logos/logoimageonly.png';
    const image2 = shuffled.length > 1 ? STORAGE_URL + shuffled[1] : image1;

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

export async function getEnfantPairs() {
  const { data: category, error: catError } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', 'enfant')
    .single();

  if (catError || !category) {
    console.error('Error fetching enfant category:', catError);
    return [];
  }

  const { data: subcategories, error: subError } = await supabase
    .from('subcategories')
    .select('id')
    .eq('category_id', category.id);

  if (subError || !subcategories?.length) {
    console.error('Error fetching enfant subcategories:', subError);
    return [];
  }

  const subcatIds = subcategories.map(s => s.id);

  const { data: products, error: prodError } = await supabase
    .from('products')
    .select('id, product_images(image_url)')
    .in('subcategory_id', subcatIds)
    .eq('is_active', true);

  if (prodError || !products) {
    console.error('Error fetching enfant products:', prodError);
    return [];
  }

  const allUrls = products.flatMap(p => p.product_images.map(img => img.image_url));

  // Grouper par base de nom : "enfant/tenues/robe-xxx-01.webp" → base "robe-xxx"
  const groups = {};
  for (const url of allUrls) {
    const filename = url.split('/').pop().replace('.webp', '');
    const base = filename.replace(/-0\d$/, '');
    if (!groups[base]) groups[base] = [];
    groups[base].push(STORAGE_URL + url);
  }

  // Retourner uniquement les paires (modèles avec 2 angles)
  return Object.values(groups)
    .filter(imgs => imgs.length >= 1)
    .map(imgs => ({ front: imgs[0], back: imgs[1] || imgs[0] }));
}

export async function getCollectionSubcategories(categorySlug) {
  const { data: category, error: catError } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', categorySlug)
    .single();

  if (catError || !category) return [];

  const { data: subcategories, error } = await supabase
    .from('subcategories')
    .select('id, name, slug, products(id)')
    .eq('category_id', category.id)
    .order('display_order');

  if (error || !subcategories) return [];

  return subcategories
    .map(sub => ({ name: sub.name, slug: sub.slug, count: sub.products?.length || 0 }))
    .filter(s => s.count > 0);
}

export async function getSubcategoryProducts(subcategorySlug, page = 1, limit = 18) {
  const { data: subcategory, error: subError } = await supabase
    .from('subcategories')
    .select('id')
    .eq('slug', subcategorySlug)
    .single();

  if (subError || !subcategory) return { products: [], total: 0 };

  const { count } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .eq('subcategory_id', subcategory.id);

  const from = (page - 1) * limit;
  const to = page * limit - 1;

  const { data: products, error: prodError } = await supabase
    .from('products')
    .select('id, product_images(image_url)')
    .eq('subcategory_id', subcategory.id)
    .range(from, to);

  if (prodError || !products) return { products: [], total: count || 0 };

  const result = products
    .filter(p => p.product_images?.length > 0)
    .map(p => ({
      id: p.id,
      src: STORAGE_URL + p.product_images[0].image_url,
    }));

  return { products: result, total: count || 0 };
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
