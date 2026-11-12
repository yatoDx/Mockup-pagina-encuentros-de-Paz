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
  legalNature: "Pública" | "Privada";
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
  tutor: s.tutors
    .map((t) => `${t.name}${t.phone ? ` (${t.phone})` : ""}${t.email ? ` [${t.email}]` : ""}`)
    .join(", "),
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

/** Asignación de los 32 departamentos continentales a su región natural */
const DEPARTMENT_REGION: Record<string, MapRegionKey> = {
  // Andina
  Antioquia: "Andina",
  Bogotá: "Andina",
  "Bogotá D.C.": "Andina",
  Boyacá: "Andina",
  Caldas: "Andina",
  Cundinamarca: "Andina",
  Huila: "Andina",
  "Norte de Santander": "Andina",
  Quindío: "Andina",
  Risaralda: "Andina",
  Santander: "Andina",
  Tolima: "Andina",
  // Caribe
  Atlántico: "Caribe",
  Bolívar: "Caribe",
  Cesar: "Caribe",
  Córdoba: "Caribe",
  "La Guajira": "Caribe",
  Magdalena: "Caribe",
  Sucre: "Caribe",
  // Pacífico
  Cauca: "Pacífico",
  Chocó: "Pacífico",
  Nariño: "Pacífico",
  "Valle del Cauca": "Pacífico",
  // Orinoquía
  Arauca: "Orinoquía",
  Casanare: "Orinoquía",
  Meta: "Orinoquía",
  Vichada: "Orinoquía",
  // Amazonía
  Amazonas: "Amazonía",
  Caquetá: "Amazonía",
  Guainía: "Amazonía",
  Guaviare: "Amazonía",
  Putumayo: "Amazonía",
  Vaupés: "Amazonía",
};

/**
 * Colores suaves por región natural. Se usan para teñir los departamentos
 * del mapa sin romper la paleta institucional (verdes, tierras y azules).
 */
export const REGION_COLORS: Record<MapRegionKey, string> = {
  Caribe: "oklch(0.85 0.11 78)",
  Pacífico: "oklch(0.82 0.09 225)",
  Andina: "oklch(0.84 0.11 150)",
  Orinoquía: "oklch(0.87 0.12 108)",
  Amazonía: "oklch(0.79 0.12 168)",
};

export const regionOf = (experience: MapExperience): MapRegionKey =>
  DEPARTMENT_REGION[experience.department] ?? "Andina";

/** Región natural de un departamento por su nombre (usado por el mapa). */
export const regionOfDepartment = (department: string): MapRegionKey =>
  DEPARTMENT_REGION[department] ?? "Andina";

export const mapCategoryColor = (category: (typeof categories)[number]) => {
  const idx = categories.indexOf(category);
  return idx >= 0 ? idx : 0;
};

export const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  "Círculos de la palabra": "Diálogo, escucha activa y acuerdos comunitarios en el aula.",
  "Jueces de paz": "Estudiantes mediadores formados en conciliación y justicia restaurativa.",
  "Teatro y sociodrama":
    "Expresión escénica y juegos de rol para la empatía y la resolución de conflictos.",
  "Semilleros de investigación": "Indagación crítica sobre realidades y memorias territoriales.",
  "Clínicas de las emociones": "Acompañamiento socioemocional y tramitación pacífica del sentir.",
  "Museos de la memoria": "Archivos escolares y relatos vivos comunitarios para la no repetición.",
};

export const normalizeSearchText = (text: string): string =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

export const matchesExperienceSearch = (experience: MapExperience, query: string): boolean => {
  if (!query) return true;
  const q = normalizeSearchText(query);
  const target = normalizeSearchText(
    `${experience.name} ${experience.school} ${experience.city} ${experience.department} ${experience.category} ${experience.legalNature} ${experience.rector} ${experience.tutor} ${experience.spokespersons} ${regionOf(experience)} ${experience.summary}`,
  );
  return target.includes(q);
};
