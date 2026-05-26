-- ============================================================
--  SOMHi — Migration 003
--  Ejecutar en: Supabase Dashboard → SQL Editor
--  Corrige el schema para coincidir con el tipo Project de TS
--  y hace seed de los 18 proyectos reales.
-- ============================================================

-- 1. Arreglar constraint de category (guión → guión bajo)
ALTER TABLE public.projects
  DROP CONSTRAINT IF EXISTS projects_category_check;

ALTER TABLE public.projects
  ADD CONSTRAINT projects_category_check
  CHECK (category IN ('obra_nueva', 'rehabilitacion', 'viviendas'));

-- 2. Arreglar constraint de status
ALTER TABLE public.projects
  DROP CONSTRAINT IF EXISTS projects_status_check;

ALTER TABLE public.projects
  ADD CONSTRAINT projects_status_check
  CHECK (status IN ('completed', 'in_progress'));

-- 3. Renombrar is_featured → featured (si existe)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='is_featured') THEN
    ALTER TABLE public.projects RENAME COLUMN is_featured TO featured;
  END IF;
END $$;

-- 4. Añadir columna area (si no existe)
ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS area text;

-- 5. Políticas RLS para escritura admin
DROP POLICY IF EXISTS "Admin can insert projects" ON public.projects;
DROP POLICY IF EXISTS "Admin can update projects" ON public.projects;
DROP POLICY IF EXISTS "Admin can delete projects" ON public.projects;

CREATE POLICY "Admin can insert projects"
  ON public.projects FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin can update projects"
  ON public.projects FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can delete projects"
  ON public.projects FOR DELETE
  USING (auth.role() = 'authenticated');

-- 6. Crear bucket de Storage project-images (si no existe)
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS: lectura pública
DROP POLICY IF EXISTS "Public read project-images" ON storage.objects;
CREATE POLICY "Public read project-images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'project-images');

-- Storage RLS: escritura solo admin
DROP POLICY IF EXISTS "Admin upload project-images" ON storage.objects;
CREATE POLICY "Admin upload project-images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'project-images' AND auth.role() = 'authenticated');

-- ============================================================
-- 7. Limpiar seed antiguo (datos de prueba con Unsplash)
-- ============================================================
DELETE FROM public.projects
WHERE slug IN ('villa-marina','casa-del-bosque','palacio-central','edificio-rambla');

-- ============================================================
-- 8. Seed de los 18 proyectos reales de SOMHi
-- ============================================================
INSERT INTO public.projects
  (slug, title, category, year, location, client, status, area, description, body, cover_url, gallery, featured, sort_order)
VALUES

-- OBRA NUEVA
('cardedeu', 'Cardedeu', 'obra_nueva', NULL, 'Calaceite', 'Particular', 'in_progress', NULL,
 'Obra nueva de vivienda unifamiliar pasiva y eficiente energéticamente. Projecte Ana Vulart Arquitectes · Constructor Papik.',
 'En este proyecto realizamos los trabajos de dirección de ejecución de obra, coordinación de seguridad y salud y control de calidad en construcción de casa pasiva eficientemente energética.',
 '/projects/cardedeu/cardedeu-1.webp',
 (SELECT jsonb_agg(v) FROM (SELECT '/projects/cardedeu/cardedeu-' || n || '.webp' AS v FROM generate_series(1,21) n) t),
 true, 1),

('corbera', 'Corbera', 'obra_nueva', 2024, 'Corbera de Llobregat', 'Particular', 'completed', NULL,
 'Obra nueva de vivienda unifamiliar pasiva y eficiente energéticamente. Projecte Ana Vulart Arquitectes · Constructor Papik.',
 'En este proyecto realizamos los trabajos de dirección de ejecución de obra, coordinación de seguridad y salud y control de calidad en construcción de casa pasiva eficientemente energética.',
 '/projects/corbera/corbera-1.webp',
 (SELECT jsonb_agg(v) FROM (SELECT '/projects/corbera/corbera-' || n || '.webp' AS v FROM generate_series(1,106) n) t),
 true, 2),

