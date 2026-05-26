"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function AvisoLegalPage() {
  const { lang } = useLanguage();

  const content: Record<string, { title: string; body: string }> = {
    es: {
      title: "Aviso Legal",
      body: `En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSICE), se informa de los siguientes datos:

**Titular del sitio web:**
SOMHi Arquitectura Técnica
B. Villa — Arquitecto Técnico colegiado

**Domicilio:**
Barcelona, España

**Correo electrónico:**
bvilla@somhiat.com

**Teléfono:**
+34 647 04 53 59

**Actividad:**
Servicios de arquitectura técnica, dirección de obra, rehabilitación de edificios y gestión de proyectos constructivos.

---

## Condiciones de uso

El acceso y uso de este sitio web atribuye la condición de usuario e implica la aceptación plena de todas las condiciones incluidas en este Aviso Legal. El usuario se compromete a hacer un uso adecuado de los contenidos y servicios que se ofrecen a través de este sitio web.

## Propiedad intelectual e industrial

Todos los contenidos del sitio web, incluyendo textos, fotografías, gráficos, imágenes, iconos, tecnología, software, así como su diseño gráfico y códigos fuente, constituyen una obra cuya propiedad pertenece a SOMHi Arquitectura Técnica, sin que puedan entenderse cedidos al usuario ninguno de los derechos de explotación reconocidos por la normativa vigente.

## Exclusión de responsabilidad

SOMHi Arquitectura Técnica no se hace responsable de los daños y perjuicios de cualquier naturaleza que pudieran derivarse del uso de los servicios y contenidos del sitio web por parte del usuario.

## Legislación aplicable

Para la resolución de todas las controversias o cuestiones relacionadas con el presente sitio web, será de aplicación la legislación española, siendo competentes los Juzgados y Tribunales de Barcelona.`,
    },
    ca: {
      title: "Avís Legal",
      body: `En compliment de la Llei 34/2002, d'11 de juliol, de Serveis de la Societat de la Informació i de Comerç Electrònic (LSSICE), s'informa de les següents dades:

**Titular del lloc web:**
SOMHi Arquitectura Tècnica
B. Villa — Arquitecte Tècnic col·legiat

**Domicili:**
Barcelona, Espanya

**Correu electrònic:**
bvilla@somhiat.com

**Telèfon:**
+34 647 04 53 59

**Activitat:**
Serveis d'arquitectura tècnica, direcció d'obra, rehabilitació d'edificis i gestió de projectes constructius.`,
    },
    en: {
      title: "Legal Notice",
      body: `In compliance with Law 34/2002, of July 11, on Information Society and Electronic Commerce Services (LSSICE), the following information is provided:

**Website owner:**
SOMHi Technical Architecture
B. Villa — Chartered Technical Architect

**Address:**
Barcelona, Spain

**Email:**
bvilla@somhiat.com

**Phone:**
+34 647 04 53 59

**Activity:**
Technical architecture services, construction management, building rehabilitation and construction project management.`,
    },
    fr: {
      title: "Mentions Légales",
      body: `Conformément à la Loi 34/2002, du 11 juillet, relative aux Services de la Société de l'Information et du Commerce Électronique (LSSICE), les informations suivantes sont communiquées :

**Titulaire du site web :**
SOMHi Architecture Technique
B. Villa — Architecte Technique agréé

**Adresse :**
Barcelone, Espagne

**Email :**
bvilla@somhiat.com

**Téléphone :**
+34 647 04 53 59

**Activité :**
Services d'architecture technique, direction de travaux, réhabilitation de bâtiments et gestion de projets de construction.`,
    },
  };

  const c = content[lang] || content.es;

  return (
    <div style={{ backgroundColor: "#354853", minHeight: "100vh", paddingTop: "80px" }}>
      <div className="container" style={{ paddingTop: "4rem", paddingBottom: "4rem", maxWidth: "800px" }}>
        <h1 style={{
          fontFamily: "var(--font-hanken),'Hanken Grotesk',sans-serif",
          fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300, color: "#e8ecef",
          marginBottom: "2rem",
        }}>{c.title}</h1>
        <div style={{
          fontFamily: "var(--font-inter),'Inter',sans-serif",
          fontSize: "0.95rem", lineHeight: 1.8, color: "#b8c8d0",
          whiteSpace: "pre-wrap",
        }}>
          {c.body.split("\n").map((line, i) => {
            if (line.startsWith("## ")) return <h2 key={i} style={{ fontFamily: "var(--font-hanken)", fontSize: "1.5rem", fontWeight: 400, color: "#e8ecef", margin: "2rem 0 1rem" }}>{line.replace("## ", "")}</h2>;
            if (line.startsWith("**") && line.endsWith("**")) return <p key={i} style={{ fontWeight: 600, color: "#e8ecef", marginTop: "0.75rem" }}>{line.replace(/\*\*/g, "")}</p>;
            if (line === "---") return <hr key={i} style={{ border: "none", borderTop: "1px solid rgba(195,224,197,0.12)", margin: "2rem 0" }} />;
            return <p key={i} style={{ margin: line.trim() === "" ? "0.5rem 0" : "0.25rem 0" }}>{line}</p>;
          })}
        </div>
      </div>
    </div>
  );
}
