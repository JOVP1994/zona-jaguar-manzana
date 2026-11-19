# Instrucciones para Claude — Zona Jaguar

El dueño (Jesús) es principiante: explica en español sencillo, evita que tenga que usar Android Studio.

## Estructura
- `docs/index.html` es la **única fuente** de la app (HTML/CSS/JS en un archivo). Se usa en:
  - GitHub Pages (PWA para iPhone): https://jovp1994.github.io/zona-jaguar-manzana/
  - La app de Android: `android/app/build.gradle` apunta `assets.srcDirs` a `../../docs`.
- `docs/config.js`: repositorio de datos oficiales (`JOVP1994/zona-jaguar-datos`, archivo `club.json`).
- `docs/sw.js`: service worker (red primero, caché sin conexión). Si agregas archivos al shell, súmalos a `SHELL` y sube `CACHE`.
- `android/`: envoltura WebView (`MainActivity.java`): WebViewAssetLoader, selector de archivos, puente `AndroidBridge.shareBackup`, botón atrás → `window.handleBack()`.
- `.github/workflows/android.yml`: compila APK firmado con secretos y lo publica en Releases (`Zona-Jaguar.apk`). versionCode = 100 + run_number.

## Datos
- Locales por dispositivo en localStorage: `zj-club-v1` (jugadores, partidos, torneos, patrocinadores), `marcador-padel-zj-v2` (marcador actual).
- Oficiales: `zj-cloud-v1` (caché de club.json). Modo encargado: `zj-admin-v1` (token GitHub, publica con la API Contents).
- Torneos/partidos con `official: true` se publican; jugadores `hidden` se anonimizan como `x-N` / "Jugador oculto".
- No cambiar el formato sin migración: hay datos reales en celulares.

## Al hacer cambios
1. Editar `docs/index.html` (y probar con Playwright si es posible).
2. Commit + push a `main`: Pages se actualiza solo y Actions genera el APK nuevo.
3. Nunca subir llaves (`*.jks`) ni tokens.
