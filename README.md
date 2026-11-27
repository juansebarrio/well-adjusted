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
| Imágenes de los ensayos (exhibits) | `public/essays/<slug>/` |
| Proyectos (specimens) | `content/projects/*.md` |
| About (`/the-thinking`) | `content/pages/about.md` |
| Líneas de la home (lede, pregunta, lema, nombre del instituto) | `content/pages/home.md` |
| Todo el resto del texto de interfaz | `src/copy.ts` (los borradores llevan `// DRAFT`) |
| Variables y constantes | `src/config.ts` |
| Colores, tipografía, componentes visuales | `src/styles/global.css` |

El nombre del archivo es el slug de la URL: `content/essays/mi-ensayo.md` → `/read-something/mi-ensayo`.

## Agregar un ensayo

Un archivo nuevo en `content/essays/`. Cada ensayo se publica completo en `/read-something/[slug]`
y aparece en el índice y en la home (los tres primeros por `order`).

```md
---
title: "How Many Times Can a Person Start Over Before It Becomes a Personality Disorder?"
deck: "A field report on migration, reinvention, and the administrative burden of having a self."
kind: "Field Report"
number: "002"
form: "WA-7/E"
filedUnder: "migration, reinvention, paperwork"
readingTime: "14 minutes"
status: final
order: 2
---

El texto, en Markdown.

Una nota se escribe así.[^1]

<figure class="exhibit"><img src="/essays/mi-ensayo/image1.png" alt="" loading="lazy"><figcaption>Exhibit A</figcaption></figure>

[^1]: **Un título opcional en negrita.** El texto de la nota.
```

| Campo | Qué es |
| --- | --- |
| `title` | Título |
| `deck` | Bajada, una línea |
| `kind` | `Bulletin`, `Field Report` o `Case Study`. Con `number` forma el rótulo: "Field Report No. 002" |
| `number` | Entre comillas, para que `"002"` conserve los ceros |
| `form` | Referencia del formulario: `WA-7/E` |
| `filedUnder` | "Filed under" |
| `readingTime` | Texto libre: `14 minutes` |
| `status` | `final` = publicado. `draft` (o sin el campo) = se ve en local y en previews, nunca en producción |
| `order` | Orden en el índice y en la home, de menor a mayor |

Las comillas y apóstrofes rectos se convierten solos en tipográficos.

**Notas.** `[^1]` en el texto y `[^1]: …` al final. En escritorio aparecen al margen al pasar el cursor
o con el foco del teclado; en móvil y al pie del ensayo salen como lista numerada.

**Pull quote.** Una cita con `>` sale grande y con el marcador lima. Los tres ensayos actuales no usan ninguna.

**Exhibits.** Son los `<figure class="exhibit">` que la autora coloca a mano. Para agregar imágenes:

1. Copiar los archivos a `public/essays/<slug>/`.
2. Correr `node scripts/optimize-images.mjs`. Limita el ancho a 1200 px, recomprime el archivo con el mismo nombre
   y genera un `.webp` al lado. Se puede correr de nuevo sin problema: saltea lo que ya está hecho.
3. Commitear las dos versiones de cada imagen.

El sitio arma solo el `<picture>` (webp con el original de respaldo) y le pone ancho y alto.
Si una imagen referenciada no existe, el build falla y dice cuál.

Los comentarios HTML (`<!-- … -->`) quedan en el archivo y no se publican.

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

Un proyecto `coming` muestra "Opens when it opens." y nada más, tenga o no texto en el archivo.
Para abrirlo: cambiar a `status: live`, agregar `blurb` y `cta`, y escribir el cuerpo en Markdown.

El formulario de Tally y la nota sobre la dirección postal están atados a `the-letter-office`
(`src/pages/projects/[slug].astro`). Si otro proyecto necesita formulario, se agrega ahí.

## About y home

`content/pages/about.md` es la página `/the-thinking` (título "About"). `portrait` es la imagen que va al costado.
La última línea en cursiva del texto no se repite: la página cierra con esa frase en mono (`about.closing` en `src/copy.ts`).

`content/pages/home.md` tiene cuatro líneas de la home: `lede`, `question`, `motto` e `institute_name`.
El nombre del instituto también sale en el pie de todas las páginas.

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
| `essay_open` | `slug`, `destination` (hoy siempre `site`) | Click en un ensayo, desde el índice o desde la home |
| `letter_office_signup` | ninguna | Tally avisa que el formulario de The Letter Office se envió |
| `contact_open` | ninguna | Click en el mail de `/say-hello` |

Para ver las propiedades en el panel hay que darlas de alta en Site settings → Custom properties:
`page`, `slug`, `destination`. Ningún evento lleva contenido, mails ni direcciones.

## Borradores

`status: draft` en un ensayo: se ve en `npm run dev` y en los previews de Vercel, con una etiqueta y `noindex`.
En producción no existe: ni en el índice, ni la página, ni en el sitemap.

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

`reports/`: las páginas y los tres ensayos a 390 y 1440 px, más `INFORME.md`.
