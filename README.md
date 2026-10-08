# Gestores de Paz Escolares

Mockup del portal de Gestores de Paz Escolares, construido con TanStack Start, React, TypeScript y Tailwind CSS.

## Cómo ejecutar este proyecto

Necesitas **Node.js 20 o superior** (o Bun) instalado.

Si aún no tienes el proyecto, clónalo:

```bash
git clone https://github.com/yatoDx/Mockup-pagina-encuentros-de-Paz.git
cd Mockup-pagina-encuentros-de-Paz
```

Instala las dependencias:

```bash
npm install
```

Inicia el servidor de desarrollo:

```bash
npm run dev
```

Abre la dirección que aparece en la terminal, normalmente `http://localhost:8080`.

## Comandos disponibles

Ejecuta las pruebas:

```bash
npm test
```

Comprueba el formato y las reglas de ESLint:

```bash
npm run lint
```

Genera la versión de producción:

```bash
npm run build
```

Para previsualizar la versión de producción:

```bash
npm run preview
```

## Estructura y contenido

- `src/routes/` — las páginas: inicio, encuentros, experiencias, libro virtual, galería y red.
- `src/styles.css` — los colores y estilos del portal.
- `src/lib/peace-data.ts` — los datos de muestra de experiencias, colegios y capítulos del libro.
- `src/assets/` — el osito, el afiche y las fotografías de muestra.

Los registros reales de las experiencias, el PDF del libro y las fotografías oficiales
aún están pendientes; todo lo que ves marcado como "de muestra" o "pendiente" debe reemplazarse.

## Desarrollo con Bun

También puedes usar Bun:

```bash
bun install
bun run dev
```
