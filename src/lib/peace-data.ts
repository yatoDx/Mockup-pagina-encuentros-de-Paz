import { schoolsData, type SchoolRecord } from './schools-data';

export const projectStats = { experiences: 21, schools: 20 };

export const categories = [
  'Círculos de la palabra',
  'Jueces de paz',
  'Teatro y sociodrama',
  'Semilleros de investigación',
  'Clínicas de las emociones',
  'Museos de la memoria'
] as const;

export type Category = (typeof categories)[number];

export const experiences = schoolsData.map((s) => ({
  id: s.id,
  category: s.category as Category,
  name: s.name,
  description: s.description,
  school: s.school,
  city: s.city,
  department: s.department,
  legalNature: s.legalNature,
  rectors: s.rectors,
  primarySpokespersons: s.primarySpokespersons,
  alternateSpokespersons: s.alternateSpokespersons,
  tutors: s.tutors,
  institutionalEmail: s.institutionalEmail,
  lat: s.lat,
  lng: s.lng,
}));

export type Experience = (typeof experiences)[number];

export const bookChapters = [
  {
    title: 'De las aulas para el mundo',
    label: 'Presentación',
    paragraphs: [
      'La paz escolar se construye en lo cotidiano: en una conversación, en la escucha y en los acuerdos que hacemos para convivir.',
      'Este libro virtual reúne la propuesta de sistematización de 21 experiencias de 20 colegios e instituciones participantes. Una memoria colectiva para reconocer los saberes de quienes construyen paz desde las aulas.'
    ],
    items: ['Experiencias y metodologías', 'Voces de estudiantes y docentes', 'Memoria de los encuentros']
  },
  {
    title: 'Muchas formas de construir paz',
    label: '01 · Metodologías',
    paragraphs: [
      'Cada escuela encuentra sus propios caminos para transformar los conflictos. El catálogo organiza las experiencias por sus metodologías pedagógicas.'
    ],
    items: [...categories]
  },
  {
    title: 'La historia de cada experiencia',
    label: '02 · Sistematización',
    paragraphs: [
      'La unidad de registro es la experiencia viva de cada comunidad educativa. Cada ficha permite reconocer su trayectoria, sus protagonistas y su aporte a la convivencia pacífica.'
    ],
    items: [
      'Institución y carácter público o privado',
      'Nombre de la experiencia y metodología',
      'Territorio, municipio y departamento',
      'Rectoría, tutores docentes y gestores',
      'Voceros estudiantiles principales y suplentes',
      'Articulación comunitaria y contactos'
    ]
  },
  {
    title: 'El estudiante como protagonista',
    label: '03 · Participación',
    paragraphs: [
      'El registro de cada experiencia reconoce la participación protagónica de estudiantes voceros y mediadores, docentes tutores y directivos.',
      'La sustentabilidad del proceso contempla la capacidad de los estudiantes para gestionar espacios de diálogo y resolver problemas con autonomía.'
    ],
    items: ['Liderazgo estudiantil', 'Mediación y mesas de diálogo', 'Continuidad del proceso']
  },
  {
    title: 'Memorias que siguen creciendo',
    label: '04 · Archivo',
    paragraphs: [
      'Los encuentros de 2025 y 2026 tienen un lugar en este archivo: fotografías, piezas gráficas, testimonios y registros de las experiencias de paz en Colombia.',
      'Esta recopilación incorpora las instituciones participantes de Bolívar, Nariño, Atlántico, La Guajira, Cauca, Cundinamarca, Sucre y Bogotá.'
    ],
    items: [
      'Encuentro 2025 · Memoria y antecedentes',
      'II Encuentro 2026 · Sistematización activa',
      'Directorio institucional y red nacional'
    ]
  }
];
