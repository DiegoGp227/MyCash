# MyCash - Mockup de Aplicación de Finanzas Personales

Mockup completo de una aplicación de gestión de finanzas personales con diseño premium morado.

## Características del Mockup

### Páginas Incluidas

1. **Dashboard (index.html)**
   - Resumen general con métricas clave
   - Gráficos interactivos de ingresos vs gastos
   - Gastos por categoría (gráfico de dona)
   - Top 5 categorías de gasto
   - Últimas transacciones
   - Evolución de balance por cuenta

2. **Transacciones (transacciones.html)**
   - Lista completa de transacciones con filtros
   - Búsqueda por descripción
   - Filtros por tipo, categoría, cuenta y fechas
   - Transacciones recurrentes
   - Modales para crear/editar transacciones
   - Paginación

3. **Presupuestos (presupuestos.html)**
   - Vista general de presupuestos por categoría
   - Barras de progreso visuales con estados (saludable, alerta, excedido)
   - Selector de mes
   - Consejos y recomendaciones personalizadas
   - Modal para crear nuevos presupuestos

4. **Cuentas (cuentas.html)**
   - Tarjetas visuales de cuentas con gradientes
   - Tabla detallada con información de cada cuenta
   - Transferencias entre cuentas
   - Ajuste manual de balances
   - Gráfico de evolución de balance por cuenta

5. **Categorías (categorias.html)**
   - Gestión completa de categorías personalizadas
   - Separación por tipo (Ingresos/Gastos)
   - Sistema de subcategorías
   - Selector de colores e iconos
   - Marcar categorías como favoritas
   - Vista de transacciones por categoría

6. **Metas (metas.html)**
   - Tarjetas visuales de metas de ahorro
   - Progreso con indicadores de estado
   - Cálculo automático de ahorro requerido (mensual/diario)
   - Modal para contribuir a metas
   - Historial de metas completadas
   - Priorización de metas

7. **Reportes (reportes.html)**
   - Reporte mensual detallado
   - Gráficos de tendencias diarias
   - Desglose por categorías (gastos e ingresos)
   - Análisis comparativo vs mes anterior
   - Insights y recomendaciones automáticas
   - Exportar a PDF, Excel, CSV

## Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos personalizados con variables CSS
- **JavaScript**: Funcionalidad interactiva
- **Chart.js**: Gráficos interactivos y responsivos

## Diseño

### Paleta de Colores (Tema Morado Premium)

- **Primario**: `#7C3AED` (Morado)
- **Primario Oscuro**: `#5B21B6`
- **Primario Claro**: `#A78BFA`
- **Secundario/Éxito**: `#10B981` (Verde)
- **Peligro**: `#EF4444` (Rojo)
- **Advertencia**: `#F59E0B` (Naranja)
- **Fondo**: `#F9FAFB` (Gris claro)

### Características del Diseño

- Diseño completamente responsivo
- Sidebar fijo con navegación
- Tarjetas con sombras y efectos hover
- Modales para acciones (crear, editar, etc.)
- Gráficos interactivos con Chart.js
- Animaciones suaves
- Iconos emoji para mejor UX

## Cómo Usar

1. **Abrir el mockup**:
   - Simplemente abre `index.html` en tu navegador web
   - No requiere servidor web, funciona directamente

2. **Navegar entre páginas**:
   - Usa el menú lateral (sidebar) para cambiar entre páginas
   - Dashboard, Transacciones, Presupuestos, Cuentas

3. **Interactividad**:
   - Los botones muestran alertas de ejemplo
   - Los filtros funcionan en tiempo real
   - Los gráficos son interactivos (hover para ver detalles)
   - Los modales se pueden abrir y cerrar

## Estructura de Archivos

```
mockups/
├── index.html              # Dashboard principal
├── transacciones.html      # Página de transacciones
├── presupuestos.html       # Página de presupuestos
├── cuentas.html            # Página de cuentas
├── categorias.html         # Página de categorías
├── metas.html              # Página de metas de ahorro
├── reportes.html           # Página de reportes
├── README.md               # Este archivo
├── css/
│   └── styles.css          # Estilos globales
├── js/
│   ├── app.js              # Lógica principal de la app
│   └── charts.js           # Configuración de gráficos
└── assets/
    └── (vacío - para futuras imágenes)
```

## Datos de Ejemplo

El mockup incluye datos de ejemplo hardcodeados en `js/app.js`:

- 8 transacciones de ejemplo
- 5 presupuestos por categoría
- 4 cuentas (Bancaria, Crédito, Efectivo, Ahorros)
- Múltiples gráficos con datos de muestra

## Funcionalidades Destacadas

### Modales Interactivos

- **Nueva Transacción**: Formulario completo para crear transacciones
- **Nueva Transacción Recurrente**: Configurar pagos automáticos
- **Nuevo Presupuesto**: Definir límites de gasto por categoría
- **Nueva Cuenta**: Agregar cuentas bancarias, tarjetas, etc.
- **Transferir entre Cuentas**: Mover dinero entre cuentas
- **Ajustar Balance**: Corrección manual de balances

### Filtros y Búsqueda

- Filtrar transacciones por tipo, categoría, cuenta
- Búsqueda en tiempo real por descripción
- Selector de rango de fechas
- Filtros en todas las vistas principales

### Gráficos (Chart.js)

- **Gráfico de Líneas**: Ingresos vs Gastos (6 meses)
- **Gráfico de Dona**: Gastos por categoría
- **Gráfico de Barras**: Top 5 categorías de gasto
- **Gráfico de Área**: Evolución de balance por cuenta
- Todos los gráficos son responsivos e interactivos

## Próximos Pasos (Implementación Real)

Para convertir este mockup en una aplicación funcional:

1. **Backend**:
   - API RESTful (Node.js, Python, etc.)
   - Base de datos (PostgreSQL, MongoDB)
   - Autenticación de usuarios

2. **Frontend**:
   - Framework moderno (React, Vue, Angular)
   - State management (Redux, Vuex, etc.)
   - Integración con API

3. **Características Adicionales**:
   - Reportes avanzados
   - Metas de ahorro
   - Gastos compartidos
   - Notificaciones
   - Import/Export de datos
   - App móvil

## Navegadores Compatibles

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Notas

- Este es un mockup visual, no tiene persistencia de datos
- Los datos se resetean al recargar la página
- Las acciones (crear, editar, eliminar) solo muestran alertas
- Optimizado para pantallas de escritorio (responsive para móvil)

## Créditos

Diseñado y desarrollado como mockup completo para MyCash - Gestor de Finanzas Personales.

---

**¡Disfruta explorando el mockup!** 🚀
