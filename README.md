![CI](https://github.com/Gaybre/rick-and-morty-exporer/actions/workflows/ci.yml/badge.svg)

# Rick & Morty Explorer

Aplicación web responsiva para explorar personajes de Rick & Morty consumiendo la [API pública](https://rickandmortyapi.com/api/character), con búsqueda, filtros combinables y orden por nombre.

## Stack

- React + TypeScript
- Vite
- Material UI (MUI)
- Sass
- Fetch API (sin librerías HTTP externas)
- Vitest + React Testing Library
- MSW (Mock Service Worker) para mockear la API en los tests
- GitHub Actions (CI: lint, type-check, build y tests en cada push/PR)

## Requisitos previos

- Node.js 20+
- npm

## Instalación

```bash
npm install
```

## Scripts disponibles

```bash
npm run dev       # levanta el servidor de desarrollo
npm run build     # type-check + build de producción
npm run preview   # sirve el build de producción localmente
npm run lint      # corre ESLint
npm run test      # corre la suite de tests con Vitest
```

## Funcionalidades

- Listado de personajes con imagen, nombre, estado, especie, género y última ubicación.
- Buscador por nombre con **debounce de 500ms** (no dispara una petición por cada tecla).
- **Filtros combinables** por estado, género y especie, aplicados junto con la búsqueda.
- **Orden** de resultados por nombre (A-Z / Z-A).
- Botón para limpiar todos los filtros y volver al estado inicial.
- Indicador de carga y manejo de errores (sin resultados / error genérico), con mensajes accesibles vía `aria-live`.
- Layout responsive, **mobile-first** (buscador, filtros y orden se adaptan a mobile, tablet y desktop).
- **Accesibilidad:** labels asociados a inputs, botones con `aria-label`, imágenes con `alt` descriptivo, navegación por teclado, regiones `aria-live` para loading/errores/resultados.
- **Optimización** de imágenes (WebP) y `aspect-ratio` fijo para evitar layout shift.
- **CI en GitHub Actions:** lint, type-check, build y tests en cada push y pull request.

## Estructura del proyecto

```
src/
  api/            # llamadas a la API (fetch)
  assets/         # imágenes
  components/     # componentes de UI
  hooks/          # hooks custom (useDebounce, useScreenSize)
  pages/          # páginas (Home)
  styles/         # estilos globales y variables Sass
  test/mocks/     # mocks de datos y handlers de MSW para tests
  theme/          # configuración del theme de MUI
  types/          # tipos e interfaces de TypeScript
  utils/          # funciones utilitarias (buildQuery, sortCharacters)
```

## Testing

Suite de Vitest + React Testing Library, con MSW mockeando la API para los tests de `Home`.
