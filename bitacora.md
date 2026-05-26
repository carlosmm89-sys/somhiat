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
- favicon.ico en /app/
- icon-512.png y apple-touch-icon.png en /public/
- og-image.jpg (1200x630) para WhatsApp/redes sociales
- Metadata icons configurados en layout.tsx

### 11. Infraestructura y Deploy
- **Vercel:** deploy automático desde GitHub (main)
- **Vercel Analytics:** @vercel/analytics integrado
- **Dominio:** somhiat.com + www.somhiat.com con SSL automático
- **DNS:** A record → 76.76.21.21, CNAME www → cname.vercel-dns.com
- **Variables de entorno:** Supabase + SMTP configuradas en Vercel

### 12. Bugs corregidos
- **Category CHECK constraint:** código usaba guiones (`obra-nueva`) pero DB usa guiones bajos (`obra_nueva`). Corregido en 8 archivos
- **Status "En Ejecución":** Cardedeu y Pablo Iglesias corregidos a `completed` tanto en DB como en static-data.ts
- **Responsive mobile:** grids estandarizados con clases CSS (grid-2col, grid-3col, flex-footer)
- **Foto duplicada en Nosotros:** intercambiada benito-obra.jpg para evitar repetición

---

## 📁 Archivos principales

| Archivo | Descripción |
|---------|-------------|
| `app/layout.tsx` | Root layout con fonts, metadata, Analytics |
| `app/page.tsx` | Home page |
| `app/proyectos/page.tsx` | Lista de proyectos con filtros |
| `app/proyectos/[slug]/page.tsx` | Detalle de proyecto |
| `app/nosotros/page.tsx` | Página sobre nosotros |
| `app/contacto/page.tsx` | Formulario de contacto |
| `app/admin/layout.tsx` | Admin layout con sidebar |
| `app/admin/dashboard/page.tsx` | Dashboard admin |
| `app/admin/analytics/page.tsx` | Analíticas |
| `app/admin/proyectos/[slug]/page.tsx` | Editar proyecto |
| `app/api/contact/route.ts` | API formulario contacto |
| `app/api/analytics/route.ts` | API registro de visitas |
| `components/PageTracker.tsx` | Tracker de visitas |
| `components/CookieBanner.tsx` | Banner cookies flotante |
| `lib/i18n.ts` | Traducciones ES/CA/EN/FR |
| `lib/static-data.ts` | 18 proyectos estáticos |
| `lib/smtp.ts` | Módulo envío email |
| `types/index.ts` | Tipos TypeScript |

---

## 🔐 Credenciales

| Servicio | Usuario | Contraseña |
|----------|---------|------------|
| Admin Panel | bvilla@somhiat.com | Somhiat2026* |
| SMTP (Hestia) | bvilla@somhiat.com | Somhi2024* |
| Supabase | Proyecto: Somhiat | Dashboard Tonwy Tech |

---

## 📌 Estado final
- ✅ Web pública live en somhiat.com
- ✅ Panel admin funcional
- ✅ 4 idiomas completos
- ✅ SEO, sitemap, robots
- ✅ SMTP configurado
- ✅ Analytics propio
- ✅ Favicon + OG image
- ✅ SSL automático Vercel
