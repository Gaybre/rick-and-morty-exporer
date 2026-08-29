# Rick & Morty Explorer

Aplicación web para explorar personajes de Rick & Morty consumiendo la [API pública](https://rickandmortyapi.com/api/character), con búsqueda y filtros combinables.

## Stack

- React + TypeScript
- Vite
- Sass
- Fetch API (sin librerías HTTP externas)
- Vitest + React Testing Library

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
- Buscador por nombre con debounce (500ms).
- Filtros combinables por estado, género y especie.
- Botón para limpiar filtros.
- Indicador de carga y manejo de errores (sin resultados / error genérico).

## Estructura del proyecto

```
src/
  api/          # llamadas a la API
  components/   # componentes reutilizables (UI)
  hooks/        # hooks custom
  pages/        # páginas / vistas
  styles/       # estilos globales
  types/        # tipos e interfaces TypeScript
  utils/        # funciones utilitarias (ej. buildQuery)
```
