# BBK Energy Solutions · web

Web ilustrativa de kits solares para el hogar (fase 1, sin compra en línea). Todo el contacto va a un asesor: WhatsApp, asistente web, llamada o el formulario de registro con consentimiento informado.

## Contenido

- `public/index.html`: home con kits, "Encuentra tu kit", "Cómo funciona" por kit, registro y asistente.
- `public/terminos.html`, `public/privacidad.html`, `public/uso-de-datos.html`: páginas legales (también en `/terminos`, `/privacidad`, `/uso-de-datos`).
- `public/logo.webp`, `public/favicon.png`, `public/apple-touch-icon.png`.
- `Dockerfile` + `nginx.conf`: servidor estático nginx en el puerto 80.

## Publicar en EasyPanel

1. En el proyecto de EasyPanel: **+ Service → App**, nombre `bbk-energy-web`.
2. **Source → GitHub**: este repositorio, rama `main`, ruta `/`.
3. **Build → Dockerfile** (ruta `Dockerfile`).
4. **Domains**: añade `bbkenergy.com` y `www.bbkenergy.com`, puerto **80**, HTTPS activado.
5. **Deploy**. Activa *Auto Deploy* para que cada push a `main` se publique solo.
6. En el DNS del dominio, apunta `A @` y `CNAME www` (o `A www`) a la IP del servidor de EasyPanel.

## Probar en local

```sh
docker build -t bbk-energy-web . && docker run --rm -p 8080:80 bbk-energy-web
# abrir http://localhost:8080
```

## SEO y vista previa de enlaces

- Título, descripción, `canonical` (https://www.bbkenergy.com/), Open Graph y Twitter Card en todas las páginas.
- `og-image.jpg` (1200 × 630) es la imagen que muestran WhatsApp, SMS, Facebook y X al compartir el enlace.
- Datos estructurados JSON-LD: organización (dirección, teléfono, horario, redes), web, los 6 kits con precio y las preguntas frecuentes.
- `robots.txt`, `sitemap.xml`, `site.webmanifest`, favicon e iconos.
- nginx redirige `bbkenergy.com` a `www.bbkenergy.com` para que Google vea una sola dirección.
- Mientras el dominio no apunte a EasyPanel, nginx reescribe `og:image`, `twitter:image` y `og:url` con el dominio desde el que se abre la página, para que la vista previa funcione también en el dominio de prueba. El `canonical` siempre queda en www.
- Archivos para IA y descubrimiento: `llms.txt` (resumen del negocio, kits y contacto para ChatGPT, Claude, Perplexity, etc.), `robots.txt` con los rastreadores de IA permitidos, `humans.txt` y `.well-known/security.txt`.

## Google Analytics

- `public/analytics.js` carga GA4 con aviso de cookies (Consent Mode v2): no se guardan cookies de analítica hasta que el visitante pulsa "Aceptar".
- ID de medición: `G-0ZETBXLRR2` (cuenta "BBK Energy Solutions", propiedad "BBK Energy Web"), en `GA_ID` dentro de `analytics.js`. Si se deja vacío, no se carga nada ni aparece el aviso.

## Reglas de contenido

- Hora de referencia: La Habana (HAV, `America/Havana`). La simulación solar usa La Habana.
- Asesoría humana en línea de 7:00 a 22:30 (HAV); fuera de ese horario, "Asistente virtual en línea".
- No se cobra nada hasta que el kit esté instalado y funcionando; se acepta tarjeta de crédito.
- Financiamiento solo para personas que viven y trabajan en EE. UU.
- Testimonios ocultos (`#clientes`) hasta tener al menos 10 comentarios reales.

## Pendiente

- El formulario de registro y la llamada del chat abren WhatsApp con los datos y el consentimiento. Falta guardarlos en un CRM o backend con fecha, hora y texto exacto del consentimiento (Telnyx/10DLC).
- Formulario para recoger testimonios de clientes.
