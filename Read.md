CoinMaster/
├── 🏠 Dashboard (/)
├── 💳 Transacciones (/transactions)
│   ├── Lista de transacciones
│   ├── Crear transacción
│   ├── Editar transacción
│   ├── Crear transferencia
│   └── Filtros avanzados
├── 💰 Cuentas (/accounts)
│   ├── Lista de cuentas
│   ├── Crear cuenta
│   ├── Editar cuenta
│   └── Ver detalle cuenta
├── 📂 Categorías (/categories)
│   ├── Lista categorías + subcategorías
│   ├── Crear categoría
│   ├── Editar categoría
│   └── Eliminar/archivar
├── 📈 Presupuestos (/budgets)
│   ├── Dashboard presupuestos
│   ├── Asignar presupuesto a categoría
│   └── Editar presupuesto
├── 🎯 Metas (/goals)
│   ├── Lista de metas
│   ├── Crear meta
│   ├── Aportar a meta
│   └── Marcar como completada
├── 💸 Deudas (/debts)
│   ├── Lista de deudas
│   ├── Crear deuda
│   ├── Registrar pago
│   └── Marcar como pagada
└── ⚙️ Configuración (/settings)
    ├── Perfil
    ├── Día de corte
    ├── Moneda
    └── Apariencia

    📄 PÁGINAS DE LA APP
Públicas (sin autenticación):

/login - Inicio de sesión
/signup - Registro de usuario
/forgot-password - Recuperar contraseña
/reset-password/[token] - Restablecer contraseña


Privadas (requieren autenticación):

/ - Dashboard principal
/transactions - Lista de transacciones
/transactions/new - Crear transacción (puede ser modal)
/transactions/[id] - Editar transacción (puede ser modal)
/accounts - Lista de cuentas
/accounts/[id] - Detalle de cuenta
/categories - Gestión de categorías
/budgets - Presupuestos
/goals - Lista de metas
/goals/[id] - Detalle de meta
/debts - Lista de deudas
/debts/[id] - Detalle de deuda
/settings - Configuración (con tabs internos)

<BanknoteArrowDown />

<BanknoteArrowUp />