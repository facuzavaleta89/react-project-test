<!-- Copilot / AI assistant instructions for react-project-test -->
# Instrucciones rápidas para agentes AI — react-project-test

Propósito: introducir a un agente en este proyecto Next.js (app router). Ser conciso, proponer cambios pequeños y ejecutar localmente antes de proponer despliegues.

- **Comandos útiles:**
  - `npm run dev` — inicia servidor de desarrollo (Next.js).
  - `npm run build` — build de producción.
  - `npm start` — arranca la app ya construida.
  - `npm run lint` — ejecuta ESLint.

- **Arquitectura y puntos de entrada:**
  - Usa el App Router de Next.js: el código principal está en `src/app` (ej.: [src/app/page.js](src/app/page.js)).
  - Layout y fuentes globales: [src/app/layout.js](src/app/layout.js).
  - Estilos globales y Tailwind: [src/app/globals.css](src/app/globals.css) importa `tailwindcss` directamente.
  - Componentes reutilizables viven en `src/components` (ej.: [src/components/Hero.jsx](src/components/Hero.jsx)).

- **Convenciones de importación:**
  - Se usa alias `@/` configurado en [jsconfig.json](jsconfig.json) — p. ej. `import Hero from "@/components/Hero";`.
  - Componentes suelen exportarse por defecto (default export) y usan extensión `.jsx` o `.js`.

- **Herramientas y configuración:**
  - Next.js 16 (ver [package.json](package.json)).
  - React 19.
  - Tailwind (v4) y `@tailwindcss/postcss` integrados vía [postcss.config.mjs](postcss.config.mjs).
  - ESLint usando [eslint.config.mjs](eslint.config.mjs) con `eslint-config-next`.

- **Patrones observables y ejemplos concretos:**
  - Rutas/Carpetas: cada ruta es una carpeta dentro de `src/app` (ej.: `contacto`, `mi-cuenta`, `shop`). Mantén la lógica de rutas y UI en esos directorios.
  - Diseño global: `layout.js` envuelve `children` y define fuentes; no introducir HTML <head> duplicados fuera de `layout.js`.
  - Estilos: preferir clases Tailwind en JSX; `globals.css` define variables CSS para modo oscuro.
  - Importar assets públicos desde `/public` (p. ej. favicon ya en `src/app/favicon.ico`).

- **Qué verificar antes de crear PRs o cambios grandes:**
  - Ejecutar `npm run dev` y validar la ruta afectada en `http://localhost:3000`.
  - Ejecutar `npm run lint` y resolver advertencias de ESLint.
  - Evitar cambios masivos en `src/app/layout.js` sin validar impacto en todas las rutas.

- **Notas de depuración rápidas:**
  - Si el dev server falla, eliminar `.next` y reiniciar `npm install` → `npm run dev`.
  - Para problemas de alias, confirmar `jsconfig.json` y que los imports usen `@/`.

Preguntas que puedes hacerme si necesitas más contexto:
- ¿Quieres que añada ejemplos de tests o CI para este proyecto?
- ¿Prefieres que genere una `README.developer.md` con los pasos de despliegue local?

-- Fin
