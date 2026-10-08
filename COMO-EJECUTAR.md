# Cómo ejecutar este proyecto en tu computador

Necesitas **Node.js 20 o superior** (o Bun) instalado.

1. Descomprime el archivo.
2. Abre una terminal dentro de la carpeta `gestores-de-paz`.
3. Instala las dependencias:
   ```bash
   npm install
   ```
4. Levanta la página en tu navegador:
   ```bash
   npm run dev
   ```
   Abre la dirección que aparece en la terminal (por ejemplo `http://localhost:8080`).

Para generar la versión final lista para publicar:

```bash
npm run build
```

## Qué contiene

- `src/routes/` — las páginas: inicio, encuentros, experiencias, libro virtual, galería y red.
- `src/styles.css` — los colores y estilos (los verdes del osito).
- `src/lib/peace-data.ts` — los datos de muestra (20 experiencias, 19 colegios, capítulos del libro).
- `src/assets/` — el osito, el afiche y las fotografías de muestra.

Los registros reales de las experiencias, el PDF del libro y las fotografías oficiales
aún están pendientes; todo lo que ves marcado "de muestra" o "pendiente" debe reemplazarse.
