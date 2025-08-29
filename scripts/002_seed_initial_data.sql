-- Insert default site settings
INSERT INTO public.site_settings (key, value, description) VALUES
  ('site_name', 'PRIMA CENTER', 'Nom du site'),
  ('site_description', 'Le centre commercial de référence à Abidjan', 'Description du site'),
  ('opening_hours', 'Lundi au Dimanche de 6h00 à 23h00', 'Horaires d''ouverture'),
  ('phone_primary', '+225 XX XX XX XX', 'Téléphone principal'),
  ('phone_secondary', '+225 XX XX XX XX', 'Téléphone secondaire'),
  ('email', 'contact@primacenter.ci', 'Email de contact'),
  ('address', 'Abidjan, Côte d''Ivoire', 'Adresse'),
  ('facebook_url', 'https://facebook.com/primacenter', 'URL Facebook'),
  ('instagram_url', 'https://instagram.com/primacenter', 'URL Instagram'),
  ('twitter_url', 'https://twitter.com/primacenter', 'URL Twitter'),
  ('linkedin_url', 'https://linkedin.com/company/primacenter', 'URL LinkedIn')
ON CONFLICT (key) DO NOTHING;

-- Insert sample boutiques
INSERT INTO public.boutiques (name, description, category, floor, phone, opening_hours) VALUES
  ('Zara', 'Mode et vêtements tendance pour homme et femme', 'Mode', 'Rez-de-chaussée', '+225 XX XX XX XX', '9h00 - 22h00'),
  ('H&M', 'Mode accessible et moderne', 'Mode', 'Rez-de-chaussée', '+225 XX XX XX XX', '9h00 - 22h00'),
  ('Nike', 'Articles de sport et streetwear', 'Sport', '1er étage', '+225 XX XX XX XX', '9h00 - 22h00'),
  ('Apple Store', 'Produits et accessoires Apple', 'Technologie', '1er étage', '+225 XX XX XX XX', '10h00 - 21h00'),
  ('Sephora', 'Cosmétiques et parfums', 'Beauté', 'Rez-de-chaussée', '+225 XX XX XX XX', '9h00 - 22h00'),
  ('Fnac', 'Livres, musique, high-tech', 'Culture', '2ème étage', '+225 XX XX XX XX', '10h00 - 21h00')
ON CONFLICT DO NOTHING;

-- Insert sample restaurants
INSERT INTO public.restaurants (name, description, cuisine_type, floor, phone, opening_hours, price_range) VALUES
  ('McDonald''s', 'Fast-food américain', 'Fast-food', 'Food Court', '+225 XX XX XX XX', '7h00 - 23h00', '€'),
  ('KFC', 'Poulet frit à l''américaine', 'Fast-food', 'Food Court', '+225 XX XX XX XX', '10h00 - 23h00', '€'),
  ('Subway', 'Sandwichs frais et salades', 'Fast-food', 'Food Court', '+225 XX XX XX XX', '8h00 - 22h00', '€'),
  ('Pizza Hut', 'Pizzas et cuisine italienne', 'Italien', 'Food Court', '+225 XX XX XX XX', '11h00 - 23h00', '€€'),
  ('Starbucks', 'Café et boissons chaudes', 'Café', 'Rez-de-chaussée', '+225 XX XX XX XX', '6h00 - 22h00', '€€'),
  ('Le Gourmet', 'Cuisine française raffinée', 'Français', '3ème étage', '+225 XX XX XX XX', '12h00 - 22h00', '€€€')
ON CONFLICT DO NOTHING;

-- Insert sample fitness services
INSERT INTO public.fitness_services (name, description, price, duration, category) VALUES
  ('Abonnement Mensuel', 'Accès illimité à tous les équipements', '25 000 FCFA', '1 mois', 'Abonnement'),
  ('Abonnement Annuel', 'Accès illimité avec réductions', '250 000 FCFA', '12 mois', 'Abonnement'),
  ('Cours de Yoga', 'Séances de yoga en groupe', '5 000 FCFA', '1h', 'Cours'),
  ('Personal Training', 'Coaching personnel', '15 000 FCFA', '1h', 'Coaching'),
  ('Cours de Zumba', 'Danse fitness énergique', '3 000 FCFA', '45min', 'Cours'),
  ('Cours de Pilates', 'Renforcement musculaire', '5 000 FCFA', '1h', 'Cours')
ON CONFLICT DO NOTHING;

-- Insert sample news
INSERT INTO public.news (title, content, excerpt, category, published) VALUES
  ('Ouverture de nouvelles boutiques', 'Nous sommes ravis d''annoncer l''ouverture de 5 nouvelles boutiques ce mois-ci...', 'Découvrez les nouvelles enseignes qui rejoignent Prima Center', 'Nouveautés', true),
  ('Festival Gastronomique', 'Du 15 au 30 de ce mois, découvrez notre festival gastronomique...', 'Un événement culinaire exceptionnel vous attend', 'Événements', true),
  ('Rénovation du parking', 'Travaux de rénovation du parking niveau -1 prévus...', 'Amélioration de nos infrastructures', 'Travaux', true),
  ('Nouvelle salle de fitness', 'My Fitness s''agrandit avec une nouvelle salle dédiée...', 'Plus d''espace pour vos activités sportives', 'Sport', true)
ON CONFLICT DO NOTHING;
