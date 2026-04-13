# Feedback de Arquitectura — MyCash Frontend

> Fecha: 2026-03-04

---

## Nivel general

**Intermedio — bueno para un proyecto personal**, pero con confusiones conceptuales que hay que corregir antes de que escalen.

---

## Lo que está bien

- **Separación `app/` vs `src/`** — La decisión más madura del proyecto. La lógica de negocio (hooks, services, schemas) está fuera de la UI.
- **Zustand en `store/`**, providers separados, services en su propia capa — refleja pensamiento en separación de responsabilidades.
- **Backend modular** (`auth/`, `categories/`) siguiendo el mismo patrón en ambos lados — consistencia entre capas.

---

## Problemas identificados

### 1. El diseño atómico se aplica de forma superficial

El criterio real de clasificación es:

| Nivel | Criterio |
|-------|----------|
| **Atom** | No depende de ningún otro componente propio |
| **Molecule** | Combina 2-3 átomos, sin lógica de negocio propia |
| **Organism** | Tiene lógica, estado, o llama hooks/services |

Aplicarlo solo como "nombres de carpetas" sin respetar el criterio es peor que no aplicarlo, porque da falsa sensación de orden.

### 2. Moléculas que son Organisms

`CategoryDetailsModal`, `CategoryDrawer`, `CategoryForm`, `DeleteConfirmationModal` están en `Molecules/` pero tienen hooks, validación y llaman services. Deben estar en `organism/`.

### 3. Inconsistencia en nombres de carpetas

```
categories/components/Atoms/     ← PascalCase
categories/components/organism/  ← lowercase
auth/components/atoms/           ← lowercase
app/components/molecules/        ← lowercase
```

**Solución:** usar `lowercase` para todas las carpetas de componentes.

### 4. No hay Atoms globales compartidos

`app/components/` tiene `molecules/` y `organism/` pero no `atoms/`. Los átomos reutilizables entre módulos (botones, inputs, badges) deberían vivir en `app/components/atoms/`.

### 5. Organisms duplicados en categories

Existen 3 organisms para el mismo módulo:
- `CategoriesOrganism.tsx`
- `CategoriesSecction.tsx`
- `CategoriesSistem.tsx`

Revisar si los 3 son realmente necesarios o si pueden consolidarse.

### 6. Los charts no siguen el patrón atómico

`src/home/graphs/` tiene 9 componentes visuales fuera de la estructura atómica. Deberían estar en `app/components/` con su nivel correspondiente (Molecule u Organism). Este módulo es el mayor riesgo de volverse caótico.

---

## Prioridades de mejora

| Prioridad | Acción |
|-----------|--------|
| Alta | Unificar convención de nombres de carpetas (todo `lowercase`) |
| Alta | Mover modales/drawers/forms de `Molecules/` a `organism/` |
| Media | Crear `atoms/` global en `app/components/` |
| Media | Mover charts de `src/home/graphs/` a `app/components/` |
| Baja | Consolidar los 3 organisms duplicados de categories |

---

## Conclusión

Para portafolio o proyecto personal: **va bien**. La intención arquitectural es clara y está mejor estructurado que la mayoría a este nivel.

Para producción o equipo: hay que refinar el criterio de clasificación atómica para que un desarrollador nuevo sepa intuitivamente dónde buscar las cosas.
