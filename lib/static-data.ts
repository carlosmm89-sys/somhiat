import type { Project } from "@/types";

/**
 * Datos estáticos de proyectos reales de SOMHi.
 * 18 proyectos · 3 categorías · 518 imágenes
 * Imágenes en /public/projects/{slug}/{prefix}-N.webp
 */

// Helper: genera array de rutas /projects/{folder}/{prefix}-1.webp ... -{count}.webp
function imgs(folder: string, prefix: string, count: number): string[] {
  return Array.from({ length: count }, (_, i) => `/projects/${folder}/${prefix}-${i + 1}.webp`);
}

export const STATIC_PROJECTS: Project[] = [

  // ══════════════════════════════════════════════
  // OBRA NUEVA
  // ══════════════════════════════════════════════
  {
    id: "1", slug: "cardedeu", title: "Cardedeu", category: "obra_nueva",
    description: "Obra nueva de vivienda unifamiliar pasiva y eficiente energéticamente. Projecte Ana Vulart Arquitectes · Constructor Papik.",
    body: "En este proyecto realizamos los trabajos de dirección de ejecución de obra, coordinación de seguridad y salud y control de calidad en construcción de casa pasiva eficientemente energética.",
    location: "Calaceite", year: null, status: "completed", client: "Particular", area: null,
    cover_url: "/projects/cardedeu/cardedeu-1.webp",
    gallery: imgs("cardedeu", "cardedeu", 21),
    is_featured: true, sort_order: 1, created_at: "2023-01-01T00:00:00Z",
  },
  {
    id: "2", slug: "corbera", title: "Corbera", category: "obra_nueva",
    description: "Obra nueva de vivienda unifamiliar pasiva y eficiente energéticamente. Projecte Ana Vulart Arquitectes · Constructor Papik.",
    body: "En este proyecto realizamos los trabajos de dirección de ejecución de obra, coordinación de seguridad y salud y control de calidad en construcción de casa pasiva eficientemente energética.",
    location: "Corbera de Llobregat", year: 2024, status: "completed", client: "Particular", area: null,
    cover_url: "/projects/corbera/corbera-1.webp",
    gallery: imgs("corbera", "corbera", 106),
    is_featured: true, sort_order: 2, created_at: "2024-01-01T00:00:00Z",
  },

  // ══════════════════════════════════════════════
  // REHABILITACIÓN DE EDIFICIOS
  // ══════════════════════════════════════════════
  {
    id: "3", slug: "provenca", title: "Provença 292", category: "rehabilitacion",
    description: "Rehabilitación de fachada y balcones con permiso comunicado diferido y afectación patrimonial en Barcelona.",
    body: "Edificio con medidas cautelares por desprendimientos de revestimiento a la vía pública. Se redacta proyecto de rehabilitación de fachada y balcones obteniendo permisos de rehabilitación tipo comunicado diferido con afectación patrimonial en la ciudad de Barcelona. Se realiza Dirección de ejecución de obras, coordinación de seguridad y salud, así como control de calidad de todos los trabajos.",
    location: "Carrer Provença 292, Barcelona", year: 2023, status: "completed", client: "Comunidad de Propietarios", area: null,
    cover_url: "/projects/provenca/provenca-1.webp",
    gallery: imgs("provenca", "provenca", 13),
    is_featured: true, sort_order: 3, created_at: "2023-03-01T00:00:00Z",
  },
  {
    id: "4", slug: "pablo-iglesias", title: "Pablo Iglesias 55-63", category: "rehabilitacion",
    description: "Rehabilitación de edificio con medidas cautelares. Mejoras energéticas subvencionadas con ayudas NEXT GENERATION EU.",
    body: "Edificio con medidas cautelares por degradación de balcones y desprendimientos a la vía pública. Se realiza Dirección de ejecución de obras, coordinación de seguridad y salud, así como control de calidad de todos los trabajos para mejoras energéticas subvencionadas con ayudas NEXT GENERATION.",
    location: "Carrer Pablo Iglesias 55-63, Barcelona", year: null, status: "completed", client: "Comunidad Subvencionada Next Generation", area: null,
    cover_url: "/projects/pablo-iglesias/pablo-iglesias-1.webp",
    gallery: imgs("pablo-iglesias", "pablo-iglesias", 39),
    is_featured: true, sort_order: 4, created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "5", slug: "can-baro", title: "Can Baró", category: "rehabilitacion",
    description: "Rehabilitación de fachada y balcones. Permiso comunicado inmediato en Barcelona.",
    body: "Edificio con medidas cautelares por degradación de balcones y desprendimientos a la vía pública. Se redacta proyecto de rehabilitación de fachada y balcones obteniendo permisos de rehabilitación tipo comunicado inmediato en la ciudad de Barcelona. Se realiza Dirección de ejecución de obras, coordinación de seguridad y salud, así como control de calidad de todos los trabajos.",
    location: "Avinguda Can Baró 24, Barcelona 08024", year: 2024, status: "completed", client: "Comunidad de Propietarios", area: null,
    cover_url: "/projects/can-baro/can-baro-1.webp",
    gallery: imgs("can-baro", "can-baro", 30),
    is_featured: false, sort_order: 5, created_at: "2024-09-01T00:00:00Z",
  },
  {
    id: "6", slug: "quinti", title: "Sant Quintí 122", category: "rehabilitacion",
    description: "Rehabilitación de fachada y balcones con permiso comunicado diferido y afectación patrimonial en Barcelona.",
    body: "Edificio con medidas cautelares por desprendimientos de revestimiento a la vía pública. Se redacta proyecto de rehabilitación de fachada y balcones obteniendo permisos de rehabilitación tipo comunicado diferido con afectación patrimonial en la ciudad de Barcelona. Se realiza Dirección de ejecución de obras, coordinación de seguridad y salud, así como control de calidad de todos los trabajos.",
    location: "Carrer Sant Quintí 122, Barcelona 08041", year: 2024, status: "completed", client: "Comunidad de Propietarios", area: null,
    cover_url: "/projects/quinti/quinti-1.webp",
    gallery: imgs("quinti", "quinti", 27),
    is_featured: false, sort_order: 6, created_at: "2024-03-01T00:00:00Z",
  },
  {
    id: "7", slug: "tamarit", title: "Tamarit 161", category: "rehabilitacion",
    description: "Rehabilitación de fachada y balcones con permiso comunicado diferido y afectación patrimonial en Barcelona.",
    body: "Edificio con medidas cautelares por desprendimientos de revestimiento a la vía pública. Se redacta proyecto de rehabilitación de fachada y balcones obteniendo permisos de rehabilitación tipo comunicado diferido con afectación patrimonial en la ciudad de Barcelona. Se realiza Dirección de ejecución de obras, coordinación de seguridad y salud, así como control de calidad de todos los trabajos.",
    location: "Carrer Tamarit 161, 08015 Barcelona", year: 2019, status: "completed", client: "Comunidad de Propietarios", area: null,
    cover_url: "/projects/tamarit/tamarit-1.webp",
    gallery: imgs("tamarit", "tamarit", 40),
    is_featured: false, sort_order: 7, created_at: "2019-11-01T00:00:00Z",
  },

  // ══════════════════════════════════════════════
  // VIVIENDAS
  // ══════════════════════════════════════════════
  {
    id: "8", slug: "berlin", title: "Berlín", category: "viviendas",
    description: "Reforma integral de vivienda unifamiliar sin afectación estructural. Permiso de obra para despacho de interiorismo BRAKARA.",
    body: "Reforma integral de vivienda unifamiliar sin afectación estructural. Redactando permiso de obra para despacho de interiorismo BRAKARA y dirección de obra en todo el proceso constructivo.",
    location: "Barcelona", year: 2024, status: "completed", client: "Particular", area: null,
    cover_url: "/projects/berlin/berlin-1.webp",
    gallery: imgs("berlin", "berlin", 19),
    is_featured: true, sort_order: 8, created_at: "2024-03-01T00:00:00Z",
  },
  {
    id: "9", slug: "aribau", title: "Aribau", category: "viviendas",
    description: "Reforma integral de vivienda unifamiliar sin afectación estructural. Proyecto y dirección de obra completa.",
    body: "Reforma integral de vivienda unifamiliar sin afectación estructural. Redactando proyecto y dirección de obra en todo el proceso constructivo.",
    location: "Barcelona", year: 2019, status: "completed", client: "Particular", area: null,
    cover_url: "/projects/aribau/aribau-1.webp",
    gallery: imgs("aribau", "aribau", 46),
    is_featured: false, sort_order: 9, created_at: "2019-12-01T00:00:00Z",
  },
  {
    id: "10", slug: "armon-jadraque", title: "Jadraque", category: "viviendas",
    description: "Reforma integral de vivienda unifamiliar sin afectación estructural. Proyecto y dirección de obra completa.",
    body: "Reforma integral de vivienda unifamiliar sin afectación estructural. Redactando proyecto y dirección de obra en todo el proceso constructivo.",
    location: "Barcelona", year: 2024, status: "completed", client: "Particular", area: null,
    cover_url: "/projects/armon-jadraque/jadraque-1.webp",
    gallery: imgs("armon-jadraque", "jadraque", 10),
    is_featured: false, sort_order: 10, created_at: "2024-12-01T00:00:00Z",
  },
  {
    id: "11", slug: "armon-mora", title: "Mora la Nova", category: "viviendas",
    description: "Reforma integral de vivienda unifamiliar sin afectación estructural. Proyecto y dirección de obra completa.",
    body: "Reforma integral de vivienda unifamiliar sin afectación estructural. Redactando proyecto y dirección de obra en todo el proceso constructivo.",
    location: "Mora la Nova", year: 2025, status: "completed", client: "Particular", area: null,
    cover_url: "/projects/armon-mora/mora-1.webp",
    gallery: imgs("armon-mora", "mora", 9),
    is_featured: false, sort_order: 11, created_at: "2025-02-01T00:00:00Z",
  },
  {
    id: "12", slug: "badalona", title: "Carretera Major, Badalona", category: "viviendas",
    description: "Reforma integral de vivienda unifamiliar sin afectación estructural. Proyecto y dirección de obra completa.",
    body: "Reforma integral de vivienda unifamiliar sin afectación estructural. Redactando proyecto y dirección de obra en todo el proceso constructivo.",
    location: "Badalona", year: 2024, status: "completed", client: "Particular", area: null,
    cover_url: "/projects/badalona/badalona-1.webp",
    gallery: imgs("badalona", "badalona", 10),
    is_featured: false, sort_order: 12, created_at: "2024-04-01T00:00:00Z",
  },
  {
    id: "13", slug: "concordia", title: "Concordia", category: "viviendas",
    description: "Reforma integral de vivienda unifamiliar sin afectación estructural. Permiso de obra para despacho de interiorismo BRAKARA.",
    body: "Reforma integral de vivienda unifamiliar sin afectación estructural. Redactando permiso de obra para despacho de interiorismo BRAKARA y dirección de obra en todo el proceso constructivo.",
    location: "Barcelona", year: 2024, status: "completed", client: "Particular", area: null,
    cover_url: "/projects/concordia/concordia-1.webp",
    gallery: imgs("concordia", "concordia", 15),
    is_featured: false, sort_order: 13, created_at: "2024-10-01T00:00:00Z",
  },
  {
    id: "14", slug: "lepanto", title: "Lepanto", category: "viviendas",
    description: "Reforma integral de vivienda unifamiliar sin afectación estructural. Proyecto y dirección de obra completa.",
    body: "Reforma integral de vivienda unifamiliar sin afectación estructural. Redactando proyecto y dirección de obra en todo el proceso constructivo.",
    location: "Barcelona", year: 2024, status: "completed", client: "Particular", area: null,
    cover_url: "/projects/lepanto/lepanto-1.webp",
    gallery: imgs("lepanto", "lepanto", 10),
    is_featured: false, sort_order: 14, created_at: "2024-03-01T00:00:00Z",
  },
  {
    id: "15", slug: "muntaner", title: "Muntaner", category: "viviendas",
    description: "Reforma integral de vivienda unifamiliar sin afectación estructural. Permiso de obra para despacho de interiorismo BRAKARA.",
    body: "Reforma integral de vivienda unifamiliar sin afectación estructural. Redactando permiso de obra para despacho de interiorismo BRAKARA y dirección de obra en todo el proceso constructivo.",
    location: "Barcelona", year: 2023, status: "completed", client: "Particular", area: null,
    cover_url: "/projects/muntaner/muntaner-1.webp",
    gallery: imgs("muntaner", "muntaner", 16),
    is_featured: false, sort_order: 15, created_at: "2023-03-01T00:00:00Z",
  },
  {
    id: "16", slug: "puigmarti", title: "Puigmartí", category: "viviendas",
    description: "Reforma integral de vivienda unifamiliar sin afectación estructural. Proyecto y dirección de obra completa.",
    body: "Reforma integral de vivienda unifamiliar sin afectación estructural. Redactando proyecto y dirección de obra en todo el proceso constructivo.",
    location: "Barcelona", year: 2024, status: "completed", client: "Particular", area: null,
    cover_url: "/projects/puigmarti/puigmarti-1.webp",
    gallery: imgs("puigmarti", "puigmarti", 35),
    is_featured: false, sort_order: 16, created_at: "2024-03-01T00:00:00Z",
  },
  {
    id: "17", slug: "vilamari", title: "Vilamarí", category: "viviendas",
    description: "Reforma integral de vivienda unifamiliar sin afectación estructural. Permiso de obra para despacho de interiorismo BRAKARA.",
    body: "Reforma integral de vivienda unifamiliar sin afectación estructural. Redactando permiso de obra para despacho de interiorismo BRAKARA y dirección de obra en todo el proceso constructivo.",
    location: "Barcelona", year: 2024, status: "completed", client: "Particular", area: null,
    cover_url: "/projects/vilamari/vilamari-1.webp",
    gallery: imgs("vilamari", "vilamari", 20),
    is_featured: false, sort_order: 17, created_at: "2024-05-01T00:00:00Z",
  },
  {
    id: "18", slug: "segre", title: "Segre 79", category: "viviendas",
    description: "Reforma integral de vivienda unifamiliar sin afectación estructural. Proyecto y dirección de obra completa.",
    body: "Reforma integral de vivienda unifamiliar sin afectación estructural. Redactando proyecto y dirección de obra en todo el proceso constructivo.",
    location: "Carrer Segre 79, Barcelona", year: 2022, status: "completed", client: "Particular", area: null,
    cover_url: "/projects/segre/segre-1.webp",
    gallery: imgs("segre", "segre", 32),
    is_featured: false, sort_order: 18, created_at: "2022-05-01T00:00:00Z",
  },
];

export const STATIC_FEATURED = STATIC_PROJECTS.filter((p) => p.is_featured);
