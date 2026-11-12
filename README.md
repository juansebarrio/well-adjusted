# well adjusted, bb.

La casa de "well adjusted, bb.": una revista independiente publicada por un instituto de una sola persona.
Astro estático + Tailwind + TypeScript. Sin CMS, sin base de datos, sin backend.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/
npm run check    # tipos
```

Requiere Node 22.23.4 o superior.

## Dónde está cada cosa

| Qué | Dónde |
| --- | --- |
| Ensayos | `content/essays/*.md` |
| Proyectos (specimens) | `content/projects/*.md` |
| Manifiesto | `content/pages/the-thinking.md` |
| Todo el texto de interfaz | `src/copy.ts` (los borradores llevan `// DRAFT`) |
| Variables y constantes | `src/config.ts` |
| Colores, tipografía, componentes visuales | `src/styles/global.css` |

El nombre del archivo es el slug de la URL: `content/essays/mi-ensayo.md` → `/read-something/mi-ensayo`.

## Agregar un ensayo

Un archivo nuevo en `content/essays/`. Hay dos modos, y los decide el archivo:

- **Solo tarjeta**: el archivo tiene solo la cabecera. Aparece en `/read-something` y el link va a Substack.
- **Página propia**: el archivo tiene cuerpo debajo de la cabecera. Aparece en el índice y además se publica completo en `/read-something/[slug]`.

```md
---
title: My Mother's Furniture Does Not Believe in Borders
deck: On the armchairs that follow us, and what a sideboard knows about staying.
filedUnder: Migration, domestic
readingTime: 6 minutes
substackUrl: https://ejemplo.substack.com/p/el-ensayo
excerpt: The sofa arrived three months after we did.
order: 1
---

El cuerpo es opcional. Si está, el ensayo tiene página propia.

Una nota al pie se escribe así.[^1]

> Una cita con `>` se convierte en la pull quote con marcador lima. Una por ensayo.

[^1]: El texto de la nota. Sale numerada, en mono, al pie.
```

| Campo | Obligatorio | Qué es |
| --- | --- | --- |
| `title` | sí | Título |
| `deck` | sí | Bajada, una línea |
| `filedUnder` | sí | "Filed under" |
| `readingTime` | sí | Texto libre: `6 minutes` |
| `substackUrl` | no | Link al original. Sin esto y sin cuerpo, la tarjeta no lleva link |
| `excerpt` | no | Un párrafo corto para la tarjeta |
| `order` | no | Orden en el índice, de menor a mayor |
| `draft` | no | `true` = se ve en local y en los previews, nunca en producción |

Las comillas y apóstrofes rectos de título, bajada y extracto se convierten solos en tipográficos.

## Agregar un proyecto

Un archivo nuevo en `content/projects/`.

```md
---
title: Dinner With Strangers
status: coming
ref: Specimen 02
order: 2
---
```

| Campo | Obligatorio | Qué es |
| --- | --- | --- |
| `title` | sí | Nombre |
| `status` | sí | `live` o `coming` |
| `ref` | sí | La etiqueta en mono: `Specimen 02` |
| `blurb` | no | Una o dos frases. Solo se muestra si está `live` |
| `cta` | no | Texto del link de la tarjeta. Solo si está `live` |
| `order` | no | Orden en la grilla. Los tres primeros salen en la home |
| `page` | no | `false` = aparece en la grilla pero todavía no tiene página |
| `placeholder` | no | `true` = la página muestra el aviso de texto provisorio |

Un proyecto `coming` muestra "Opens when it opens." y nada más, tenga o no texto en el archivo.
Para abrirlo: cambiar a `status: live`, agregar `blurb` y `cta`, y escribir el cuerpo en Markdown.

El formulario de Tally y la nota sobre la dirección postal están atados a `the-letter-office`
(`src/pages/projects/[slug].astro`). Si otro proyecto necesita formulario, se agrega ahí.

## El manifiesto

`content/pages/the-thinking.md`. Pegar el texto de la clienta debajo de la cabecera y poner `draft: false`:
desaparecen el sello DRAFT y el aviso. Las notas (`[^1]`) salen al margen en escritorio y al pie en móvil.

## Variables de entorno

Se cargan en Vercel → Settings → Environment Variables (y en `.env` para local; ver `.env.example`).
Todas son opcionales: si falta una, su bloque muestra un aviso en mono en vez de romperse.

| Variable | Para qué | Ejemplo |
| --- | --- | --- |
| `SUBSTACK_URL` | Raíz de la publicación. El enrolment abre `{SUBSTACK_URL}/subscribe?email=…` | `https://algo.substack.com` |
| `INSTAGRAM_URL` | Link del pie | `https://instagram.com/…` |
| `CONTACT_EMAIL` | Mail en `/say-hello` | `hola@…` |
| `TALLY_LETTER_OFFICE_URL` | Formulario de The Letter Office | `https://tally.so/r/abc123` |
| `TALLY_CONTACT_URL` | Formulario de `/say-hello` | `https://tally.so/r/def456` |
| `PLAUSIBLE_SRC` | Script de Plausible. Solo se carga en producción | `https://plausible.io/js/script.js` |

Son valores de build: después de cambiarlos hay que redeployar.

Dos constantes en `src/config.ts`:

- `MASTHEAD_LOWERCASE`: `true` = "well adjusted, bb.". En `false` vuelve a mayúscula inicial.
- `ENROLMENT_MODE`: `'custom'` (formulario propio) o `'embed'` (iframe oficial de Substack, listo y apagado).

## Enrolment

El formulario es un `GET` plano hacia `{SUBSTACK_URL}/subscribe` con el campo `email`, en la misma pestaña.
Funciona sin JavaScript. No hay backend y no se guarda nada en este sitio.

## Analítica (Plausible)

Sitio `welladjustedbb.com`, el que ya existe. El script solo se incluye cuando `VERCEL_ENV=production`
y `PLAUSIBLE_SRC` está definida: los previews no cuentan visitas.

Goals a crear a mano en Plausible → Site settings → Goals → Add goal → Custom event:

| Goal | Propiedades | Cuándo se dispara |
| --- | --- | --- |
| `enrol_click` | `page` | Se envía el formulario de enrolment |
| `project_open` | `slug` | Click en una tarjeta de proyecto |
| `essay_open` | `slug`, `destination` (`site` o `substack`) | Click en un ensayo, o en "Continue reading on Substack" |
| `letter_office_signup` | ninguna | Tally avisa que el formulario de The Letter Office se envió |
| `contact_open` | ninguna | Click en el mail de `/say-hello` |

Para ver las propiedades en el panel hay que darlas de alta en Site settings → Custom properties:
`page`, `slug`, `destination`. Ningún evento lleva contenido, mails ni direcciones.

## Borradores

`draft: true` en un ensayo: se ve en `npm run dev` y en los previews de Vercel, con la etiqueta
"Draft — not shown in production" y `noindex`. En producción no existe: ni en el índice, ni la página, ni en el sitemap.
`content/essays/placeholder.md` está así, para probar la plantilla de ensayo.

Los previews además sirven un `robots.txt` que bloquea todo. Producción lo abre y publica el sitemap.

## Deploy

Vercel, proyecto `well-adjusted`. `main` es producción y despliega solo; cada rama y cada PR tienen su preview.

## Plan de lanzamiento

Hoy el apex `welladjustedbb.com` apunta al proyecto de bb. El día del lanzamiento:

1. Cargar las variables de entorno de producción en el proyecto `well-adjusted` y redeployar `main`.
2. Revisar la URL de producción `*.vercel.app` de punta a punta: enrolment, los dos formularios de Tally, el mail.
3. En el proyecto **bb** de Vercel → Settings → Domains: quitar `welladjustedbb.com` (y `www`, si está).
   No tocar `bb.welladjustedbb.com`, que ya está configurado ahí y es donde queda bb.
4. En el proyecto **well-adjusted** → Settings → Domains: agregar `welladjustedbb.com` y `www.welladjustedbb.com`
   (www redirigiendo al apex). El DNS no cambia: el dominio ya apunta a Vercel.
5. Comprobar: `welladjustedbb.com` muestra este sitio, `bb.welladjustedbb.com` sigue mostrando bb,
   `/robots.txt` dice `Allow`, `/sitemap-index.xml` responde, y entra una visita en Plausible.
6. Crear los goals de Plausible de la tabla de arriba.
7. Si en el sitio viejo había URLs enlazadas desde afuera, agregarlas como redirects en `vercel.json` hacia `bb.welladjustedbb.com`.

Los pasos 3 y 4 son los únicos con corte, y es de segundos. Para volver atrás se hace el camino inverso.

## Capturas

`reports/`: las páginas a 390 y 1440 px.
