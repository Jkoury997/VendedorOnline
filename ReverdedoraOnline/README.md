# mkcatalogoonline

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.js
```

This project was created using `bun init` in bun v1.1.9. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

Lista de Comandos CURL
1. Crear un nuevo QR general
curl -X POST http://localhost:3000/api/qrs/qr-general
2. Asignar un QR general a un usuario
curl -X POST http://localhost:3000/api/qrs/qr-general/assign \
  -H "Content-Type: application/json" \
  -d '{"qrGeneralUUID": "uuid-del-qr-general", "userUUID": "uuid-del-usuario"}'
3. Crear o actualizar los datos del QR hijo
curl -X POST http://localhost:3000/api/qr-linked-data \
  -H "Content-Type: application/json" \
  -d '{"qr_uuid": "uuid-del-qr", "user_uuid": "uuid-del-usuario", "name": "Nombre del QR", "address": "Dirección del QR", "description": "Descripción del QR"}'
4. Obtener los datos del QR hijo
curl -X GET http://localhost:3000/api/qr-linked-data/uuid-del-qr
5. Validar un QR
curl -X GET http://localhost:3000/api/validate-qr/uuid-del-qr

