-- ═══════════════════════════════════════════════════════════════════
-- SOMHi — Seed de proyectos reales
-- SQL Editor de Supabase → pegar y ejecutar
-- ═══════════════════════════════════════════════════════════════════

INSERT INTO projects (slug, title, category, description, body, location, year, status, client, cover_url, gallery, featured, sort_order)
VALUES

-- ── OBRA NUEVA ────────────────────────────────────────────────────
(
  'cardedeu',
  'Cardedeu',
  'obra_nueva',
  'Obra nueva de vivienda unifamiliar pasiva y eficiente energéticamente. Projecte Ana Vulart Arquitectes · Constructor Papik.',
  'En este proyecto realizamos los trabajos de dirección de ejecución de obra, coordinación de seguridad y salud y control de calidad en construcción de casa pasiva eficientemente energética.',
  'Calaceite',
  NULL,
  'in_progress',
  'Particular',
  '/projects/cardedeu/cardedeu-obra-nueva-somhiat (5).webp',
  '["/projects/cardedeu/cardedeu-obra-nueva-somhiat (1).webp","/projects/cardedeu/cardedeu-obra-nueva-somhiat (2).webp","/projects/cardedeu/cardedeu-obra-nueva-somhiat (4).webp","/projects/cardedeu/cardedeu-obra-nueva-somhiat (6).webp","/projects/cardedeu/cardedeu-obra-nueva-somhiat (7).webp","/projects/cardedeu/cardedeu-obra-nueva-somhiat (8).webp","/projects/cardedeu/cardedeu-obra-nueva-somhiat (9).webp","/projects/cardedeu/cardedeu-obra-nueva-somhiat (11).webp","/projects/cardedeu/cardedeu-obra-nueva-somhiat (12).webp"]',
  true,
  1
),
(
  'corbera',
  'Corbera',
  'obra_nueva',
  'Obra nueva de vivienda unifamiliar pasiva y eficiente energéticamente. Projecte Ana Vulart Arquitectes · Constructor Papik.',
  'En este proyecto realizamos los trabajos de dirección de ejecución de obra, coordinación de seguridad y salud y control de calidad en construcción de casa pasiva eficientemente energética.',
  'Corbera de Llobregat',
  2024,
  'completed',
  'Particular',
  '/projects/corbera/Corbera-obra-nueva-somhi (2).webp',
  '["/projects/corbera/Corbera-obra-nueva-somhi (3).webp","/projects/corbera/Corbera-obra-nueva-somhi (4).webp","/projects/corbera/Corbera-obra-nueva-somhi (5).webp","/projects/corbera/Corbera-obra-nueva-somhi (11).webp","/projects/corbera/Corbera-obra-nueva-somhi (12).webp","/projects/corbera/Corbera-obra-nueva-somhi (15).webp","/projects/corbera/Corbera-obra-nueva-somhi (20).webp","/projects/corbera/Corbera-obra-nueva-somhi (22).webp"]',
  true,
  2
),

