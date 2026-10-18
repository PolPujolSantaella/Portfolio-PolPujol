# Pol Pujol Santaella — Portfolio

Portfolio personal en HTML, CSS y JavaScript (sin dependencias ni proceso de compilación), publicado con GitHub Pages:

**https://polpujolsantaella.github.io/Portfolio-PolPujol/**

## Estructura

```
index.html            Contenido (español por defecto)
styles/styles.css     Estilos y temas claro/oscuro
scripts/i18n.js       Textos ES / EN
scripts/scripts.js    Idioma, tema, menú móvil, animaciones
assets/fonts/         Instrument Serif, Geist, Geist Mono (autoalojadas, licencia OFL)
assets/img/           Fotos e imágenes de proyectos
assets/favicon.svg    Favicon
assets/og-image.png   Imagen para redes sociales (1200×630)
```

## Contenido pendiente

Busca `PENDIENTE` en `index.html` y `Pendiente`/`To be` en `scripts/i18n.js`. Los textos pendientes se ven en la web con estilo atenuado y borde discontinuo (clase `todo`); al sustituirlos, elimina esa clase.

## Imágenes

Para sustituir una imagen, reemplaza el archivo manteniendo el nombre y actualiza `width`/`height` en `index.html`. Las imágenes de proyectos se pueden ampliar (clic → visor; clic en la imagen o botón «Zoom» → ampliación).

| Archivo | Uso | Recomendado |
|---|---|---|
| `assets/img/pol.jpg` | Hero, cuadrada | ≥ 800×800 px, < 200 KB |
| `assets/img/demdetect.jpg` | Vertical; recorte 4:5 desde arriba, completa en el visor | ≥ 1000 px de ancho, < 300 KB |
| `assets/img/more-than-a-hack.jpg` | Horizontal 3:2 | ≥ 1500 px de ancho, < 300 KB |

Para el CV, guarda `assets/cv-pol-pujol-santaella.pdf` y descomenta el enlace de la sección de contacto.

## Textos e idiomas

El español está en `index.html` y el inglés en `scripts/i18n.js`. Al cambiar un texto, actualiza ambas versiones (misma clave `data-i18n`).

## Ver en local

```bash
python3 -m http.server 8000
# abre http://localhost:8000
```

## Publicación

GitHub Pages sirve la rama `main` directamente (Settings → Pages → *Deploy from a branch* → `main` / `/ (root)`). Cada push a `main` se publica automáticamente en 1–2 minutos.
