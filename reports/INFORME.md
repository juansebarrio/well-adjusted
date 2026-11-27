# Informe: primer número (contenido del 20 de noviembre)

## Qué entró

- Tres ensayos completos en el sitio: Bulletin No. 001, Field Report No. 002 y Case Study No. 003.
- About en `/the-thinking`, con la imagen al costado en escritorio y arriba en móvil.
- Home: lede nuevo, la pregunta, el nombre del instituto y el lema en el bloque Filed, el nombre en el pie y la fila "Read something".
- 25 imágenes optimizadas: de 14,5 MB a 1 MB en webp, con el PNG original recomprimido como respaldo y el mismo nombre de archivo.
- El ensayo de prueba y el manifiesto provisorio se borraron.

## Correcciones de copy

Solo errores mecánicos. No se tocó vocabulario, palabrotas ni puntuación expresiva.

### Bulletin No. 001

| Antes | Después |
| --- | --- |
| He was wrong about `***[plenty,]***` but | He was wrong about plenty, but |

### Field Report No. 002

| Antes | Después |
| --- | --- |
| is it being in both place or being neither here nor there. | is it being in both places or being neither here nor there. |
| Me everytime I move: | Me every time I move: |
| or a better vibe all together. (nota 4) | or a better vibe altogether. |
| `**Came across Erving Goffman's … And scene.*` (nota 2) | Came across Erving Goffman's … And scene. |

La nota 2 traía una negrita abierta sin cerrar y un asterisco suelto al final. Es la única sin título en negrita, así que quedó en texto plano.

### Case Study No. 003

| Antes | Después |
| --- | --- |
| You become angry. `[^1]` | You become angry.`[^1]` (sin el espacio antes de la nota) |
| I am been having the same argument | I have been having the same argument |
| some messed up/weird/ questionable behaviours | some messed up/weird/questionable behaviours |
| can give one person with comfort and security but makes another member feeling trapped | can give one person comfort and security but make another member feel trapped |
| which the actual useful part. | which is the actual useful part. |
| and should be call back later after they're eaten. | and should call back later after they've eaten. |

### About y home

Sin cambios.

## Dudas que no toqué

Pueden ser errores o pueden ser intención. Las decide ella.

1. **001**: "I am not trying to say that suffering is not inherently profound." La doble negación dice lo contrario de lo que sigue el párrafo. ¿Quiso decir "that suffering is inherently profound"?
2. **002**, nota 1: "late state capitalism". ¿"late stage capitalism"?
3. **002**, primer párrafo: "so * much * goddamn * paperwork" sale con los asteriscos a la vista. Lo dejé como está.
4. **002**, nota 1: "successfully* navigated" tiene un asterisco sin nota que lo explique. Lo dejé.
5. **003**: "Estrangement is the default. Protect your peace, bb." viene después de una frase a favor de los límites. ¿Es ironía, o falta un "not"?
6. **003**: "does not mean people have to stay or accept harmful relationships". ¿"stay in or accept"?
7. **About**: la imagen marcada como `portrait` es un meme ("I joke a lot. I don't play tho."), no una foto de ella. La puse tal cual, con un texto alternativo que describe el meme. Si quería un retrato, falta el archivo.

## Cosas a saber

- **No hay pull quotes.** Ninguno de los tres ensayos trae una cita con `>`, así que el marcador lima no aparece en los ensayos. Sigue en el tagline y en el punto de "Live".
- **El gif de Pinterest del 001** queda como comentario en el archivo y no se publica.
- **The Letter Office** ya no muestra el aviso de texto provisorio, pero el texto sigue siendo el que escribí yo. Falta el de ella.
- **Procesador de Markdown.** Para tratar los exhibits hizo falta pasar al procesador clásico de Astro (`@astrojs/markdown-remark`). El resultado visible es el mismo.
- **Variables de entorno**: siguen sin cargar las seis. Los avisos en óxido de Substack, Tally y mail continúan.

## Verificación

- Los tres ensayos revisados a 390 y 1440: largo, notas al margen y al pie, exhibits. Sin scroll horizontal a 360.
- axe (WCAG 2 A/AA): sin violaciones en home, About, índice y los tres ensayos.
- Lighthouse móvil, build de producción: performance 98 a 100, accesibilidad 100, best practices 100, SEO 100.
- Sitemap: incluye los tres ensayos.
- Ningún "draft" ni "placeholder" en el texto visible de ninguna página.

## Capturas

En esta carpeta. Las páginas a 390 y 1440; los ensayos completos (`essay-00N-…`) y cuatro detalles (`detail-…`) de notas y exhibits.