-- ── REHABILITACIÓN ────────────────────────────────────────────────
(
  'provenca',
  'Provença 292',
  'rehabilitacion',
  'Rehabilitación de fachada y balcones con permiso comunicado diferido y afectación patrimonial en Barcelona.',
  'Edificio con medidas cautelares por desprendimientos de revestimiento a la vía pública. Se redacta proyecto de rehabilitación de fachada y balcones obteniendo permisos de rehabilitación tipo comunicado diferido con afectación patrimonial en la ciudad de Barcelona. Se realiza Dirección de ejecución de obras, coordinación de seguridad y salud, así como control de calidad de todos los trabajos.',
  'Carrer Provença 292, Barcelona',
  2023,
  'completed',
  'Comunidad de Propietarios',
  '/provenza-hero.jpg',
  '["/provenza-2.jpg"]',
  true,
  3
),
(
  'pablo-iglesias',
  'Pablo Iglesias 55-63',
  'rehabilitacion',
  'Rehabilitación de edificio con medidas cautelares. Mejoras energéticas subvencionadas con ayudas NEXT GENERATION EU.',
  'Edificio con medidas cautelares por degradación de balcones y desprendimientos a la vía pública. Se realiza Dirección de ejecución de obras, coordinación de seguridad y salud, así como control de calidad de todos los trabajos para mejoras energéticas subvencionadas con ayudas NEXT GENERATION.',
  'Carrer Pablo Iglesias 55-63, Barcelona',
  NULL,
  'in_progress',
  'Comunidad Subvencionada Next Generation',
  '/projects/pablo-iglesias/Edificio-pablo-iglesias-rehabilitacion-edificios-somhiat (1).webp',
  '["/projects/pablo-iglesias/Edificio-pablo-iglesias-rehabilitacion-edificios-somhiat (2).webp","/projects/pablo-iglesias/Edificio-pablo-iglesias-rehabilitacion-edificios-somhiat (3).webp","/projects/pablo-iglesias/Edificio-pablo-iglesias-rehabilitacion-edificios-somhiat (4).webp","/projects/pablo-iglesias/Edificio-pablo-iglesias-rehabilitacion-edificios-somhiat (5).webp","/projects/pablo-iglesias/Edificio-pablo-iglesias-rehabilitacion-edificios-somhiat (12).webp","/projects/pablo-iglesias/Edificio-pablo-iglesias-rehabilitacion-edificios-somhiat (14).webp"]',
  false,
  4
),
(
  'can-baro',
  'Can Baró',
  'rehabilitacion',
  'Rehabilitación de fachada y balcones. Permiso comunicado inmediato en Barcelona. Dirección y coordinación completa.',
  'Edificio con medidas cautelares por degradación de balcones y desprendimientos a la vía pública. Se redacta proyecto de rehabilitación de fachada y balcones obteniendo permisos de rehabilitación tipo comunicado inmediato en la ciudad de Barcelona. Se realiza Dirección de ejecución de obras, coordinación de seguridad y salud, así como control de calidad de todos los trabajos.',
  'Avinguda Can Baró 24, Barcelona 08024',
  2024,
  'completed',
  'Comunidad de Propietarios',
  '/projects/pablo-iglesias/Edificio-pablo-iglesias-rehabilitacion-edificios-somhiat (2).webp',
  '[]',
  false,
  5
),
(
  'quinti',
  'Sant Quintí 122',
  'rehabilitacion',
  'Rehabilitación de fachada y balcones con permiso comunicado diferido y afectación patrimonial en Barcelona.',
  'Edificio con medidas cautelares por desprendimientos de revestimiento a la vía pública. Se redacta proyecto de rehabilitación de fachada y balcones obteniendo permisos de rehabilitación tipo comunicado diferido con afectación patrimonial en la ciudad de Barcelona. Se realiza Dirección de ejecución de obras, coordinación de seguridad y salud, así como control de calidad de todos los trabajos.',
  'Carrer Sant Quintí 122, Barcelona 08041',
  2024,
  'completed',
  'Comunidad de Propietarios',
  '/projects/pablo-iglesias/Edificio-pablo-iglesias-rehabilitacion-edificios-somhiat (16).webp',
  '[]',
  false,
  6
),
(
  'tamarit',
  'Tamarit 161',
  'rehabilitacion',
  'Rehabilitación de fachada y balcones con permiso comunicado diferido y afectación patrimonial en Barcelona.',
  'Edificio con medidas cautelares por desprendimientos de revestimiento a la vía pública. Se redacta proyecto de rehabilitación de fachada y balcones obteniendo permisos de rehabilitación tipo comunicado diferido con afectación patrimonial en la ciudad de Barcelona. Se realiza Dirección de ejecución de obras, coordinación de seguridad y salud, así como control de calidad de todos los trabajos.',
  'Carrer Tamarit 161, 08015 Barcelona',
  2019,
  'completed',
  'Comunidad de Propietarios',
  '/projects/pablo-iglesias/Edificio-pablo-iglesias-rehabilitacion-edificios-somhiat (28).webp',
  '[]',
  false,
  7
),

-- ── VIVIENDAS ─────────────────────────────────────────────────────
(
  'berlin',
  'Berlín',
  'viviendas',
  'Reforma integral de vivienda unifamiliar sin afectación estructural. Permiso de obra para despacho de interiorismo BRAKARA.',
  'Reforma integral de vivienda unifamiliar sin afectación estructural. Redactando permiso de obra para despacho de interiorismo BRAKARA y dirección de obra en todo el proceso constructivo.',
  'Barcelona',
  2024,
  'completed',
  'Particular',
  '/projects/berlin/reforma-vivienda-berlin-somhiat (20).webp',
  '["/projects/berlin/reforma-vivienda-berlin-somhiat (1).webp","/projects/berlin/reforma-vivienda-berlin-somhiat (2).webp","/projects/berlin/reforma-vivienda-berlin-somhiat (3).webp","/projects/berlin/reforma-vivienda-berlin-somhiat (4).webp","/projects/berlin/reforma-vivienda-berlin-somhiat (5).webp","/projects/berlin/reforma-vivienda-berlin-somhiat (6).webp","/projects/berlin/reforma-vivienda-berlin-somhiat (7).webp","/projects/berlin/reforma-vivienda-berlin-somhiat (8).webp","/projects/berlin/reforma-vivienda-berlin-somhiat (12).webp"]',
  true,
  8
)

ON CONFLICT (slug) DO UPDATE SET
  title       = EXCLUDED.title,
  description = EXCLUDED.description,
  body        = EXCLUDED.body,
  cover_url   = EXCLUDED.cover_url,
  gallery     = EXCLUDED.gallery,
  featured    = EXCLUDED.featured,
  sort_order  = EXCLUDED.sort_order;
