# Categories - Backend

## Estructura de archivos

```
src/modules/categories/
  ├── categories.types.ts        # Interfaces TypeScript
  ├── categories.shema.ts        # Validaciones Zod
  ├── categories.services.ts     # Logica de negocio
  └── categories.controllers.ts  # Controladores HTTP
```

## Modelo de datos (Prisma)

```prisma
model Category {
  id     String @id @default(cuid())
  userId String
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)

  name  String
  color String
  icon  String?
  type  TransactionType  // INCOME | EXPENSE

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  subcategories Subcategory[]
  transactions  Transaction[]
  budgets       Budget[]

  @@unique([userId, name, type])
  @@index([userId])
  @@index([type])
}
```

**Restricciones:**
- `@@unique([userId, name, type])` - Un usuario no puede tener dos categorias con el mismo nombre y tipo.
- `onDelete: Cascade` - Si se elimina el usuario, se eliminan sus categorias.
- Las transacciones asociadas usan `onDelete: SetNull` (no se eliminan, solo pierden la referencia).
- Las subcategorias asociadas usan `onDelete: Cascade` (se eliminan junto con la categoria).

## Interfaces

```typescript
// Crear categoria
interface ICreateCategory {
  name: string;
  color: string;
  icon?: string;
  type: TransactionType; // "INCOME" | "EXPENSE"
}

// Actualizar categoria
interface IUpdateCategory {
  name?: string;
  color?: string;
  icon?: string;
}

// Respuesta
interface ICategoryResponse {
  id: string;
  name: string;
  color: string;
  icon: string | null;
  type: TransactionType;
  createdAt: Date;
  updatedAt: Date;
  subcategoriesCount: number; // Campo calculado
}
```

## Validaciones (Zod)

| Campo   | Crear                              | Actualizar       |
|---------|-------------------------------------|------------------|
| `name`  | Requerido, 1-50 caracteres         | Opcional, 1-50 caracteres |
| `color` | Requerido, formato hex (`#RGB` o `#RRGGBB`) | Opcional, formato hex |
| `icon`  | Opcional                            | Opcional         |
| `type`  | Requerido: `INCOME` o `EXPENSE`    | No modificable   |

**Query params:**
- `type` (opcional): Filtra por `INCOME` o `EXPENSE`.

## Endpoints

Todos los endpoints requieren autenticacion JWT (`Authorization: Bearer <token>`).

Base path: `/api`

| Metodo   | Ruta               | Descripcion             | Status |
|----------|---------------------|-------------------------|--------|
| `POST`   | `/api/categories`      | Crear categoria         | 201    |
| `GET`    | `/api/categories`      | Listar categorias       | 200    |
| `GET`    | `/api/categories/:id`  | Obtener por ID          | 200    |
| `PUT`    | `/api/categories/:id`  | Actualizar categoria    | 200    |
| `DELETE` | `/api/categories/:id`  | Eliminar categoria      | 200    |

### POST /api/categories

Crea una nueva categoria.

**Body:**
```json
{
  "name": "Comida",
  "color": "#FF5733",
  "icon": "utensils",
  "type": "EXPENSE"
}
```

**Respuesta (201):**
```json
{
  "message": "Category created successfully",
  "category": {
    "id": "clx...",
    "name": "Comida",
    "color": "#FF5733",
    "icon": "utensils",
    "type": "EXPENSE",
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z",
    "subcategoriesCount": 0
  }
}
```

### GET /api/categories

Lista todas las categorias del usuario autenticado. Ordenadas por nombre ascendente.

**Query params:**
- `type` (opcional): `INCOME` o `EXPENSE`

**Respuesta (200):**
```json
{
  "categories": [
    {
      "id": "clx...",
      "name": "Comida",
      "color": "#FF5733",
      "icon": "utensils",
      "type": "EXPENSE",
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z",
      "subcategoriesCount": 3
    }
  ]
}
```

### GET /api/categories/:id

Obtiene una categoria por su ID.

**Respuesta (200):**
```json
{
  "category": { ... }
}
```

### PUT /api/categories/:id

Actualiza una categoria. Solo se modifican los campos enviados.

**Body (todos opcionales):**
```json
{
  "name": "Alimentacion",
  "color": "#00FF00",
  "icon": "bowl-food"
}
```

**Respuesta (200):**
```json
{
  "message": "Category updated successfully",
  "category": { ... }
}
```

### DELETE /api/categories/:id

Elimina una categoria y sus subcategorias asociadas.

**Respuesta (200):**
```json
{
  "message": "Category deleted successfully"
}
```

## Errores

| Codigo | Error                        | Cuando                                              |
|--------|------------------------------|------------------------------------------------------|
| 401    | `UnauthorizedError`          | No se envio token o es invalido                     |
| 403    | `ForbiddenError`             | El usuario no es dueno de la categoria              |
| 404    | `NotFoundError`              | La categoria no existe                              |
| 409    | `ResourceAlreadyExistsError` | Ya existe una categoria con el mismo nombre y tipo  |
| 422    | `ValidationError`            | Los datos enviados no pasan las validaciones de Zod |
| 500    | `InternalServerError`        | Error inesperado del servidor                       |

## Logica de negocio (Services)

- **Crear:** Verifica duplicados por `(userId, name, type)` antes de crear.
- **Listar:** Filtra por `userId` (obligatorio) y `type` (opcional). Incluye conteo de subcategorias.
- **Obtener por ID:** Valida existencia y que el usuario sea el dueno.
- **Actualizar:** Valida propiedad. Si se cambia el nombre, verifica que no exista duplicado.
- **Eliminar:** Valida existencia y propiedad antes de eliminar.
