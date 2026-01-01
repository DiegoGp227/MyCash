src/
 ├─ app.ts
 ├─ server.ts
 ├─ config/
 │   ├─ env.ts
 │   ├─ database.ts
 │   └─ constants.ts
 │
 ├─ modules/
 │   ├─ auth/
 │   │   ├─ auth.controller.ts
 │   │   ├─ auth.service.ts
 │   │   ├─ auth.schema.ts
 │   │   ├─ auth.types.ts
 │   │   └─ auth.routes.ts
 │   │
 │   ├─ users/
 │   │   ├─ users.controller.ts
 │   │   ├─ users.service.ts
 │   │   ├─ users.schema.ts
 │   │   ├─ users.types.ts
 │   │   └─ users.routes.ts
 │   │
 │   ├─ debts/
 │   │   ├─ debts.controller.ts
 │   │   ├─ debts.service.ts
 │   │   ├─ debts.schema.ts
 │   │   ├─ debts.types.ts
 │   │   └─ debts.routes.ts
 │   │
 │   └─ transactions/
 │       ├─ transactions.controller.ts
 │       ├─ transactions.service.ts
 │       ├─ transactions.schema.ts
 │       ├─ transactions.types.ts
 │       └─ transactions.routes.ts
 │
 ├─ middlewares/
 │   ├─ auth.middleware.ts
 │   ├─ validate.middleware.ts
 │   ├─ error.middleware.ts
 │   └─ rate-limit.middleware.ts
 │
 ├─ lib/
 │   ├─ jwt.ts
 │   ├─ hash.ts
 │   ├─ logger.ts
 │   └─ prisma.ts
 │
 ├─ types/
 │   ├─ express.d.ts
 │   └─ global.types.ts
 │
 ├─ utils/
 │   ├─ dates.ts
 │   ├─ currency.ts
 │   └─ pagination.ts
 │
 └─ index.ts
