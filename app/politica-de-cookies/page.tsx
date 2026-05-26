"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function PoliticaCookiesPage() {
  const { lang } = useLanguage();

  const content: Record<string, { title: string; body: string }> = {
    es: {
      title: "Política de Cookies",
      body: `## ¿Qué son las cookies?

Las cookies son pequeños archivos de texto que los sitios web almacenan en tu dispositivo (ordenador, tablet o móvil) cuando los visitas. Se utilizan para hacer que los sitios web funcionen correctamente, de manera más eficiente, y para proporcionar información a los propietarios del sitio.

## Cookies que utilizamos

Este sitio web utiliza únicamente **cookies técnicas y funcionales** necesarias para el correcto funcionamiento del sitio:

- **Cookies de sesión:** se eliminan al cerrar el navegador y permiten la navegación por el sitio.
- **Cookies de preferencia de idioma:** almacenan tu selección de idioma para futuras visitas.

## Cookies de terceros

Este sitio web **no utiliza cookies de seguimiento, publicidad ni analítica** de terceros.

## Gestión de cookies

Puedes configurar tu navegador para rechazar todas las cookies o para que te avise cuando se envía una cookie. Sin embargo, algunas funciones del sitio podrían no funcionar correctamente sin cookies.

## Más información

Para más información sobre el uso de cookies, puedes contactar con nosotros en bvilla@somhiat.com.`,
    },
    ca: {
      title: "Política de Cookies",
      body: `## Què són les cookies?

Les cookies són petits arxius de text que els llocs web emmagatzemen al teu dispositiu quan els visites. S'utilitzen per fer que els llocs web funcionin correctament i per proporcionar informació als propietaris del lloc.

## Cookies que utilitzem

Aquest lloc web utilitza únicament **cookies tècniques i funcionals** necessàries per al correcte funcionament del lloc.

## Cookies de tercers

Aquest lloc web **no utilitza cookies de seguiment, publicitat ni analítica** de tercers.`,
    },
    en: {
      title: "Cookie Policy",
      body: `## What are cookies?

Cookies are small text files that websites store on your device when you visit them. They are used to make websites work correctly and to provide information to site owners.

## Cookies we use

This website only uses **technical and functional cookies** necessary for the correct operation of the site.

## Third-party cookies

This website **does not use tracking, advertising or analytics cookies** from third parties.`,
    },
    fr: {
      title: "Politique de Cookies",
      body: `## Que sont les cookies ?

Les cookies sont de petits fichiers texte que les sites web stockent sur votre appareil lorsque vous les visitez. Ils sont utilisés pour faire fonctionner correctement les sites web et fournir des informations aux propriétaires du site.

## Cookies que nous utilisons

Ce site web utilise uniquement des **cookies techniques et fonctionnels** nécessaires au bon fonctionnement du site.

## Cookies tiers

Ce site web **n'utilise pas de cookies de suivi, de publicité ou d'analyse** de tiers.`,
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
