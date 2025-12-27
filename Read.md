📊 Dashboard
💳 Transacciones
   ├─ Todas
   ├─ Recurrentes
   └─ Compartidas
💰 Cuentas
📂 Categorías ← gestión categorías personalizadas
📈 Presupuestos
📊 Reportes
   ├─ Mensual
   ├─ Anual
   ├─ Por Categoría
   ├─ Por Cuenta
   └─ Comparativo
🎯 Metas
🔔 Notificaciones
⚙️ Configuración
   ├─ Perfil
   ├─ Preferencias
   ├─ Notificaciones
   ├─ Privacidad
   ├─ Apariencia
   └─ Import/Export
   MVP COMPLETO - Gestor de Finanzas Personal

FEATURES
1. Autenticación

Registro (email, password, nombre)
Login
Logout
Recuperar contraseña
Editar perfil (nombre, email, foto)


2. Transacciones
Crear transacción:

Monto (decimal)
Tipo (Ingreso/Gasto)
Categoría (dropdown)
Subcategoría (opcional)
Cuenta (dropdown)
Fecha
Descripción (opcional)
Etiquetas (tags múltiples)
Adjuntar imagen de recibo (opcional)
Marcar como recurrente:

Frecuencia: Diaria/Semanal/Mensual/Anual
Fecha fin (opcional)



Listar transacciones:

Vista tabla paginada
Vista calendario
Filtros:

Rango de fechas
Categoría
Subcategoría
Tipo (ingreso/gasto)
Cuenta
Etiquetas
Monto (rango min-max)
Recurrentes (sí/no)


Ordenar: fecha, monto, categoría
Búsqueda por descripción
Acciones: editar, eliminar, duplicar
Selección múltiple (editar/eliminar en masa)
Export: CSV, Excel, PDF

Editar transacción:

Individual
Masiva (cambiar categoría/cuenta de múltiples)

Eliminar transacción:

Individual
Múltiple

Transacciones recurrentes:

Vista separada de recurrentes activas
Sistema auto-genera según frecuencia
Pausar/reanudar recurrente
Editar (aplica a futuras)


3. Categorías
Categorías predefinidas iniciales:
Ingresos:

Salario
Freelance
Inversiones
Otros ingresos

Gastos:

Vivienda
Comida
Transporte
Entretenimiento
Salud
Educación
Ropa
Tecnología
Mascotas
Regalos
Otros gastos

Gestión de categorías (Vista: Categorías o Configuración > Categorías):
Tabla de categorías:

Nombre
Color
Icono
Tipo (Ingreso/Gasto)
Número de transacciones
Acciones: Editar, Eliminar, Archivar

Crear categoría personalizada:

Nombre
Color (selector)
Icono (selector de iconos/emoji)
Tipo (Ingreso/Gasto)
Subcategorías (lista):

Agregar ilimitadas
Editar
Eliminar



Editar categoría:

Modificar cualquier campo
Agregar/editar/eliminar subcategorías
Si tiene transacciones: modal "¿Aplicar a transacciones existentes?"

Eliminar categoría:

Si tiene transacciones: no se puede eliminar
Opciones:

Archivar (oculta pero transacciones la mantienen)
Reasignar transacciones a otra categoría → eliminar


Sin transacciones: eliminar directo

Archivar categoría:

No aparece en dropdowns
Transacciones existentes la mantienen
Puede desarchivar

Ordenar categorías:

Drag & drop
Orden personalizado en dropdowns

Categorías favoritas:

Marcar como favorita
Aparecen primero en dropdowns

Acceso rápido al crear transacción:

En dropdown de categorías: botón "+ Nueva categoría"
Mini-modal inline:

Nombre
Color rápido
Crear


Se selecciona automáticamente


4. Cuentas
Tipos de cuenta:

Efectivo
Cuenta bancaria
Tarjeta de crédito
Ahorros
Inversiones
Billetera digital

Gestión de cuentas:
Tabla:

Nombre
Tipo
Balance actual
Color
Estado (activa/inactiva)

Crear cuenta:

Nombre
Tipo (dropdown)
Balance inicial
Color
Moneda
Icono

Balance automático:

Balance inicial + ingresos - gastos

Transferencias entre cuentas:

Restar de origen
Sumar a destino
No afecta balance total
Se registra como tipo "Transferencia"

Ajuste manual:

Para correcciones
Se registra como transacción especial


5. Presupuestos
Definir presupuesto:

Por categoría
Monto mensual
Puede variar por mes

Vista presupuestos:
Para cada categoría:

Presupuesto: $X
Gastado: $Y
Restante: $Z
Barra de progreso
Estado visual:

Verde: <80%
Amarillo: 80-100%
Rojo: >100%


