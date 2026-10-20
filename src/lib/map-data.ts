import { categories } from "@/lib/peace-data";
import { schoolsData } from "@/lib/schools-data";

export interface MapExperience {
  id: string;
  numericId: number;
  name: string;
  school: string;
  category: (typeof categories)[number];
  city: string;
  department: string;
  legalNature: 'Pública' | 'Privada';
  lat: number;
  lng: number;
  summary: string;
  detail: string;
  rector: string;
  tutor: string;
  spokespersons: string;
  institutionalEmail: string;
  isDemo: true;
}

export const DEMO_MAP_NOTICE =
  "Mapa de experiencias: 21 iniciativas escolares georreferenciadas en Nariño, Bolívar, Bogotá, Atlántico, La Guajira, Cauca, Cundinamarca y Sucre.";

export const mapExperiences: MapExperience[] = schoolsData.map((s) => ({
  id: `exp-${s.id}`,
  numericId: s.id,
  name: s.name,
  school: s.school,
  category: s.category as (typeof categories)[number],
  city: s.city,
  department: s.department,
  legalNature: s.legalNature,
  lat: s.lat,
  lng: s.lng,
  summary: s.description,
  detail: `${s.school} (${s.legalNature}) · ${s.city}, ${s.department}. Experiencia: ${s.name}. Rectoría: ${s.rectors.map((r) => r.name).join(", ")}. Tutor docente: ${s.tutors.map((t) => t.name).join(", ")}.`,
  rector: s.rectors.map((r) => `${r.name}${r.phone ? ` (${r.phone})` : ""}`).join(", "),
  tutor: s.tutors.map((t) => `${t.name}${t.phone ? ` (${t.phone})` : ""}${t.email ? ` [${t.email}]` : ""}`).join(", "),
  spokespersons: [
    ...s.primarySpokespersons.map((p) => `${p.name} (Principal)`),
    ...s.alternateSpokespersons.map((a) => `${a.name} (Suplente)`),
  ].join(", "),
  institutionalEmail: s.institutionalEmail,
  isDemo: true,
}));

export type MapRegionKey = "Caribe" | "Pacífico" | "Andina" | "Orinoquía" | "Amazonía";

export interface MapRegion {
  key: MapRegionKey;
  lat: number;
  lng: number;
}

/**
 * Macro-regiones naturales de Colombia
 */
export const mapRegions: MapRegion[] = [
  { key: "Caribe", lat: 10.1, lng: -74.4 },
  { key: "Pacífico", lat: 3.5, lng: -77.2 },
  { key: "Andina", lat: 5.4, lng: -74.5 },
  { key: "Orinoquía", lat: 4.4, lng: -71.2 },
  { key: "Amazonía", lat: -1.4, lng: -73.3 },
];

/** Asignación de departamentos a su región natural */
const DEPARTMENT_REGION: Record<string, MapRegionKey> = {
  Cundinamarca: "Andina",
  Bogotá: "Andina",
  "Bogotá D.C.": "Andina",
  Antioquia: "Andina",
  Santander: "Andina",
  Huila: "Andina",
  "Norte de Santander": "Andina",
  "Valle del Cauca": "Pacífico",
  Nariño: "Pacífico",
  Chocó: "Pacífico",
  Cauca: "Pacífico",
  Atlántico: "Caribe",
  Bolívar: "Caribe",
  Magdalena: "Caribe",
  "La Guajira": "Caribe",
  Córdoba: "Caribe",
  Sucre: "Caribe",
  Meta: "Orinoquía",
  Caquetá: "Amazonía",
  Amazonas: "Amazonía",
};

export const regionOf = (experience: MapExperience): MapRegionKey =>
  DEPARTMENT_REGION[experience.department] ?? "Andina";

export const mapCategoryColor = (category: (typeof categories)[number]) => {
  const idx = categories.indexOf(category);
  return idx >= 0 ? idx : 0;
};
