# 🐆 Zona Jaguar · Marcador de pádel

Marcador de pádel, torneos (americano, eliminatoria, liga), ranking y patrocinadores del club **Zona Jaguar**.

## Descargas
- **iPhone / cualquier celular (versión web):** https://jovp1994.github.io/zona-jaguar-manzana/
  En iPhone: ábrela en **Safari** → **Compartir** → **Agregar a inicio**.
- **Android (APK):** https://github.com/JOVP1994/zona-jaguar-manzana/releases/latest/download/Zona-Jaguar.apk

## Cómo está organizado
| Carpeta | Qué contiene |
|---|---|
| `docs/` | **La app** (index.html) + íconos, tipografías y `config.js`. Es la versión web y también lo que muestra la app de Android. |
| `android/` | Proyecto de Android Studio (envoltura nativa: pantalla completa, pantalla encendida, respaldo). |
| `.github/workflows/android.yml` | Compila el APK firmado automáticamente en cada cambio. |

Los datos oficiales del club (torneos, récord, patrocinadores) viven en otro repositorio: **JOVP1994/zona-jaguar-datos** (`club.json`), y los publica la app del encargado.

## Configuración única (dueño del repositorio)
1. **GitHub Pages:** Settings → Pages → *Deploy from a branch* → `main` / `/docs` → Save.
2. **Secretos para firmar el APK:** Settings → Secrets and variables → Actions → *New repository secret*:
   - `KEYSTORE_BASE64` — la llave `.jks` convertida a texto (ver abajo)
   - `KEYSTORE_PASSWORD` — contraseña del almacén de llaves
   - `KEY_ALIAS` — alias de la llave (ej. `zonajaguar`)
   - `KEY_PASSWORD` — contraseña de la llave

   Convertir la llave a texto (PowerShell en Windows; queda copiada al portapapeles):
   ```powershell
   [Convert]::ToBase64String([IO.File]::ReadAllBytes("C:\ruta\a\llave-zonajaguar.jks")) | Set-Clipboard
   ```

## Compilar en Android Studio (opcional)
Abrir la carpeta `android/`. La app toma su contenido de `docs/`, así que no hay que copiar nada.
