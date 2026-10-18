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

## Añadir imágenes

Guarda los archivos con estos nombres exactos; mientras no existan se muestra un marcador de posición:

| Archivo | Formato recomendado |
|---|---|
| `assets/img/pol.jpg` | Retrato vertical 4:5, ~900×1125 px, < 200 KB |
| `assets/img/demdetect.jpg` | Horizontal 16:10, ~1600×1000 px, < 300 KB |
| `assets/img/more-than-a-hack.jpg` | Horizontal 16:10, ~1600×1000 px, < 300 KB |

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
