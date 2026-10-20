export interface PersonContact {
  name: string;
  phone?: string;
  email?: string;
  role?: string;
}

export interface SchoolRecord {
  id: number;
  school: string;
  name: string;
  description: string;
  category: string;
  department: string;
  city: string;
  legalNature: 'Pública' | 'Privada';
  rectors: PersonContact[];
  primarySpokespersons: PersonContact[];
  alternateSpokespersons: PersonContact[];
  tutors: PersonContact[];
  institutionalEmail: string;
  lat: number;
  lng: number;
}

export const schoolsData: SchoolRecord[] = [
  {
    id: 1,
    school: "Institución Educativa Policarpa Salavarrieta",
    name: 'Tejiendo la memoria de nuestro pueblo para no olvidarla · Museo escolar "Recuerdos de mi Wayco"',
    description: "Museo escolar de la memoria comunitaria para recuperar los saberes, relatos y memorias locales como camino hacia el perdón y la no repetición.",
    category: "Museos de la memoria",
    department: "Nariño",
    city: "Samaniego",
    legalNature: "Pública",
    rectors: [{ name: "Hermana Nilda María Medina", phone: "3218175590" }],
    primarySpokespersons: [
      { name: "Anyela Caicedo", phone: "3147965268" },
      { name: "Milena Melo", phone: "3174437769" }
    ],
    alternateSpokespersons: [{ name: "Jean Carlos Vargas", phone: "3137335188" }],
    tutors: [{ name: "Marta Cecilia Andrade", phone: "3137335188", email: "maceana@hotmail.com" }],
    institutionalEmail: "iepsalavarrieta@hotmail.com",
    lat: 1.3364,
    lng: -77.5956
  },
  {
    id: 2,
    school: "Colegio Cooperativo de Timiza",
    name: "Liderazgo, Convivencia y Mediación Escolar Timiza",
    description: "Proceso formativo de liderazgo estudiantil y convivencia armónica para la formación de jóvenes gestores de cambio y resolución pacífica de conflictos.",
    category: "Círculos de la palabra",
    department: "Bogotá",
    city: "Bogotá (Kennedy / Timiza)",
    legalNature: "Privada",
    rectors: [{ name: "Javier Puentes", phone: "3108086450" }],
    primarySpokespersons: [
      { name: "Alisson Nickole Forero", phone: "3122452769" },
      { name: "Andrea Camila Puentes", phone: "3122452769" }
    ],
    alternateSpokespersons: [{ name: "Salomé Lozano", phone: "3134417656" }],
    tutors: [{ name: "Mabel Zulena Rojas Garzón", phone: "3125579377" }],
    institutionalEmail: "3125579377",
    lat: 4.6095,
    lng: -74.1582
  },
  {
    id: 3,
    school: "Institución Educativa Helion Pinedo Ríos",
    name: "Macondo Escolar: Gestores de Paz y Convivencia",
    description: "Tejiendo entornos de inclusión y respeto por medio de la autodeterminación y la lúdica como espacios para la construcción de tejido social y convivencia intercultural.",
    category: "Jueces de paz",
    department: "La Guajira",
    city: "Riohacha",
    legalNature: "Pública",
    rectors: [{ name: "Edalis María Rojas Atencio", phone: "3192240555" }],
    primarySpokespersons: [
      { name: "Wilson de Jesús Aguilar Uriana", phone: "3104549259" },
      { name: "Danna Margarita Iguarán Ortega", phone: "3145454738" }
    ],
    alternateSpokespersons: [{ name: "Nataly Pérez Chávez", phone: "3014511007" }],
    tutors: [{ name: "Wilson Núñez", phone: "3192240555", email: "wcnunezc@unal.edu.co" }],
    institutionalEmail: "hepirios@hotmail.com",
    lat: 11.5444,
    lng: -72.9070
  },
  {
    id: 4,
    school: "Institución Educativa Técnica Agrícola de San Jacinto",
    name: "Tejiendo Paz, Emociones y Cuidado del Territorio",
    description: "Gestión socioemocional mediante el cuidado y conservación del medio ambiente en el territorio de los Montes de María.",
    category: "Clínicas de las emociones",
    department: "Bolívar",
    city: "San Jacinto",
    legalNature: "Pública",
    rectors: [{ name: "Néstor Fernando Carrillo Martínez", phone: "3116630486" }],
    primarySpokespersons: [
      { name: "Abigail Guete Melendres", phone: "3044817175" },
      { name: "Carmen Gisel Vásquez Arrieta", phone: "3044817175" }
    ],
    alternateSpokespersons: [{ name: "Luisa Ana Mercado Miranda", phone: "3188682929" }],
    tutors: [
      { name: "Claudia Patricia Mendoza Castro", phone: "3012854186", email: "geraldineserranomendoza@gmail.com" },
      { name: "Miguel García", phone: "3012854186" }
    ],
    institutionalEmail: "ietadesanjacinto@sedbolivar.gov.co",
    lat: 9.8267,
    lng: -75.1219
  },
  {
    id: 5,
    school: "Defensoras Étnicas",
    name: "Defensoras Étnicas: Liderazgo y Equidad Cultural",
    description: "Proceso organizativo de lideresas y jóvenes que promueven la equidad étnica, los derechos humanos y el diálogo intercultural en las escuelas.",
    category: "Círculos de la palabra",
    department: "Bogotá",
    city: "Bogotá",
    legalNature: "Pública",
    rectors: [{ name: "Nubia Esther Gallo Cornejo", phone: "3102977326" }],
    primarySpokespersons: [
      { name: "Nubia Esther Gallo Cornejo", phone: "3102977326" },
      { name: "José Alejandro Gallo Cornejo", phone: "3102977326" }
    ],
    alternateSpokespersons: [{ name: "José Alejandro Gallo Cornejo", phone: "3102595382" }],
    tutors: [{ name: "Nubia Esther Gallo Cornejo", phone: "3102977326", email: "nb217734@gmail.com" }],
    institutionalEmail: "nb217734@gmail.com",
    lat: 4.6350,
    lng: -74.0950
  },
  {
    id: 6,
    school: "I.E.M. María De Nazareth",
    name: "Festival de la Cometa Nazareno: Volando Valores",
    description: "Volando valores, construyendo paz y transformando convivencias a través del arte tradicional y el encuentro intergeneracional.",
    category: "Teatro y sociodrama",
    department: "Nariño",
    city: "Pasto (Buesaquillo)",
    legalNature: "Pública",
    rectors: [{ name: "Clara Patricia Dallos", phone: "3128711362" }],
    primarySpokespersons: [
      { name: "Esteban Tomás Rodríguez Malua", phone: "3103997465" },
      { name: "Luis Alejandro Medina Ramírez", phone: "3235654614" }
    ],
    alternateSpokespersons: [{ name: "Valeria Melissa Vásquez Morán", phone: "3004088137" }],
    tutors: [{ name: "Cielo Villota Martínez", phone: "3013433237", email: "civmaiemnz.7@gmail.com" }],
    institutionalEmail: "nazarethmaria2018@gmail.com",
    lat: 1.2136,
    lng: -77.2511
  },
  {
    id: 7,
    school: "Colegio El Salitre de Suba",
    name: "Palabreros Putchipuu: Mediación y Resolución de Conflictos",
    description: "Apropiación de la ancestral figura del palabrero como herramienta pedagógica de mediación dialogada para la solución de conflictos escolares.",
    category: "Círculos de la palabra",
    department: "Bogotá",
    city: "Bogotá (Suba)",
    legalNature: "Pública",
    rectors: [{ name: "Luz Omaira Sánchez", phone: "3016225516" }],
    primarySpokespersons: [
      { name: "Daniel Vega", phone: "3045800123" },
      { name: "Esteban Díaz López", phone: "3045800123" }
    ],
    alternateSpokespersons: [{ name: "Sebastián Díaz", phone: "3013308854" }],
    tutors: [{ name: "Margarita Rosa Alvarado Sánchez", phone: "3013308854", email: "margaal2011@yahoo.es" }],
    institutionalEmail: "Cedeelsalitre11desuba@redp.edu.co",
    lat: 4.7450,
    lng: -74.0880
  },
  {
    id: 8,
    school: "I.E.D. del Barrio Simón Bolívar",
    name: "Ruta Macondo 2.0: Generación de Paz",
    description: "Iniciativa pedagógica que rescata el legado cultural de García Márquez para fortalecer la lectura crítica, la narrativa local y la convivencia escolar.",
    category: "Semilleros de investigación",
    department: "Atlántico",
    city: "Barranquilla",
    legalNature: "Pública",
    rectors: [{ name: "Óscar Manuel Barrios Díaz", phone: "3013334424" }],
    primarySpokespersons: [
      { name: "Nilmar Antonio Arias Barraza", phone: "3019786331" },
      { name: "Pamela Vásquez Peroza", phone: "3044259452" }
    ],
    alternateSpokespersons: [{ name: "Santiago de Jesús Altamar de la Hoz", phone: "3244415274" }],
    tutors: [{ name: "Harley Fernández Díaz", phone: "3145296816", email: "profesor_harley@hotmail.com" }],
    institutionalEmail: "profesor_harley@hotmail.com",
    lat: 10.9450,
    lng: -74.7750
  },
  {
    id: 9,
    school: "Colegio Juan Luis Londoño IED La Salle",
    name: "Acuáticas Restaurativas: Un Sonido Lasallista por la Paz",
    description: "Prácticas restaurativas, expresión corporal y ambientes sonoros y reflexivos que transforman las relaciones y fortalecen los lazos fraternos.",
    category: "Clínicas de las emociones",
    department: "Bogotá",
    city: "Bogotá (Ciudad Bolívar)",
    legalNature: "Pública",
    rectors: [{ name: "Isabel Sofía Molina", phone: "3108794499" }],
    primarySpokespersons: [
      { name: "Natalia Hernández", phone: "3108794499" },
      { name: "Yuranni García", phone: "3108794499" }
    ],
    alternateSpokespersons: [{ name: "Mariana Carrillo", phone: "3108794499" }],
    tutors: [{ name: "Angie Katherin Guerra", phone: "3108794499", email: "akguerraj@lasallejuanlulo.edu.co" }],
    institutionalEmail: "akguerraj@lasallejuanlulo.edu.co",
    lat: 4.5620,
    lng: -74.1520
  },
  {
    id: 10,
    school: "San Francisco IED",
    name: "Semillero Cultivando Paz",
    description: "Semillero escolar participativo en el que los estudiantes investigan y aplican estrategias dialógicas para sembrar acuerdos y transformar su entorno.",
    category: "Semilleros de investigación",
    department: "Bogotá",
    city: "Bogotá (Ciudad Bolívar)",
    legalNature: "Pública",
    rectors: [{ name: "César López Malagón", phone: "3105609126" }],
    primarySpokespersons: [
      { name: "Nicol Dayana Rodríguez", phone: "3144806027" },
      { name: "Sharon Torres", phone: "3133654142" }
    ],
    alternateSpokespersons: [{ name: "Andrés Palacio", phone: "3229362600" }],
    tutors: [
      { name: "David Camilo Moreno Foglia", phone: "3118812677", email: "camilomorenofoglia@gmail.com" },
      { name: "Natalia Helena Álvarez", phone: "3106894821" }
    ],
    institutionalEmail: "Coldisanfrancisco19@educacionbogota.edu.co",
    lat: 4.5780,
    lng: -74.1610
  },
  {
    id: 11,
    school: "I.E. Pío XII de San Jacinto",
    name: "La Escuela como Territorio de Paz: Prácticas Restaurativas",
    description: "Mirada pedagógica desde las prácticas restaurativas y el diálogo asertivo para consolidar la escuela como espacio protector de los Montes de María.",
    category: "Jueces de paz",
    department: "Bolívar",
    city: "San Jacinto",
    legalNature: "Pública",
    rectors: [{ name: "Orlando Rafael De Oro Avendaño", phone: "3014604941" }],
    primarySpokespersons: [
      { name: "Briana Cerpa De Ávila", phone: "3004762509" },
      { name: "Edgar Andrés Sierra Orozco", phone: "3162456095" }
    ],
    alternateSpokespersons: [{ name: "Danna Cerpa de Ávila", phone: "3004762509" }],
    tutors: [{ name: "Yulis Calderón Mercado", phone: "3216609680", email: "yuliroca123@hotmail.com" }],
    institutionalEmail: "deoropuro2@hotmail.com",
    lat: 9.8320,
    lng: -75.1180
  },
  {
    id: 12,
    school: "Institución Educativa Distrital Universal",
    name: "Sembrando Paz: Investigación, Lectura e Interculturalidad",
    description: "Articulación de la lectura comunitaria, la indagación escolar y el respeto por la diversidad cultural como pilares de convivencia en el aula.",
    category: "Semilleros de investigación",
    department: "Atlántico",
    city: "Barranquilla",
    legalNature: "Pública",
    rectors: [{ name: "José Vicente Martínez Pérez", phone: "3003687863" }],
    primarySpokespersons: [
      { name: "Nahomy Díaz" },
      { name: "Jhon Cassiani" }
    ],
    alternateSpokespersons: [{ name: "Abraham Salvat", phone: "3015357866" }],
    tutors: [{ name: "Elvira Arciniegas Severiche", phone: "3015357866", email: "elvirarciseve73@gmail.com" }],
    institutionalEmail: "elvirarciseve73@gmail.com",
    lat: 10.9650,
    lng: -74.8050
  },
  {
    id: 13,
    school: "Institución Educativa Técnica Agropecuaria Erasmo Donado Llanos",
    name: "Prácticas Restaurativas: Memoria y Política Pública",
    description: "Construcción de memoria histórica colectiva y fomento de políticas institucionales de paz en la subregión de los Montes de María.",
    category: "Museos de la memoria",
    department: "Bolívar",
    city: "Zambrano",
    legalNature: "Pública",
    rectors: [{ name: "Roberto Salas Mendoza", phone: "3053338537" }],
    primarySpokespersons: [
      { name: "Julio Miranda Álvarez", phone: "3243041150" },
      { name: "Lorena Isabel Álvarez Pérez", phone: "3005090117" }
    ],
    alternateSpokespersons: [{ name: "Valeria Gómez Zuluaga", phone: "3232430106" }],
    tutors: [{ name: "Wilson Rafael Cabeza Arroyo", phone: "3016274167", email: "wilsoncabezausb.cartagena@gmail.com" }],
    institutionalEmail: "anibal1023@gmail.com",
    lat: 9.7797,
    lng: -74.8197
  },
  {
    id: 14,
    school: "Corporación Mujer, Niñez y Juventud",
    name: "Escuela de Liderazgo Afrocampesino Infantil",
    description: "Proceso formativo en liderazgo, identidad afrocolombiana y derechos comunitarios con niños y niñas de 8 a 12 años del norte del Cauca.",
    category: "Círculos de la palabra",
    department: "Cauca",
    city: "Santander de Quilichao",
    legalNature: "Privada",
    rectors: [{ name: "Sandra Patricia Mina Peña", phone: "3207952596" }],
    primarySpokespersons: [
      { name: "Jezzer Andrés Zapata Romero", phone: "3106388273" },
      { name: "Sandra Patricia Mina Peña", phone: "3106388273" }
    ],
    alternateSpokespersons: [{ name: "Sandra Patricia Mina Peña", phone: "3105388273" }],
    tutors: [{ name: "Jezzer Andrés Zapata Romero", phone: "3105388273", email: "corporación.mnjn@yahoo.com" }],
    institutionalEmail: "rjuntanzaancestral@gmail.com",
    lat: 3.0094,
    lng: -76.4849
  },
  {
    id: 15,
    school: "Institución Educativa Roberto Velandia",
    name: "Ciudadanía Robertista: Cultura Democrática y Convivencia",
    description: "Formación de competencias ciudadanas, mediación escolar y fomento de pactos de aula construidos de manera participativa.",
    category: "Círculos de la palabra",
    department: "Cundinamarca",
    city: "Mosquera",
    legalNature: "Pública",
    rectors: [{ name: "Luz Mery Organista González", phone: "3108808001" }],
    primarySpokespersons: [
      { name: "Luisa Fernanda Rotta Guillén", phone: "3118735723" },
      { name: "Sergio Alejandro Torres Fandiño", phone: "3183031405" }
    ],
    alternateSpokespersons: [{ name: "Ashley Martínez Barrera", phone: "3203315347" }],
    tutors: [{ name: "Yury Andrea Rodríguez Castillo", phone: "3502594781", email: "anhalans@gmail.com" }],
    institutionalEmail: "iedrobertovelandia@gmail.com",
    lat: 4.7059,
    lng: -74.2302
  },
  {
    id: 16,
    school: "Institución Educativa Santiago Apóstol",
    name: "Estrategias Pedagógicas: Formación de Gestores de Paz",
    description: "Capacitación y consolidación de un equipo estudiantil de gestores de paz para la resolución no violenta de conflictos en la comunidad educativa sucreña.",
    category: "Jueces de paz",
    department: "Sucre",
    city: "San Benito Abad (Santiago Apóstol)",
    legalNature: "Pública",
    rectors: [{ name: "Nicolás Anselmo Mejía Díaz", phone: "3052468581" }],
    primarySpokespersons: [
      { name: "Abraham Salas Rohenes", phone: "3143929279" },
      { name: "Gabys Yorelis Domínguez Requena", phone: "3145719384" }
    ],
    alternateSpokespersons: [{ name: "Rodny López Tovio", phone: "3224974726" }],
    tutors: [{ name: "Sandra Lucía Núñez Yépez", phone: "3143929279", email: "sandraluciayepez@gmail.com" }],
    institutionalEmail: "ie.santiagoapostol@sucre.edu.co",
    lat: 8.9304,
    lng: -75.0261
  },
  {
    id: 17,
    school: "I.E. Alberto Elías Fernández Baena y Fundación CIMAS Futuro",
    name: "Fuerzas En Sinapsis: Neuroarquitectos y Gestores de Paz",
    description: "Aplicación de herramientas de neuroeducación y gestión emocional para modelar entornos de aprendizaje pacíficos y constructivos.",
    category: "Jueces de paz",
    department: "Bolívar",
    city: "Cartagena de Indias D.T. y C.",
    legalNature: "Pública",
    rectors: [
      { name: "Alberto Rentería Mena (I.E. Fernández Baena)", phone: "3135468432" },
      { name: "María Angélica Romero Vásquez (Fundación CIMAS)", phone: "3014068657" }
    ],
    primarySpokespersons: [
      { name: "Said Habit Jassir Vázquez", phone: "3011955233" },
      { name: "Anthony de Jesús Torres Mattos", phone: "3103429753" }
    ],
    alternateSpokespersons: [{ name: "Carlos David Puente Sánchez", phone: "3234318538" }],
    tutors: [{ name: "Gilberto Romero Sierra", phone: "3152774992", email: "gromeros2121@hotmail.com" }],
    institutionalEmail: "cimasfuturocolombia@gmail.com",
    lat: 10.3910,
    lng: -75.4794
  },
  {
    id: 18,
    school: "I.E. Policarpa Salavarrieta",
    name: "Ruta Escuela Territorio de Paz",
    description: "Estrategia integral de movilización y formación comunitaria para hacer de la escuela y su territorio veredal un refugio activo de reconciliación.",
    category: "Círculos de la palabra",
    department: "Nariño",
    city: "Samaniego",
    legalNature: "Pública",
    rectors: [{ name: "Nilda María Medina", phone: "3218175590" }],
    primarySpokespersons: [
      { name: "Anyela Zharith Caicedo Roser", phone: "3147965268" },
      { name: "Guisella Hasleidy Melo Andrade", phone: "3137449755" }
    ],
    alternateSpokespersons: [
      { name: "Dominik Guadalupe Rodríguez Castro", phone: "3116536330" },
      { name: "Maily Nikol Santander Chamorro", phone: "3234477232" }
    ],
    tutors: [{ name: "Nilda Ma. Medina", phone: "3218175590", email: "cclasemm@gmail.com" }],
    institutionalEmail: "iepsalavarrieta@hotmail.com",
    lat: 1.3400,
    lng: -77.5920
  },
  {
    id: 19,
    school: "Institución Educativa Agropecuaria La Vega",
    name: "Construyendo Paz con Inclusión y sin Discriminación",
    description: "Pedagogía del respeto y la valoración de la diversidad humana en el ámbito escolar y comunitario rural nariñense.",
    category: "Clínicas de las emociones",
    department: "Nariño",
    city: "San Bernardo",
    legalNature: "Pública",
    rectors: [{ name: "Alba Oliva Bravo Ortiz", phone: "3137127506" }],
    primarySpokespersons: [
      { name: "Lizeth Juliana Ibarra Delgado", phone: "3160907581" },
      { name: "Marlon Duván Muñoz" }
    ],
    alternateSpokespersons: [{ name: "Ángela Yuleny Toro Carlosama", phone: "3115145792" }],
    tutors: [{ name: "Lina María Ortega Lasso", phone: "3153807603", email: "lina24ortega10@gmail.com" }],
    institutionalEmail: "ie.lavega.sanbernardo@sednarino.gov.co",
    lat: 1.5167,
    lng: -77.0333
  },
  {
    id: 20,
    school: "Escuela Pedagógica Experimental",
    name: "Pedagogía Experimental: Convivencia y Autonomía",
    description: "Enfoque vivencial centrado en el desarrollo de la autonomía moral, la reflexión comunitaria y la deliberación colectiva en las decisiones escolares.",
    category: "Círculos de la palabra",
    department: "Bogotá",
    city: "Bogotá (Suba / Guaymaral)",
    legalNature: "Privada",
    rectors: [{ name: "Janeth Malagón", phone: "3143824470" }],
    primarySpokespersons: [{ name: "Omar Castillo", phone: "3192675935" }],
    alternateSpokespersons: [{ name: "Julián Carreño", phone: "3192675935" }],
    tutors: [{ name: "Omar Castillo", phone: "3192675935", email: "omar.castillo@epe.edu.co" }],
    institutionalEmail: "epe@epe.edu.co",
    lat: 4.7620,
    lng: -74.0410
  },
  {
    id: 21,
    school: "San Bartolomé de La Florida",
    name: "La Escuela de la Paz: Memoria Histórica, Verdad y Perdón (2010-2026)",
    description: "Proceso sostenido durante más de quince años reconstruyendo la memoria histórica escolar y comunitaria para tejer rutas de reconciliación y convivencia.",
    category: "Museos de la memoria",
    department: "Nariño",
    city: "La Florida",
    legalNature: "Pública",
    rectors: [{ name: "Aníbal Sady Ramos Bastidas", phone: "3128498088" }],
    primarySpokespersons: [
      { name: "Marlon Ramos Gómez", phone: "3186115556" },
      { name: "Yeimi Baleria Chávez García", phone: "3164397881" }
    ],
    alternateSpokespersons: [{ name: "Fernanda Jiménez Díaz", phone: "3180622128" }],
    tutors: [{ name: "Yolanda Leonor Quiroz Benavides", phone: "3184885887", email: "yoqui-10@hotmail.com" }],
    institutionalEmail: "ie.bartolome.florida@sednarino.gov.co",
    lat: 1.3003,
    lng: -77.4089
  }
];