-- REHABILITACIÓN
('provenca', 'Provença 292', 'rehabilitacion', 2023, 'Carrer Provença 292, Barcelona', 'Comunidad de Propietarios', 'completed', NULL,
 'Rehabilitación de fachada y balcones con permiso comunicado diferido y afectación patrimonial en Barcelona.',
 'Edificio con medidas cautelares por desprendimientos de revestimiento a la vía pública. Se redacta proyecto de rehabilitación de fachada y balcones obteniendo permisos de rehabilitación tipo comunicado diferido con afectación patrimonial. Se realiza Dirección de ejecución de obras, coordinación de seguridad y salud, así como control de calidad de todos los trabajos.',
 '/projects/provenca/provenca-1.webp',
 (SELECT jsonb_agg(v) FROM (SELECT '/projects/provenca/provenca-' || n || '.webp' AS v FROM generate_series(1,13) n) t),
 true, 3),

('pablo-iglesias', 'Pablo Iglesias 55-63', 'rehabilitacion', NULL, 'Carrer Pablo Iglesias 55-63, Barcelona', 'Comunidad Subvencionada Next Generation', 'in_progress', NULL,
 'Rehabilitación de edificio con medidas cautelares. Mejoras energéticas subvencionadas con ayudas NEXT GENERATION EU.',
 'Edificio con medidas cautelares por degradación de balcones y desprendimientos a la vía pública. Se realiza Dirección de ejecución de obras, coordinación de seguridad y salud, así como control de calidad de todos los trabajos para mejoras energéticas subvencionadas con ayudas NEXT GENERATION.',
 '/projects/pablo-iglesias/pablo-iglesias-1.webp',
 (SELECT jsonb_agg(v) FROM (SELECT '/projects/pablo-iglesias/pablo-iglesias-' || n || '.webp' AS v FROM generate_series(1,39) n) t),
 true, 4),

('can-baro', 'Can Baró', 'rehabilitacion', 2024, 'Avinguda Can Baró 24, Barcelona 08024', 'Comunidad de Propietarios', 'completed', NULL,
 'Rehabilitación de fachada y balcones. Permiso comunicado inmediato en Barcelona.',
 'Edificio con medidas cautelares por degradación de balcones y desprendimientos a la vía pública. Se redacta proyecto de rehabilitación de fachada y balcones obteniendo permisos de rehabilitación tipo comunicado inmediato. Se realiza Dirección de ejecución de obras, coordinación de seguridad y salud, así como control de calidad de todos los trabajos.',
 '/projects/can-baro/can-baro-1.webp',
 (SELECT jsonb_agg(v) FROM (SELECT '/projects/can-baro/can-baro-' || n || '.webp' AS v FROM generate_series(1,30) n) t),
 false, 5),

('quinti', 'Sant Quintí 122', 'rehabilitacion', 2024, 'Carrer Sant Quintí 122, Barcelona 08041', 'Comunidad de Propietarios', 'completed', NULL,
 'Rehabilitación de fachada y balcones con permiso comunicado diferido y afectación patrimonial en Barcelona.',
 'Edificio con medidas cautelares por desprendimientos de revestimiento a la vía pública. Se redacta proyecto de rehabilitación de fachada y balcones obteniendo permisos de rehabilitación tipo comunicado diferido con afectación patrimonial. Se realiza Dirección de ejecución de obras, coordinación de seguridad y salud, así como control de calidad de todos los trabajos.',
 '/projects/quinti/quinti-1.webp',
 (SELECT jsonb_agg(v) FROM (SELECT '/projects/quinti/quinti-' || n || '.webp' AS v FROM generate_series(1,27) n) t),
 false, 6),

('tamarit', 'Tamarit 161', 'rehabilitacion', 2019, 'Carrer Tamarit 161, 08015 Barcelona', 'Comunidad de Propietarios', 'completed', NULL,
 'Rehabilitación de fachada y balcones con permiso comunicado diferido y afectación patrimonial en Barcelona.',
 'Edificio con medidas cautelares por desprendimientos de revestimiento a la vía pública. Se redacta proyecto de rehabilitación de fachada y balcones obteniendo permisos de rehabilitación tipo comunicado diferido con afectación patrimonial. Se realiza Dirección de ejecución de obras, coordinación de seguridad y salud, así como control de calidad de todos los trabajos.',
 '/projects/tamarit/tamarit-1.webp',
 (SELECT jsonb_agg(v) FROM (SELECT '/projects/tamarit/tamarit-' || n || '.webp' AS v FROM generate_series(1,40) n) t),
 false, 7),

