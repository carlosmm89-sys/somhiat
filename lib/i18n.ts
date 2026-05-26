/**
 * SOMHi — Sistema de traducciones ES / CA / EN / FR
 * Español por defecto, con Catalán, Inglés y Francés
 */

export type Lang = "es" | "ca" | "en" | "fr";

export const LANGS: { code: Lang; label: string }[] = [
  { code: "es", label: "ES" },
  { code: "ca", label: "CA" },
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
];

export const translations = {
  es: {
    nav: { home: "Inicio", projects: "Proyectos", about: "Nosotros", contact: "Contacto", cta: "Pide Presupuesto" },
    hero: {
      eyebrow: "Arquitecto Técnico — Barcelona",
      headline1: "Arquitectura Técnica con",
      headline2: "Precisión y Alma.",
      sub: "Construyendo el futuro con atención meticulosa al detalle e integridad estructural inquebrantable.",
      cta1: "Comenzar →", cta2: "Nuestros Proyectos", scroll: "Desplazar",
    },
    about: {
      eyebrow1: "01 // Diseño y Firma", eyebrow2: "ARQUITECTO",
      name: "Benito Villa", role: "Arquitecto Técnico",
      bio1: "Con un profundo conocimiento de las exigencias estructurales y aspiraciones estéticas de la construcción moderna, Benito fundó SOMHi para tender puentes entre el diseño innovador y la ejecución impecable.",
      bio2: "Especializado en la gestión rigurosa de obras y control de calidad sin concesiones, superviso los proyectos desde la concepción hasta la ejecución final.",
      skills: ["Dirección de Ejecución de Obra", "Coordinación de Seguridad y Salud", "Control de Calidad en Construcción"],
      cta: "Leer Más →",
    },
    projects: { eyebrow: "Portfolio", title: "Trabajos Seleccionados", viewAll: "Ver Todos los Proyectos →", comingSoon: "Proyectos próximamente" },
    contact: {
      headline1: "Empecemos", headline2: "un proyecto.",
      sub: "¿Listo para convertir tus conceptos arquitectónicos en realidad estructural? Contáctanos para hablar de tu proyecto.",
      labelAbout: "CONTACTO", labelPhone: "TELÉFONO", labelEmail: "CORREO", labelAddress: "ESTUDIO",
      address: "Barcelona, España",
      fieldName: "NOMBRE COMPLETO", fieldEmail: "CORREO ELECTRÓNICO", fieldDetails: "DETALLES DEL PROYECTO",
      send: "ENVIAR MENSAJE", sending: "Enviando...",
      success: "✓ Mensaje enviado — te contactaremos en breve.",
      error: "Error al enviar. Por favor, inténtalo de nuevo.",
    },
    footer: { tagline: "Arquitectura Técnica con precisión y alma. Barcelona.", rights: "Todos los derechos reservados.", navLabel: "Navegación", contactLabel: "Contacto" },
    projectsPage: {
      eyebrow: "Portafolio", headline: "Nuestros Proyectos",
      sub: "Un portfolio de obras que combinan precisión técnica y rigor constructivo.",
      filters: { all: "Todos", obra_nueva: "Obra Nueva", rehabilitacion: "Rehabilitación", viviendas: "Viviendas" },
    },
    projectDetail: {
      specTitle: "Ficha Técnica", specClient: "Cliente", specType: "Tipo", specStatus: "Estado",
      specArea: "Superficie", specYear: "Año", specLocation: "Ubicación",
      statusCompleted: "Completado", statusInProgress: "En ejecución",
      gallery: "Galería", prev: "Anterior", next: "Siguiente", ctaProject: "Iniciar Proyecto Similar",
    },
    aboutPage: {
      eyebrow: "Sobre Nosotros", headline1: "Precisión arquitectónica", headline2: "al servicio del alma.",
      missionLabel: "Misión",
      mission: "En SOMHi creemos que la excelencia arquitectónica vive en la intersección de la disciplina técnica rigurosa y la profunda intención estética. Diseñamos espacios que no solo cumplen exigencias estructurales, sino que resuenan profundamente con la experiencia humana.",
      bioLabel: "El Arquitecto", bioTitle: "Benito Villa", bioRole: "Arquitecto Técnico · Fundador",
      bio1: "Con más de diez años navegando las complejidades de la construcción moderna, Benito aporta tanto una comprensión estructural impecable como una sensibilidad estética cultivada. Fundó SOMHi para cerrar la brecha entre diseño visionario y ejecución rigurosa.",
      bio2: "Miembro del Col·legi d'Aparelladors, Arquitectes Tècnics i Enginyers d'Edificació de Barcelona (CAATEEB), Benito supervisa cada proyecto con un compromiso inquebrantable con la excelencia.",
      valuesLabel: "Valores",
      values: [
        { icon: "△", title: "Precisión", desc: "Atención meticulosa a cada especificación técnica, asegurando que cada proyecto se ejecute con máxima exactitud." },
        { icon: "◇", title: "Integridad", desc: "Procesos transparentes, plazos cumplidos y un compromiso inquebrantable de mantener los más altos estándares." },
        { icon: "◎", title: "Innovación", desc: "Adoptando metodologías y tecnologías de vanguardia que elevan el estándar del sector." },
      ],
    },
    contactPage: {
      headline1: "Construyamos", headline2: "juntos.",
      sub: "Consulta gratuita para tu proyecto. Te respondemos en menos de 24h.",
      directLabel: "Contacto Directo", phoneHours: "Lun-Vie, 9:00 - 18:00 CET", emailHours: "Respuesta en menos de 24h",
      studioLabel: "Estudio", studioInfo: "Barcelona, España", studioNote: "Con cita previa",
      fieldName: "Nombre", fieldEmail: "Email", fieldSubject: "Tipo de Proyecto / Asunto", fieldMessage: "Detalles del Proyecto",
      send: "Enviar Consulta →", sending: "Enviando...",
      success: "✓ Mensaje enviado. Te contactaremos en menos de 24h.",
      error: "Error al enviar. Por favor inténtalo de nuevo.",
    },
  },

  ca: {
    nav: { home: "Inici", projects: "Projectes", about: "Nosaltres", contact: "Contacte", cta: "Demana Pressupost" },
    hero: {
      eyebrow: "Arquitecte Tècnic — Barcelona",
      headline1: "Arquitectura Tècnica amb",
      headline2: "Precisió i Ànima.",
      sub: "Construint el futur amb atenció meticulosa al detall i integritat estructural inquebrantable.",
      cta1: "Començar →", cta2: "Els Nostres Projectes", scroll: "Desplaçar",
    },
    about: {
      eyebrow1: "01 // Disseny i Firma", eyebrow2: "ARQUITECTE",
      name: "Benito Villa", role: "Arquitecte Tècnic",
      bio1: "Amb un profund coneixement de les exigències estructurals i aspiracions estètiques de la construcció moderna, en Benito va fundar SOMHi per establir ponts entre el disseny innovador i l'execució impecable.",
      bio2: "Especialitzat en la gestió rigorosa d'obres i control de qualitat sense concessions, superviso els projectes des de la concepció fins a l'execució final.",
      skills: ["Direcció d'Execució d'Obra", "Coordinació de Seguretat i Salut", "Control de Qualitat en Construcció"],
      cta: "Llegir Més →",
    },
    projects: { eyebrow: "Portafoli", title: "Treballs Seleccionats", viewAll: "Veure Tots els Projectes →", comingSoon: "Projectes properament" },
    contact: {
      headline1: "Comencem", headline2: "un projecte.",
      sub: "Preparat per convertir els teus conceptes arquitectònics en realitat estructural? Contacta'ns per parlar del teu projecte.",
      labelAbout: "CONTACTE", labelPhone: "TELÈFON", labelEmail: "CORREU", labelAddress: "ESTUDI",
      address: "Barcelona, Catalunya",
      fieldName: "NOM COMPLET", fieldEmail: "CORREU ELECTRÒNIC", fieldDetails: "DETALLS DEL PROJECTE",
      send: "ENVIAR MISSATGE", sending: "Enviant...",
      success: "✓ Missatge enviat — et contactarem aviat.",
      error: "Error en enviar. Si us plau, intenta-ho de nou.",
    },
    footer: { tagline: "Arquitectura Tècnica amb precisió i ànima. Barcelona.", rights: "Tots els drets reservats.", navLabel: "Navegació", contactLabel: "Contacte" },
    projectsPage: {
      eyebrow: "Portafoli", headline: "Els Nostres Projectes",
      sub: "Un portfolio d'obres que combinen precisió tècnica i rigor constructiu.",
      filters: { all: "Tots", obra_nueva: "Obra Nova", rehabilitacion: "Rehabilitació", viviendas: "Habitatges" },
    },
    projectDetail: {
      specTitle: "Fitxa Tècnica", specClient: "Client", specType: "Tipus", specStatus: "Estat",
      specArea: "Superfície", specYear: "Any", specLocation: "Ubicació",
      statusCompleted: "Completat", statusInProgress: "En execució",
      gallery: "Galeria", prev: "Anterior", next: "Següent", ctaProject: "Iniciar Projecte Similar",
    },
    aboutPage: {
      eyebrow: "Sobre Nosaltres", headline1: "Precisió arquitectònica", headline2: "al servei de l'ànima.",
      missionLabel: "Missió",
      mission: "A SOMHi creiem que l'excel·lència arquitectònica viu en la intersecció de la disciplina tècnica rigorosa i la profunda intenció estètica. Dissenyem espais que no només compleixen exigències estructurals, sinó que ressonen profundament amb l'experiència humana.",
      bioLabel: "L'Arquitecte", bioTitle: "Benito Villa", bioRole: "Arquitecte Tècnic · Fundador",
      bio1: "Amb més de deu anys navegant les complexitats de la construcció moderna, en Benito aporta tant una comprensió estructural impecable com una sensibilitat estètica cultivada. Va fundar SOMHi per tancar la bretxa entre disseny visionari i execució rigorosa.",
      bio2: "Membre del Col·legi d'Aparelladors, Arquitectes Tècnics i Enginyers d'Edificació de Barcelona (CAATEEB), en Benito supervisa cada projecte amb un compromís inquebrantable amb l'excel·lència.",
      valuesLabel: "Valors",
      values: [
        { icon: "△", title: "Precisió", desc: "Atenció meticulosa a cada especificació tècnica, assegurant que cada projecte s'executi amb màxima exactitud." },
        { icon: "◇", title: "Integritat", desc: "Processos transparents, terminis complerts i un compromís inquebrantable de mantenir els més alts estàndards." },
        { icon: "◎", title: "Innovació", desc: "Adoptant metodologies i tecnologies d'avantguarda que eleven l'estàndard del sector." },
      ],
    },
    contactPage: {
      headline1: "Construïm", headline2: "junts.",
      sub: "Consulta gratuïta per al teu projecte. Et responem en menys de 24h.",
      directLabel: "Contacte Directe", phoneHours: "Dll-Div, 9:00 - 18:00 CET", emailHours: "Resposta en menys de 24h",
      studioLabel: "Estudi", studioInfo: "Barcelona, Catalunya", studioNote: "Amb cita prèvia",
      fieldName: "Nom", fieldEmail: "Correu electrònic", fieldSubject: "Tipus de Projecte / Assumpte", fieldMessage: "Detalls del Projecte",
      send: "Enviar Consulta →", sending: "Enviant...",
      success: "✓ Missatge enviat. Et contactarem en menys de 24h.",
      error: "Error en enviar. Si us plau, intenta-ho de nou.",
    },
  },

  en: {
    nav: { home: "Home", projects: "Projects", about: "About", contact: "Contact", cta: "Get a Quote" },
    hero: {
      eyebrow: "Technical Architect — Barcelona",
      headline1: "Technical Architecture with",
      headline2: "Precision and Soul.",
      sub: "Building the future with meticulous attention to detail and unwavering structural integrity.",
      cta1: "Let's Build →", cta2: "Our Projects", scroll: "Scroll",
    },
    about: {
      eyebrow1: "01 // Design & Practice", eyebrow2: "ARCHITECT",
      name: "Benito Villa", role: "Technical Architect",
      bio1: "With a deep understanding of structural demands and the aesthetic aspirations of modern construction, Benito founded SOMHi to bridge the gap between innovative design and impeccable execution.",
      bio2: "Specialising in rigorous project management and uncompromising quality control, I oversee projects from conception to final delivery.",
      skills: ["Construction Execution Management", "Health & Safety Coordination", "Quality Control in Construction"],
      cta: "Read More →",
    },
    projects: { eyebrow: "Portfolio", title: "Selected Works", viewAll: "View All Projects →", comingSoon: "Projects coming soon" },
    contact: {
      headline1: "Let's start", headline2: "a project.",
      sub: "Ready to turn architectural concepts into structural reality? Contact us to discuss your project.",
      labelAbout: "CONTACT", labelPhone: "PHONE", labelEmail: "EMAIL", labelAddress: "STUDIO",
      address: "Barcelona, Spain",
      fieldName: "FULL NAME", fieldEmail: "EMAIL ADDRESS", fieldDetails: "PROJECT DETAILS",
      send: "SEND MESSAGE", sending: "Sending...",
      success: "✓ Message sent — we'll be in touch shortly.",
      error: "Error sending. Please try again.",
    },
    footer: { tagline: "Technical Architecture with precision and soul. Barcelona.", rights: "All rights reserved.", navLabel: "Navigation", contactLabel: "Contact" },
    projectsPage: {
      eyebrow: "Portfolio", headline: "Our Projects",
      sub: "A portfolio of works combining technical precision and constructive rigour.",
      filters: { all: "All", obra_nueva: "New Build", rehabilitacion: "Renovation", viviendas: "Residential" },
    },
    projectDetail: {
      specTitle: "Technical Sheet", specClient: "Client", specType: "Type", specStatus: "Status",
      specArea: "Area", specYear: "Year", specLocation: "Location",
      statusCompleted: "Completed", statusInProgress: "In Progress",
      gallery: "Gallery", prev: "Previous", next: "Next", ctaProject: "Start a Similar Project",
    },
    aboutPage: {
      eyebrow: "About Us", headline1: "Architectural precision", headline2: "at the service of the soul.",
      missionLabel: "Mission",
      mission: "At SOMHi we believe that architectural excellence lives at the intersection of rigorous technical discipline and deep aesthetic intention. We design spaces that not only meet structural demands, but resonate deeply with human experience.",
      bioLabel: "The Architect", bioTitle: "Benito Villa", bioRole: "Technical Architect · Founder",
      bio1: "With over ten years navigating the complexities of modern construction, Benito brings both impeccable structural understanding and a cultivated aesthetic sensibility. He founded SOMHi to close the gap between visionary design and rigorous execution.",
      bio2: "Member of the Col·legi d'Aparelladors, Arquitectes Tècnics i Enginyers d'Edificació de Barcelona (CAATEEB), Benito oversees every project with an unwavering commitment to excellence.",
      valuesLabel: "Values",
      values: [
        { icon: "△", title: "Precision", desc: "Meticulous attention to every technical specification, ensuring each project is executed with maximum accuracy." },
        { icon: "◇", title: "Integrity", desc: "Transparent processes, met deadlines and an unwavering commitment to maintaining the highest standards." },
        { icon: "◎", title: "Innovation", desc: "Embracing cutting-edge methodologies and technologies that raise the bar for the industry." },
      ],
    },
    contactPage: {
      headline1: "Let's build", headline2: "together.",
      sub: "Free consultation for your project. We respond in less than 24h.",
      directLabel: "Direct Contact", phoneHours: "Mon–Fri, 9:00 – 18:00 CET", emailHours: "Response within 24h",
      studioLabel: "Studio", studioInfo: "Barcelona, Spain", studioNote: "By appointment",
      fieldName: "Name", fieldEmail: "Email", fieldSubject: "Project Type / Subject", fieldMessage: "Project Details",
      send: "Send Enquiry →", sending: "Sending...",
      success: "✓ Message sent. We'll contact you within 24h.",
      error: "Error sending. Please try again.",
    },
  },

  fr: {
    nav: { home: "Accueil", projects: "Projets", about: "À propos", contact: "Contact", cta: "Demander un Devis" },
    hero: {
      eyebrow: "Architecte Technique — Barcelone",
      headline1: "Architecture Technique avec",
      headline2: "Précision et Âme.",
      sub: "Construire l'avenir avec une attention méticuleuse aux détails et une intégrité structurelle inébranlable.",
      cta1: "Commencer →", cta2: "Nos Projets", scroll: "Défiler",
    },
    about: {
      eyebrow1: "01 // Design & Cabinet", eyebrow2: "ARCHITECTE",
      name: "Benito Villa", role: "Architecte Technique",
      bio1: "Avec une compréhension approfondie des exigences structurelles et des aspirations esthétiques de la construction moderne, Benito a fondé SOMHi pour faire le lien entre la conception innovante et l'exécution impeccable.",
      bio2: "Spécialisé dans la gestion rigoureuse des chantiers et le contrôle qualité sans compromis, je supervise les projets de la conception à la livraison finale.",
      skills: ["Direction d'Exécution des Travaux", "Coordination Sécurité et Santé", "Contrôle Qualité en Construction"],
      cta: "En savoir plus →",
    },
    projects: { eyebrow: "Portfolio", title: "Travaux Sélectionnés", viewAll: "Voir Tous les Projets →", comingSoon: "Projets à venir" },
    contact: {
      headline1: "Commençons", headline2: "un projet.",
      sub: "Prêt à transformer vos concepts architecturaux en réalité structurelle ? Contactez-nous pour parler de votre projet.",
      labelAbout: "CONTACT", labelPhone: "TÉLÉPHONE", labelEmail: "EMAIL", labelAddress: "STUDIO",
      address: "Barcelone, Espagne",
      fieldName: "NOM COMPLET", fieldEmail: "ADRESSE EMAIL", fieldDetails: "DÉTAILS DU PROJET",
      send: "ENVOYER LE MESSAGE", sending: "Envoi en cours...",
      success: "✓ Message envoyé — nous vous contacterons sous peu.",
      error: "Erreur d'envoi. Veuillez réessayer.",
    },
    footer: { tagline: "Architecture Technique avec précision et âme. Barcelone.", rights: "Tous droits réservés.", navLabel: "Navigation", contactLabel: "Contact" },
    projectsPage: {
      eyebrow: "Portfolio", headline: "Nos Projets",
      sub: "Un portfolio d'œuvres alliant précision technique et rigueur constructive.",
      filters: { all: "Tous", obra_nueva: "Construction Neuve", rehabilitacion: "Réhabilitation", viviendas: "Résidentiel" },
    },
    projectDetail: {
      specTitle: "Fiche Technique", specClient: "Client", specType: "Type", specStatus: "Statut",
      specArea: "Surface", specYear: "Année", specLocation: "Localisation",
      statusCompleted: "Terminé", statusInProgress: "En cours",
      gallery: "Galerie", prev: "Précédent", next: "Suivant", ctaProject: "Démarrer un Projet Similaire",
    },
    aboutPage: {
      eyebrow: "À propos", headline1: "Précision architecturale", headline2: "au service de l'âme.",
      missionLabel: "Mission",
      mission: "Chez SOMHi, nous croyons que l'excellence architecturale réside à l'intersection d'une discipline technique rigoureuse et d'une intention esthétique profonde. Nous concevons des espaces qui non seulement répondent aux exigences structurelles, mais résonnent profondément avec l'expérience humaine.",
      bioLabel: "L'Architecte", bioTitle: "Benito Villa", bioRole: "Architecte Technique · Fondateur",
      bio1: "Fort de plus de dix ans à naviguer dans les complexités de la construction moderne, Benito apporte à la fois une compréhension structurelle impeccable et une sensibilité esthétique cultivée. Il a fondé SOMHi pour combler le fossé entre la conception visionnaire et l'exécution rigoureuse.",
      bio2: "Membre du Col·legi d'Aparelladors, Arquitectes Tècnics i Enginyers d'Edificació de Barcelona (CAATEEB), Benito supervise chaque projet avec un engagement indéfectible envers l'excellence.",
      valuesLabel: "Valeurs",
      values: [
        { icon: "△", title: "Précision", desc: "Attention méticuleuse à chaque spécification technique, assurant que chaque projet soit exécuté avec une exactitude maximale." },
        { icon: "◇", title: "Intégrité", desc: "Processus transparents, délais respectés et engagement indéfectible à maintenir les plus hauts standards." },
        { icon: "◎", title: "Innovation", desc: "Adopter des méthodologies et technologies de pointe qui élèvent les standards du secteur." },
      ],
    },
    contactPage: {
      headline1: "Construisons", headline2: "ensemble.",
      sub: "Consultation gratuite pour votre projet. Nous répondons en moins de 24h.",
      directLabel: "Contact Direct", phoneHours: "Lun–Ven, 9h00 – 18h00 CET", emailHours: "Réponse sous 24h",
      studioLabel: "Studio", studioInfo: "Barcelone, Espagne", studioNote: "Sur rendez-vous",
      fieldName: "Nom", fieldEmail: "Email", fieldSubject: "Type de Projet / Objet", fieldMessage: "Détails du Projet",
      send: "Envoyer →", sending: "Envoi...",
      success: "✓ Message envoyé. Nous vous contacterons sous 24h.",
      error: "Erreur d'envoi. Veuillez réessayer.",
    },
  },
} as const;

export type Translations = typeof translations.es;
export function t(lang: Lang): Translations {
  return translations[lang] as unknown as Translations;
}