Días restantes del mes

Alertas:

50% alcanzado
80% alcanzado
100% excedido

Presupuesto total:

Suma de categorías
Comparar con ingresos

Copiar presupuesto:

Del mes anterior
Ajustar % (+10%, -20%, etc.)


6. Dashboard
Cards superiores:

Balance total (todas las cuentas)
Ingresos del mes
Gastos del mes
Balance del mes
% cambio vs mes anterior

Gráficos:

Pie chart: Gastos por categoría

Mes actual
Con porcentajes
Click → ver transacciones


Line chart: Ingresos vs Gastos

Últimos 6 meses
2 líneas + área de balance


Bar chart: Top 5 categorías

Donde más gastas
Mes actual


Progress bars: Presupuestos

Top 5 categorías
Estado visual


Area chart: Balance cuentas

Evolución temporal
Stacked por cuenta



Widgets:

Últimas 10 transacciones
Próximos pagos recurrentes
Resumen rápido:

Gasto promedio diario
Día más caro
Categoría más usada


Alertas/notificaciones

Filtro de período:

Este mes (default)
Mes pasado
Últimos 3/6 meses
Este año
Año pasado
Custom (rango)


7. Reportes
Tipos de reportes:
A) Mensual:

Selector: mes/año
Resumen:

Total ingresos/gastos/balance
Comparación mes anterior


Gastos por categoría (tabla + gráfico)
Ingresos por categoría
Tendencia diaria (line chart)
Balance por cuenta

B) Anual:

Selector: año
Total ingresos/gastos/balance
Comparación mes a mes (bar chart)
Top 5 categorías del año
Mes más caro/barato
Promedio mensual
Breakdown trimestral

C) Por Categoría:

Selector: categoría + rango fechas
Total gastado
Promedio mensual
Tendencia temporal (line chart)
Lista transacciones
Breakdown subcategorías
Top descripciones frecuentes

D) Por Cuenta:

Selector: cuenta + rango fechas
Balance inicial/final
Total ingresos/gastos
Evolución balance (line chart)
Categorías más usadas
Lista transacciones

E) Comparativo:

Comparar 2 períodos
Diferencias absolutas y %
Categorías con mayor cambio
Gráficos lado a lado

Export:

PDF
Excel
CSV
Imagen


8. Metas de Ahorro
Crear meta:

Nombre
Monto objetivo
Fecha límite
Cuenta destino
Imagen/emoji
Prioridad

Contribuir:

Manual: aportar monto
Automático: aportar cada período
Regla: diferencia presupuesto → meta

Dashboard metas:

Objetivo vs Ahorrado
% progreso
Restante
Días restantes
Necesitas ahorrar: $/mes y $/día
Estado: En camino/Atrasado/Difícil
Gráfico progreso (real vs ideal)

Gestión:

Lista todas las metas
Ordenar: prioridad/fecha/progreso
Archivar completadas
Historial contribuciones


9. Notificaciones y Recordatorios
Automáticas:

"Agregar transacciones hoy"
"Pago X vence mañana"
"Presupuesto Y al 80%"
"Hace 7 días sin agregar"

Personalizadas:

Usuario crea recordatorios
Frecuencia configurable
Anticipación

Centro notificaciones:

Lista todas
Marcar leídas
Snooze
Descartar

Canales:

Email
Push (móvil)
In-app


10. Etiquetas (Tags)
Usar tags:

Agregar múltiples a transacción
Ejemplos: #urgente, #trabajo, #deducible

Vista tags:

Lista todos los tags
Count por tag
Click → transacciones con ese tag

Filtrar:

En transacciones
En reportes

Auto-sugerencia:

Sugiere existentes
Previene duplicados


11. Gastos Compartidos
Crear gasto compartido:

Transacción + "compartido con"
Seleccionar personas
Dividir: equitativo o custom

Dashboard compartidos:

Balances: quién debe a quién
Historial gastos compartidos
Liquidar (marcar como pagado)


12. Búsqueda Global
Barra búsqueda:

Busca en: transacciones, categorías, cuentas, metas, presupuestos
Resultados agrupados por tipo
Click → ver detalle


13. Configuración
Perfil:

Nombre, email, foto
Cambiar password
Eliminar cuenta

Preferencias:

Moneda principal
Idioma
Formato fecha
Primer día semana
Zona horaria

Notificaciones:

Toggle por tipo
Frecuencia
Email/Push on/off

Privacidad:

Modo incógnito
Bloqueo PIN/biométrico
Exportar datos
Eliminar datos

Apariencia:

Tema: claro/oscuro/auto
Color accent
Tamaño fuente

Import/Export:

Importar CSV (mapeo columnas)
Exportar CSV/JSON
Backup completo
Restaurar backup