-- VIVIENDAS
('berlin', 'Berlín', 'viviendas', 2024, 'Barcelona', 'Particular', 'completed', NULL,
 'Reforma integral de vivienda unifamiliar sin afectación estructural. Permiso de obra para despacho de interiorismo BRAKARA.',
 'Reforma integral de vivienda unifamiliar sin afectación estructural. Redactando permiso de obra para despacho de interiorismo BRAKARA y dirección de obra en todo el proceso constructivo.',
 '/projects/berlin/berlin-1.webp',
 (SELECT jsonb_agg(v) FROM (SELECT '/projects/berlin/berlin-' || n || '.webp' AS v FROM generate_series(1,19) n) t),
 true, 8),

('aribau', 'Aribau', 'viviendas', 2019, 'Barcelona', 'Particular', 'completed', NULL,
 'Reforma integral de vivienda unifamiliar sin afectación estructural. Proyecto y dirección de obra completa.',
 'Reforma integral de vivienda unifamiliar sin afectación estructural. Redactando proyecto y dirección de obra en todo el proceso constructivo.',
 '/projects/aribau/aribau-1.webp',
 (SELECT jsonb_agg(v) FROM (SELECT '/projects/aribau/aribau-' || n || '.webp' AS v FROM generate_series(1,46) n) t),
 false, 9),

('armon-jadraque', 'Jadraque', 'viviendas', 2024, 'Barcelona', 'Particular', 'completed', NULL,
 'Reforma integral de vivienda unifamiliar sin afectación estructural. Proyecto y dirección de obra completa.',
 'Reforma integral de vivienda unifamiliar sin afectación estructural. Redactando proyecto y dirección de obra en todo el proceso constructivo.',
 '/projects/armon-jadraque/jadraque-1.webp',
 (SELECT jsonb_agg(v) FROM (SELECT '/projects/armon-jadraque/jadraque-' || n || '.webp' AS v FROM generate_series(1,10) n) t),
 false, 10),

('armon-mora', 'Mora la Nova', 'viviendas', 2025, 'Mora la Nova', 'Particular', 'completed', NULL,
 'Reforma integral de vivienda unifamiliar sin afectación estructural. Proyecto y dirección de obra completa.',
 'Reforma integral de vivienda unifamiliar sin afectación estructural. Redactando proyecto y dirección de obra en todo el proceso constructivo.',
 '/projects/armon-mora/mora-1.webp',
 (SELECT jsonb_agg(v) FROM (SELECT '/projects/armon-mora/mora-' || n || '.webp' AS v FROM generate_series(1,9) n) t),
 false, 11),

('badalona', 'Carretera Major, Badalona', 'viviendas', 2024, 'Badalona', 'Particular', 'completed', NULL,
 'Reforma integral de vivienda unifamiliar sin afectación estructural. Proyecto y dirección de obra completa.',
 'Reforma integral de vivienda unifamiliar sin afectación estructural. Redactando proyecto y dirección de obra en todo el proceso constructivo.',
 '/projects/badalona/badalona-1.webp',
 (SELECT jsonb_agg(v) FROM (SELECT '/projects/badalona/badalona-' || n || '.webp' AS v FROM generate_series(1,10) n) t),
 false, 12),

('concordia', 'Concordia', 'viviendas', 2024, 'Barcelona', 'Particular', 'completed', NULL,
 'Reforma integral de vivienda unifamiliar sin afectación estructural. Permiso de obra para despacho de interiorismo BRAKARA.',
 'Reforma integral de vivienda unifamiliar sin afectación estructural. Redactando permiso de obra para despacho de interiorismo BRAKARA y dirección de obra en todo el proceso constructivo.',
 '/projects/concordia/concordia-1.webp',
 (SELECT jsonb_agg(v) FROM (SELECT '/projects/concordia/concordia-' || n || '.webp' AS v FROM generate_series(1,15) n) t),
 false, 13),

