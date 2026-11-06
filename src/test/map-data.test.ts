import { describe, it, expect } from "vitest";
import { mapExperiences, mapRegions, regionOf, mapCategoryColor } from "@/lib/map-data";
import { categories } from "@/lib/peace-data";

const COLOMBIA_BOUNDS = { minLat: -4.3, maxLat: 13.5, minLng: -82, maxLng: -66 };

describe("Puntos de demostración del mapa", () => {
  it("incluye las 21 experiencias georreferenciadas", () => {
    expect(mapExperiences.length).toBe(21);
  });

  it("marca todos los registros como demostración", () => {
    expect(mapExperiences.every((point) => point.isDemo === true)).toBe(true);
  });

  it("usa coordenadas dentro del territorio colombiano", () => {
    mapExperiences.forEach((point) => {
      expect(point.lat).toBeGreaterThanOrEqual(COLOMBIA_BOUNDS.minLat);
      expect(point.lat).toBeLessThanOrEqual(COLOMBIA_BOUNDS.maxLat);
      expect(point.lng).toBeGreaterThanOrEqual(COLOMBIA_BOUNDS.minLng);
      expect(point.lng).toBeLessThanOrEqual(COLOMBIA_BOUNDS.maxLng);
    });
  });

  it("identifica cada punto con un id único", () => {
    const ids = new Set(mapExperiences.map((point) => point.id));
    expect(ids.size).toBe(mapExperiences.length);
  });

  it("asigna categorías existentes y colores válidos", () => {
    mapExperiences.forEach((point) => {
      expect(categories).toContain(point.category);
      const color = mapCategoryColor(point.category);
      expect(color).toBeGreaterThanOrEqual(0);
      expect(color).toBeLessThan(categories.length);
    });
  });
});

describe("Regiones naturales del mapa", () => {
  it("define las cinco macro-regiones con claves únicas", () => {
    const keys = mapRegions.map((region) => region.key);
    expect(keys).toHaveLength(5);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it("ubica los rótulos dentro del territorio colombiano", () => {
    mapRegions.forEach((region) => {
      expect(region.lat).toBeGreaterThanOrEqual(COLOMBIA_BOUNDS.minLat);
      expect(region.lat).toBeLessThanOrEqual(COLOMBIA_BOUNDS.maxLat);
      expect(region.lng).toBeGreaterThanOrEqual(COLOMBIA_BOUNDS.minLng);
      expect(region.lng).toBeLessThanOrEqual(COLOMBIA_BOUNDS.maxLng);
    });
  });

  it("asigna cada experiencia a una región existente", () => {
    const keys = new Set(mapRegions.map((region) => region.key));
    mapExperiences.forEach((point) => {
      expect(keys.has(regionOf(point))).toBe(true);
    });
  });
});

describe("Fase 2: Buscador, filtros y leyenda", () => {
  it("normaliza texto ignorando acentos y mayúsculas", async () => {
    const { normalizeSearchText } = await import("@/lib/map-data");
    expect(normalizeSearchText("Bogotá")).toBe("bogota");
    expect(normalizeSearchText("Nariño")).toBe("narino");
    expect(normalizeSearchText("CÍRCULOS")).toBe("circulos");
  });

  it("permite buscar experiencias por colegio, ciudad, tutor o metodología", async () => {
    const { matchesExperienceSearch } = await import("@/lib/map-data");
    const exp = mapExperiences[0];
    expect(matchesExperienceSearch(exp, exp.school.slice(0, 6))).toBe(true);
    expect(matchesExperienceSearch(exp, exp.city)).toBe(true);
    expect(matchesExperienceSearch(exp, exp.category)).toBe(true);
    expect(matchesExperienceSearch(exp, "termino_inexistente_xyz_123")).toBe(false);
  });

  it("define descripciones para cada una de las 6 metodologías", async () => {
    const { CATEGORY_DESCRIPTIONS } = await import("@/lib/map-data");
    categories.forEach((cat) => {
      expect(CATEGORY_DESCRIPTIONS[cat]).toBeDefined();
      expect(typeof CATEGORY_DESCRIPTIONS[cat]).toBe("string");
      expect(CATEGORY_DESCRIPTIONS[cat].length).toBeGreaterThan(10);
    });
  });
});
