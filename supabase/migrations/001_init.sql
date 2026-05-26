-- ============================================================
--  somhiat.com — Supabase Migration 001
--  Run this in: Supabase Dashboard → SQL Editor
-- ============================================================

-- PROJECTS TABLE
create table if not exists public.projects (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  title        text not null,
  category     text not null check (category in ('obra-nueva', 'rehabilitacion', 'viviendas', 'otros')),
  year         int,
  location     text,
  client       text,
  status       text default 'completed' check (status in ('completed', 'in-progress')),
  area         text,
  description  text,
  body         text,
  cover_url    text,
  gallery      jsonb default '[]'::jsonb,
  is_featured  boolean default false,
  sort_order   int default 0,
  created_at   timestamptz default now()
);

-- CONTACT MESSAGES TABLE
create table if not exists public.contact_messages (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  subject    text,
  message    text not null,
  read       boolean default false,
  created_at timestamptz default now()
);

-- ROW LEVEL SECURITY
alter table public.projects enable row level security;
alter table public.contact_messages enable row level security;

-- Projects: anyone can read
create policy "Projects are publicly readable"
  on public.projects for select
  using (true);

-- Contact messages: anyone can insert
create policy "Anyone can submit contact messages"
  on public.contact_messages for insert
  with check (true);

-- Contact messages: only authenticated (admin) can read
create policy "Authenticated users can read messages"
  on public.contact_messages for select
  using (auth.role() = 'authenticated');

-- ============================================================
--  SEED DATA — Proyectos de ejemplo
-- ============================================================
insert into public.projects (slug, title, category, year, location, client, status, area, description, body, cover_url, gallery, is_featured, sort_order) values

('villa-marina', 'Villa Marina', 'obra-nueva', 2023, 'Barcelona, España', 'Comisión Privada', 'completed', '320 m²',
 'Residencia unifamiliar de obra nueva con fachada de hormigón visto y carpinterías de acero negras. Integración arquitectónica con el entorno mediterráneo.',
 'El proyecto Villa Marina presentó un desafío técnico singular: integrar una estructura de hormigón brutalista en una parcela con fuertes pendientes mientras se mantenían estrictos estándares de sostenibilidad. Mediante sistemas avanzados de muros de contención y distribución de cargas de precisión, logramos crear espacios cantilevered amplios que parecen flotar sobre el paisaje.',
 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop',
 '["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075", "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053", "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=2074"]'::jsonb,
 true, 1),

('casa-del-bosque', 'Casa del Bosque', 'viviendas', 2022, 'Girona, España', 'Comisión Privada', 'completed', '280 m²',
 'Vivienda unifamiliar integrada en masa forestal. Madera estructural y acero cor-ten. Diseño bioclimático con certificación energética A.',
 'Casa del Bosque surge de la voluntad de construir sin alterar. Cada árbol del entorno fue documentado y el proyecto se adaptó a su preservación. La estructura de madera laminada encolada permite grandes luces sin pilares intermedios.',
 'https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?q=80&w=2070&auto=format&fit=crop',
 '["https://images.unsplash.com/photo-1416331108676-a22ccb276e35?q=80&w=2067", "https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1780"]'::jsonb,
 true, 2),

('palacio-central', 'Palacio Central', 'rehabilitacion', 2024, 'Barcelona, España', 'Ayuntamiento', 'in-progress', '1.200 m²',
 'Rehabilitación integral de fachada de edificio histórico catalogado. Restauración de elementos ornamentales y adecuación a normativa CTE.',
 'El Palacio Central representa uno de los proyectos de rehabilitación más complejos abordados por el estudio. La catalogación del edificio imponía restricciones estrictas sobre la intervención en fachada, requiriendo un levantamiento fotogramétrico milimétrico y la reproducción artesanal de molduras.',
 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
 '["https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=2070", "https://images.unsplash.com/photo-1555636222-cae831e670b3?q=80&w=1927"]'::jsonb,
 false, 3),

('edificio-rambla', 'Edificio Rambla 42', 'obra-nueva', 2021, 'Sabadell, España', 'Promotora Rambla SL', 'completed', '2.400 m²',
 'Edificio residencial plurifamiliar de 18 viviendas. Estructura de hormigón armado, fachada ventilada de GRC y azotea ajardinada.',
 'El Edificio Rambla 42 responde a la demanda de vivienda de calidad en el centro de Sabadell. La fachada de GRC (Glass Reinforced Concrete) permite una gran versatilidad formal con el mínimo mantenimiento, mientras la azotea ajardinada mejora el aislamiento térmico y reduce el impacto de isla de calor.',
 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop',
 '["https://images.unsplash.com/photo-1464817739973-0128fe77aaa1?q=80&w=2070", "https://images.unsplash.com/photo-1503174971373-b1f69850bded?q=80&w=1913"]'::jsonb,
 false, 4);
