-- ============================================================
-- Migration 001: Création des tables catégories & sous-catégories
-- PriStyle / Sublime Wax
-- ============================================================

-- Table des catégories principales (Femme, Homme, Enfant, Mariage)
CREATE TABLE IF NOT EXISTS categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    cover_image_url TEXT,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Table des sous-catégories
CREATE TABLE IF NOT EXISTS subcategories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL,
    description TEXT,
    cover_image_url TEXT,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(category_id, slug)
);

-- Table des produits / modèles (chaque création de la couturière)
CREATE TABLE IF NOT EXISTS products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    subcategory_id UUID NOT NULL REFERENCES subcategories(id) ON DELETE CASCADE,
    name VARCHAR(255),
    slug VARCHAR(255),
    description TEXT,
    is_best_seller BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Table des images de produits (plusieurs images par produit)
CREATE TABLE IF NOT EXISTS product_images (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text VARCHAR(255),
    display_order INT DEFAULT 0,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Table du contenu du site (sections modifiables)
CREATE TABLE IF NOT EXISTS site_content (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    section_key VARCHAR(100) NOT NULL UNIQUE,
    title TEXT,
    subtitle TEXT,
    body TEXT,
    image_url TEXT,
    secondary_image_url TEXT,
    cta_text VARCHAR(255),
    cta_link VARCHAR(500),
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Index pour les performances
CREATE INDEX idx_subcategories_category ON subcategories(category_id);
CREATE INDEX idx_products_subcategory ON products(subcategory_id);
CREATE INDEX idx_product_images_product ON product_images(product_id);
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_subcategories_slug ON subcategories(slug);

-- ============================================================
-- Données initiales : Catégories
-- ============================================================
INSERT INTO categories (name, slug, description, display_order) VALUES
('Femme', 'femme', 'Collection exclusive de tenues wax pour femme', 1),
('Homme', 'homme', 'Collection raffinée de tenues wax pour homme', 2),
('Enfant', 'enfant', 'Adorables tenues wax pour les plus petits', 3),
('Tenue Mariage', 'tenue-mariage', 'Sublimes tenues de couple pour mariages', 4);

-- ============================================================
-- Données initiales : Sous-catégories Femme
-- ============================================================
INSERT INTO subcategories (category_id, name, slug, description, display_order)
SELECT id, 'Boubou Femme', 'boubou-femme', 'Boubous wax élégants pour femme', 1
FROM categories WHERE slug = 'femme';

INSERT INTO subcategories (category_id, name, slug, description, display_order)
SELECT id, 'Robes', 'robes', 'Robes wax modernes et traditionnelles', 2
FROM categories WHERE slug = 'femme';

INSERT INTO subcategories (category_id, name, slug, description, display_order)
SELECT id, 'Robes Africaines', 'robes-africaines', 'Robes africaines haute couture', 3
FROM categories WHERE slug = 'femme';

INSERT INTO subcategories (category_id, name, slug, description, display_order)
SELECT id, 'Jupes', 'jupes', 'Jupes wax élégantes', 4
FROM categories WHERE slug = 'femme';

INSERT INTO subcategories (category_id, name, slug, description, display_order)
SELECT id, 'Hauts', 'hauts', 'Hauts et tops en wax', 5
FROM categories WHERE slug = 'femme';

INSERT INTO subcategories (category_id, name, slug, description, display_order)
SELECT id, 'Vestes & Bombers', 'vestes-bombers', 'Vestes et bombers en wax', 6
FROM categories WHERE slug = 'femme';

INSERT INTO subcategories (category_id, name, slug, description, display_order)
SELECT id, 'Pantalons', 'pantalons', 'Pantalons wax tendance', 7
FROM categories WHERE slug = 'femme';

-- ============================================================
-- Données initiales : Sous-catégories Homme
-- ============================================================
INSERT INTO subcategories (category_id, name, slug, description, display_order)
SELECT id, 'Boubou Homme', 'boubou-homme', 'Boubous wax majestueux pour homme', 1
FROM categories WHERE slug = 'homme';

INSERT INTO subcategories (category_id, name, slug, description, display_order)
SELECT id, 'Ensemble Homme', 'ensemble-homme', 'Ensembles wax complets pour homme', 2
FROM categories WHERE slug = 'homme';

INSERT INTO subcategories (category_id, name, slug, description, display_order)
SELECT id, 'Chemises', 'chemises', 'Chemises wax pour homme', 3
FROM categories WHERE slug = 'homme';

-- ============================================================
-- Données initiales : Sous-catégories Enfant
-- ============================================================
INSERT INTO subcategories (category_id, name, slug, description, display_order)
SELECT id, 'Tenues Enfant', 'tenues', 'Tenues wax adorables pour enfants', 1
FROM categories WHERE slug = 'enfant';

-- ============================================================
-- Données initiales : Sous-catégories Mariage
-- ============================================================
INSERT INTO subcategories (category_id, name, slug, description, display_order)
SELECT id, 'Tenues Couple', 'tenues-couple', 'Tenues de couple assorties pour mariage', 1
FROM categories WHERE slug = 'tenue-mariage';

-- ============================================================
-- Données initiales : Contenu du site
-- ============================================================
INSERT INTO site_content (section_key, title, subtitle, body, cta_text, cta_link, display_order) VALUES
('hero', 'Sublime Wax', 'Haute Couture Africaine', 'Des créations uniques en tissu wax, confectionnées avec passion et savoir-faire artisanal.', 'Découvrir nos créations', '#collections', 1),
('about', 'Notre Histoire', 'L''Art du Wax depuis plus de 10 ans', 'Chaque pièce est une œuvre d''art, confectionnée à la main avec les plus beaux tissus wax d''Afrique. Notre atelier allie tradition et modernité pour créer des vêtements qui racontent une histoire.', 'En savoir plus', '/a-propos', 2),
('contact', 'Contactez-nous', 'Un modèle vous plaît ? Parlons-en !', 'Commandez votre tenue sur mesure directement via WhatsApp. Nous vous accompagnons du choix du tissu à la livraison.', 'Commander sur WhatsApp', 'https://wa.me/33XXXXXXXXXX', 3);