('lepanto', 'Lepanto', 'viviendas', 2024, 'Barcelona', 'Particular', 'completed', NULL,
 'Reforma integral de vivienda unifamiliar sin afectación estructural. Proyecto y dirección de obra completa.',
 'Reforma integral de vivienda unifamiliar sin afectación estructural. Redactando proyecto y dirección de obra en todo el proceso constructivo.',
 '/projects/lepanto/lepanto-1.webp',
 (SELECT jsonb_agg(v) FROM (SELECT '/projects/lepanto/lepanto-' || n || '.webp' AS v FROM generate_series(1,10) n) t),
 false, 14),

('muntaner', 'Muntaner', 'viviendas', 2023, 'Barcelona', 'Particular', 'completed', NULL,
 'Reforma integral de vivienda unifamiliar sin afectación estructural. Permiso de obra para despacho de interiorismo BRAKARA.',
 'Reforma integral de vivienda unifamiliar sin afectación estructural. Redactando permiso de obra para despacho de interiorismo BRAKARA y dirección de obra en todo el proceso constructivo.',
 '/projects/muntaner/muntaner-1.webp',
 (SELECT jsonb_agg(v) FROM (SELECT '/projects/muntaner/muntaner-' || n || '.webp' AS v FROM generate_series(1,16) n) t),
 false, 15),

('puigmarti', 'Puigmartí', 'viviendas', 2024, 'Barcelona', 'Particular', 'completed', NULL,
 'Reforma integral de vivienda unifamiliar sin afectación estructural. Proyecto y dirección de obra completa.',
 'Reforma integral de vivienda unifamiliar sin afectación estructural. Redactando proyecto y dirección de obra en todo el proceso constructivo.',
 '/projects/puigmarti/puigmarti-1.webp',
 (SELECT jsonb_agg(v) FROM (SELECT '/projects/puigmarti/puigmarti-' || n || '.webp' AS v FROM generate_series(1,35) n) t),
 false, 16),

('vilamari', 'Vilamarí', 'viviendas', 2024, 'Barcelona', 'Particular', 'completed', NULL,
 'Reforma integral de vivienda unifamiliar sin afectación estructural. Permiso de obra para despacho de interiorismo BRAKARA.',
 'Reforma integral de vivienda unifamiliar sin afectación estructural. Redactando permiso de obra para despacho de interiorismo BRAKARA y dirección de obra en todo el proceso constructivo.',
 '/projects/vilamari/vilamari-1.webp',
 (SELECT jsonb_agg(v) FROM (SELECT '/projects/vilamari/vilamari-' || n || '.webp' AS v FROM generate_series(1,20) n) t),
 false, 17),

('segre', 'Segre 79', 'viviendas', 2022, 'Carrer Segre 79, Barcelona', 'Particular', 'completed', NULL,
 'Reforma integral de vivienda unifamiliar sin afectación estructural. Proyecto y dirección de obra completa.',
 'Reforma integral de vivienda unifamiliar sin afectación estructural. Redactando proyecto y dirección de obra en todo el proceso constructivo.',
 '/projects/segre/segre-1.webp',
 (SELECT jsonb_agg(v) FROM (SELECT '/projects/segre/segre-' || n || '.webp' AS v FROM generate_series(1,32) n) t),
 false, 18)

ON CONFLICT (slug) DO UPDATE SET
  title       = EXCLUDED.title,
  category    = EXCLUDED.category,
  year        = EXCLUDED.year,
  location    = EXCLUDED.location,
  client      = EXCLUDED.client,
  status      = EXCLUDED.status,
  description = EXCLUDED.description,
  body        = EXCLUDED.body,
  cover_url   = EXCLUDED.cover_url,
  gallery     = EXCLUDED.gallery,
  featured    = EXCLUDED.featured,
  sort_order  = EXCLUDED.sort_order;
