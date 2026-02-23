## Funcionamiento del proyecto

Esta API REST está desarrollada con **TypeScript + Express** y persiste datos en **MongoDB** usando **Mongoose**.  
Incluye:

- **Registro y login** de usuarios.
- Contraseñas hasheadas con **bcryptjs**.
- Autenticación y protección de rutas con **JWT** (header `Authorization: Bearer <token>`).
- Validación de datos con **Zod** (body y query params).
- CRUD completo de la entidad **Products**.
- **Filtrado por query params** en el endpoint de listado (ej: `minPrice`, `category`, `q`).

---

## Instalación y ejecución

### Requisitos

- Node.js (18+ recomendado)
- MongoDB local o MongoDB Atlas

### Pasos

1. Instalar dependencias:

```bash
npm install
```

2. Crear un archivo .env en la raíz del proyecto:
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/tp_utn
   JWT_SECRET=super-secret-cambiame-por-uno-largo-12345
   JWT_EXPIRES_IN=1d

3.Ejecutar en desarrollo:

npm run dev

4. La Api corre en: http://localhost:5000

## EndPoints

GET /health → estado de la API

## Auth

POST /api/auth/register → registrar usuario
{ "name": "Luis", "email": "luis@test.com", "password": "123456" }

POST /api/auth/login → login (devuelve token JWT)
{ "email": "luis@test.com", "password": "123456" }

Products (CRUD)

GET /api/products → listar productos (con filtros por query params)

Ejemplo requerido: GET /api/products?minPrice=1000

Otros filtros: maxPrice, category, q, minStock, maxStock

GET /api/products/:id → obtener producto por id

POST /api/products → crear producto (protegido JWT)
Headers: Authorization: Bearer <token>

{
"name": "Par de medias",
"price": 1500,
"stock": 10,
"category": "Ropa",
"description": "Algodón unisex"
}
