import type { Metadata } from "next";
import ContactPageContent from "@/components/ContactPageContent";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contacta con SOMHi Arquitectura Técnica. Benito Villa, arquitecto técnico en Barcelona. Consulta gratuita para tu proyecto.",
};

export default function ContactoPage() {
  return <ContactPageContent />;
}
