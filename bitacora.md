# 📋 Bitácora — SOMHi Arquitectura Técnica (somhiat.com)
## Fecha: 26 de mayo de 2026

---

## 🏗️ Proyecto
- **Cliente:** Benito Villa — SOMHi Arquitectura Técnica
- **Dominio:** [somhiat.com](https://somhiat.com)
- **Stack:** Next.js 15 (App Router) + Supabase + Vercel
- **Repo:** github.com/carlosmm89-sys/somhiat

---

## ✅ Trabajo completado hoy

### 1. Diseño y Estructura Web Completa
- **Home:** Hero con imagen de fondo, sección de servicios, preview de proyectos (bento grid), preview nosotros, CTA contacto
- **Proyectos:** Grid filtrable por categoría (Obra Nueva, Rehabilitación, Viviendas), página detalle con galería lightbox y ficha técnica
- **Nosotros:** Página con fotos reales (benito-villa.jpg, benito-obra.jpg), descripción y valores
- **Contacto:** Formulario funcional con validación y envío SMTP
- **Diseño:** Paleta `#354853` (fondo), `#C3E0C5` (acento), `#2a3c45` (elementos oscuros). Fuentes: Hanken Grotesk, Inter, JetBrains Mono

### 2. Internacionalización (i18n) — 4 idiomas
- Español (ES), Catalán (CA), Inglés (EN), Francés (FR)
- Selector de idioma en navbar con banderas
- Todas las secciones traducidas: home, proyectos, nosotros, contacto, filtros, footer, legales

### 3. Panel de Administración (/admin)
- **Login** con Supabase Auth (bvilla@somhiat.com)
- **Dashboard** con KPIs: total proyectos, por categoría, en ejecución
- **CRUD Proyectos:** crear, editar, borrar con formularios completos
- **Galería:** upload de imágenes a Supabase Storage con preview
- **Categorías:** tabla de referencia multiidioma
- **Analíticas:** nueva pestaña con gráficos propios (ver punto 9)

### 4. Base de Datos (Supabase)
- Tabla `projects` con 18 proyectos reales (518 imágenes en /public/projects/)
- Tabla `contact_messages` para almacenar formularios
- Tabla `page_views` para analíticas propias
- RLS configurado: inserts anónimos, lectura autenticada
- CHECK constraints para `category` y `status`

### 5. SEO Completo
- `robots.txt` → bloquea /admin/ y /api/, enlaza sitemap
- `sitemap.xml` → 7 URLs con prioridades y frecuencias
- Meta tags: title, description, keywords, OG, Twitter Cards
- Estructura semántica HTML5 con h1 único por página

### 6. Legal y RGPD
- Aviso Legal, Política de Privacidad, Política de Cookies
- Cookie banner flotante (bottom-left) con Aceptar/Rechazar
- Almacenamiento en localStorage

### 7. UX y Componentes
- Navbar responsive con hamburger menu mobile
- Scroll reveal animations (IntersectionObserver)
- WhatsApp flotante (bottom-right)
- Lightbox de galería de fotos
- Página 404 personalizada
- Footer con crédito "Desarrollo by Tonwy.com"

### 8. SMTP — Formulario de Contacto
- **Servidor:** mail.somhiat.com (Hestia)
- **Puerto:** 465 (SSL)
- **Usuario:** bvilla@somhiat.com
- Email HTML profesional con template branded SOMHi
- Doble canal: guarda en Supabase + envía email

### 9. Sistema de Analíticas Propio
- **PageTracker:** componente client que registra cada visita
- **API /api/analytics:** guarda en tabla `page_views` de Supabase
- **Panel Admin /admin/analytics:**
  - 4 KPIs: hoy, semana, período, páginas únicas
  - Gráfico de barras por día (7d/30d/90d)
  - Top páginas más visitadas con barras de progreso
  - Origen del tráfico (referrers)
  - Log de últimas 30 visitas

### 10. Favicon y OG Image
- Favicon dinámico servido desde `/api/favicon` → lee de Supabase Storage
- icon-192.png, icon-512.png y apple-touch-icon.png generados con sharp
- og-image.jpg (1200x630) con S centrada sobre fondo #354853
- Upload de favicon/logo desde panel admin → Supabase Storage (bucket `site-assets`)

### 11. Infraestructura y Deploy
- **Vercel:** deploy automático desde GitHub (main)
- **Vercel Analytics:** @vercel/analytics integrado
- **Dominio:** somhiat.com + www.somhiat.com con SSL automático
- **DNS:** A record → 76.76.21.21, CNAME www → cname.vercel-dns.com
- **Variables de entorno:** Supabase + SMTP configuradas en Vercel

### 12. Panel de Configuración (/admin/configuracion)
- **General:** nombre del sitio, URL
- **Contacto:** email, teléfono, WhatsApp, dirección
- **Redes sociales:** LinkedIn, Instagram
- **SEO:** meta título, meta descripción
- **Imágenes:** upload de favicon y logo a Supabase Storage con preview
- **Footer:** crédito desarrollo
- **Persistencia:** datos guardados en tabla `site_config` de Supabase

### 13. Sidebar Admin mejorado
- Categorías anidada como sub-item de Proyectos
- Sub-items visibles cuando la sección padre está activa
- Logo imagen (logo-somhi.png) en sidebar y login
- Pestaña Configuración con icono ⚙

### 14. Seguridad (Headers HTTP)
- `X-Frame-Options: DENY` (anti-clickjacking)
- `X-Content-Type-Options: nosniff` (anti-MIME sniffing)
- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-XSS-Protection: 1; mode=block`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

### 15. Bugs corregidos
- **Category CHECK constraint:** código usaba guiones (`obra-nueva`) pero DB usa guiones bajos (`obra_nueva`). Corregido en 8 archivos
- **Status "En Ejecución":** Cardedeu y Pablo Iglesias corregidos a `completed` tanto en DB como en static-data.ts
- **Responsive mobile:** grids estandarizados con clases CSS (grid-2col, grid-3col, flex-footer)
- **Foto duplicada en Nosotros:** intercambiada benito-obra.jpg para evitar repetición
- **Sidebar desaparecía en Categorías:** corregida lógica active para incluir rutas hijas
- **Favicon no aparecía:** convertido a PNG real con sharp, luego a ruta dinámica /api/favicon

### 16. Auditoría Final
- **Sitemap:** ampliado de 7 a 25 URLs (incluye 18 proyectos individuales)
- **Security headers:** 5 headers HTTP añadidos en next.config.ts
- **Remote patterns:** limpiados (eliminados unsplash y googleusercontent innecesarios)
- **Resultado:** ✅ PRODUCCIÓN LISTA

---

## 📁 Archivos principales

| Archivo | Descripción |
|---------|-------------|
| `app/layout.tsx` | Root layout con fonts, metadata, Analytics |
| `app/page.tsx` | Home page |
| `app/sitemap.ts` | 25 URLs dinámicas |
| `app/robots.ts` | Bloquea /admin/ y /api/ |
| `app/not-found.tsx` | Página 404 personalizada |
| `app/proyectos/page.tsx` | Lista de proyectos con filtros |
| `app/proyectos/[slug]/page.tsx` | Detalle de proyecto |
| `app/nosotros/page.tsx` | Página sobre nosotros |
| `app/contacto/page.tsx` | Formulario de contacto |
| `app/admin/layout.tsx` | Admin layout con sidebar + sub-items |
| `app/admin/dashboard/page.tsx` | Dashboard admin |
| `app/admin/analytics/page.tsx` | Analíticas propias |
| `app/admin/configuracion/page.tsx` | Configuración persistente |
| `app/admin/categorias/page.tsx` | CRUD categorías |
| `app/admin/proyectos/[slug]/page.tsx` | Editar proyecto |
| `app/api/contact/route.ts` | API formulario contacto |
| `app/api/analytics/route.ts` | API registro de visitas |
| `app/api/favicon/route.ts` | Favicon dinámico desde Storage |
| `components/PageTracker.tsx` | Tracker de visitas |
| `components/CookieBanner.tsx` | Banner cookies flotante |
| `lib/i18n.ts` | Traducciones ES/CA/EN/FR |
| `lib/static-data.ts` | 18 proyectos estáticos |
| `lib/smtp.ts` | Módulo envío email |
| `middleware.ts` | Auth guard /admin/* |
| `next.config.ts` | Config + security headers |
| `types/index.ts` | Tipos TypeScript |

---

## 🗄️ Tablas Supabase

| Tabla | Descripción |
|-------|-------------|
| `projects` | 18 proyectos (slug, title, category, status, gallery...) |
| `contact_messages` | Formularios de contacto (name, email, message) |
| `page_views` | Analíticas (path, referrer, created_at) |
| `site_config` | Configuración clave/valor (key, value, updated_at) |

**Storage Buckets:**
| Bucket | Tipo | Uso |
|--------|------|-----|
| `project-images` | Public | Imágenes de proyectos |
| `site-assets` | Public | Favicon, logo, assets del sitio |

---

## 🔐 Credenciales

| Servicio | Usuario | Contraseña |
|----------|---------|------------|
| Admin Panel | bvilla@somhiat.com | Somhiat2026* |
| SMTP (Hestia) | bvilla@somhiat.com | Somhi2024* |
| Supabase | Proyecto: Somhiat | Dashboard Tonwy Tech |

---

## 📌 Estado final — 27 mayo 2026
- ✅ Web pública live en somhiat.com
- ✅ Panel admin funcional (6 secciones)
- ✅ 4 idiomas completos (ES/CA/EN/FR)
- ✅ SEO completo (25 URLs en sitemap)
- ✅ Security headers (5 headers)
- ✅ SMTP configurado (dual: DB + email)
- ✅ Analytics propio + Vercel
- ✅ Favicon dinámico + OG image
- ✅ Configuración persistente en Supabase
- ✅ Upload de imágenes (favicon/logo)
- ✅ RGPD completo (3 páginas + cookies)
- ✅ SSL automático Vercel
- ✅ **AUDITORÍA FINAL PASADA**

