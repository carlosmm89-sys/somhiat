"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function PoliticaPrivacidadPage() {
  const { lang } = useLanguage();

  const content: Record<string, { title: string; body: string }> = {
    es: {
      title: "Política de Privacidad",
      body: `## Responsable del tratamiento

**SOMHi Arquitectura Técnica**
B. Villa — Arquitecto Técnico colegiado
Email: bvilla@somhiat.com

## Datos que recopilamos

A través del formulario de contacto, recopilamos:
- Nombre
- Dirección de correo electrónico
- Asunto y mensaje

## Finalidad del tratamiento

Los datos proporcionados se utilizarán exclusivamente para:
- Responder a consultas y solicitudes de presupuesto
- Gestionar la relación profesional con el cliente

## Base legal

El tratamiento de datos se basa en el consentimiento del interesado al enviar el formulario de contacto y en el interés legítimo del responsable para atender las solicitudes recibidas.

## Conservación de datos

Los datos personales se conservarán mientras sea necesario para la finalidad para la que fueron recogidos y mientras existan obligaciones legales que justifiquen su conservación.

## Derechos del usuario

El usuario puede ejercer los siguientes derechos:
- Acceso a sus datos personales
- Rectificación de datos inexactos
- Supresión de sus datos
- Limitación del tratamiento
- Portabilidad de los datos
- Oposición al tratamiento

Para ejercer estos derechos, puede contactar con nosotros en bvilla@somhiat.com.

## Seguridad

Hemos adoptado las medidas de seguridad necesarias para proteger los datos personales contra accesos no autorizados, alteración, divulgación o destrucción.`,
    },
    ca: {
      title: "Política de Privacitat",
      body: `## Responsable del tractament

**SOMHi Arquitectura Tècnica**
B. Villa — Arquitecte Tècnic col·legiat
Email: bvilla@somhiat.com

## Dades que recopilem

A través del formulari de contacte, recopilem nom, correu electrònic, assumpte i missatge.

## Finalitat del tractament

Les dades es faran servir exclusivament per respondre consultes i gestionar la relació professional.

## Drets de l'usuari

L'usuari pot exercir els drets d'accés, rectificació, supressió, limitació, portabilitat i oposició contactant amb bvilla@somhiat.com.`,
    },
    en: {
      title: "Privacy Policy",
      body: `## Data Controller

**SOMHi Technical Architecture**
B. Villa — Chartered Technical Architect
Email: bvilla@somhiat.com

## Data We Collect

Through the contact form, we collect name, email address, subject and message.

## Purpose

Data provided will be used exclusively to respond to inquiries and manage professional relationships.

## User Rights

Users may exercise their rights of access, rectification, erasure, restriction, portability and objection by contacting bvilla@somhiat.com.`,
    },
    fr: {
      title: "Politique de Confidentialité",
      body: `## Responsable du traitement

**SOMHi Architecture Technique**
B. Villa — Architecte Technique agréé
Email : bvilla@somhiat.com

## Données collectées

Via le formulaire de contact, nous collectons le nom, l'adresse e-mail, le sujet et le message.

## Finalité

Les données fournies seront utilisées exclusivement pour répondre aux demandes et gérer la relation professionnelle.

## Droits de l'utilisateur

L'utilisateur peut exercer ses droits d'accès, de rectification, de suppression, de limitation, de portabilité et d'opposition en contactant bvilla@somhiat.com.`,
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
        }}>
          {c.body.split("\n").map((line, i) => {
            if (line.startsWith("## ")) return <h2 key={i} style={{ fontFamily: "var(--font-hanken)", fontSize: "1.5rem", fontWeight: 400, color: "#e8ecef", margin: "2rem 0 1rem" }}>{line.replace("## ", "")}</h2>;
            if (line.includes("**")) {
              const parts = line.split("**");
              return <p key={i} style={{ margin: "0.5rem 0" }}>{parts.map((part, j) => j % 2 === 1 ? <strong key={j} style={{ color: "#e8ecef" }}>{part}</strong> : part)}</p>;
            }
            if (line.startsWith("- ")) return <p key={i} style={{ margin: "0.25rem 0", paddingLeft: "1rem" }}>• {line.replace("- ", "")}</p>;
            return <p key={i} style={{ margin: line.trim() === "" ? "0.5rem 0" : "0.25rem 0" }}>{line}</p>;
          })}
        </div>
      </div>
    </div>
  );
}
