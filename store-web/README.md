# React + Vite: StoreApp

### Configuración Eslint - Prettier

> ESLint tiene una regla `'linebreak-style': ['error', 'unix']` que fuerza un tipo específico de salto de línea `"unix"` → Usa `\n` (Linux/macOS) y `"windows"` → Usa `\r\n` (Windows), Prettier lo maneja de forma indirecta según la configuración del sistema operativo o el control de versiones (Git).
> Así, los archivos se guardarán con `LF` (`\n`) en el repositorio y se convertirán a `CRLF` (`\r\n`) en Windows si es necesario.

### Configuración StoreApp (backend)

```
docker compose exec mongo bash

mongosh -u root -p example
use admin
db.createUser({
  user: 'ggary',
  pwd: 'storeApp12',
  roles: ['dbOwner']
})
use supermercadodb
db.createUser({
  user: 'ggary',
  pwd: 'storeApp12',
  roles: ['dbOwner']
})
```
