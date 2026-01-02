# Guía de Testing con Vitest

## ¿Qué son los tests unitarios?

Los tests unitarios son **pequeñas pruebas automáticas** que verifican que tu código funciona correctamente. En lugar de abrir el navegador y probar manualmente cada vez que haces un cambio, los tests lo hacen por ti en segundos.

---

## Instalación (Ya está hecho ✅)

Ya tienes todo configurado en este proyecto:
- ✅ Vitest (framework de testing)
- ✅ @testing-library/react (utilidades para probar componentes React)
- ✅ @testing-library/user-event (simular interacciones de usuario)
- ✅ @testing-library/jest-dom (matchers adicionales para verificaciones)

---

## Comandos disponibles

### 1. Ejecutar todos los tests
```bash
cd front
pnpm test
```
Esto ejecutará todos los tests en modo "watch" - cada vez que guardes un archivo, los tests se ejecutarán automáticamente.

### 2. Ejecutar tests una sola vez
```bash
pnpm test --run
```
Útil para CI/CD o cuando solo quieres verificar una vez.

### 3. Ejecutar un test específico
```bash
pnpm test LoginForm.test.tsx
```
Solo ejecuta los tests de ese archivo.

### 4. Ver cobertura de código
```bash
pnpm test:coverage
```
Te muestra qué porcentaje de tu código está cubierto por tests.

### 5. Interfaz visual (opcional)
```bash
pnpm test:ui
```
Abre una interfaz web para ver y ejecutar tests de forma visual.

---

## Anatomía de un test

Veamos un ejemplo del archivo `LoginForm.test.tsx`:

```typescript
it("debería renderizar el formulario correctamente", () => {
  // 1. ARRANGE: Preparar el escenario
  render(<LoginForm />);

  // 2. ACT: Realizar acciones (en este caso solo renderizar)
  // (no aplica aquí)

  // 3. ASSERT: Verificar el resultado esperado
  expect(screen.getByRole("textbox", { name: /email/i })).toBeInTheDocument();
  expect(screen.getByLabelText(/password.*\*/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /send/i })).toBeInTheDocument();
});
```

### Patrón AAA (Arrange-Act-Assert)

1. **Arrange** (Preparar): Configurar el escenario del test
2. **Act** (Actuar): Realizar la acción que quieres probar
3. **Assert** (Afirmar): Verificar que el resultado es el esperado

---

## Conceptos clave explicados

### 1. Mocks (Simulaciones)

Los mocks son **simulaciones de código real**. Los usamos cuando no queremos que el test dependa de cosas externas.

Ejemplo en nuestros tests:
```typescript
vi.mock("../hooks/useLogin", () => ({
  useLogin: vi.fn(),
}));
```

**¿Por qué?**
- No queremos hacer llamadas reales a la API durante los tests
- Queremos controlar exactamente qué devuelve el hook
- Los tests son más rápidos y predecibles

### 2. beforeEach

Se ejecuta **antes de cada test** para resetear el estado:

```typescript
beforeEach(() => {
  vi.clearAllMocks(); // Limpia todos los mocks

  (useLogin as any).mockReturnValue({
    login: mockLogin,
    isLoading: false,
    error: null,
  });
});
```

### 3. Seleccionar elementos (Queries)

Hay varias formas de seleccionar elementos en la pantalla:

```typescript
// Por rol (RECOMENDADO - es como el usuario ve la página)
screen.getByRole("textbox", { name: /email/i })
screen.getByRole("button", { name: /send/i })

// Por label text
screen.getByLabelText(/password/i)

// Por texto visible
screen.getByText(/invalid email/i)

// Por test id (usar solo cuando no hay otra opción)
screen.getByTestId("send-icon")
```

**Orden de preferencia:**
1. `getByRole` - Simula cómo un usuario accesible vería la página
2. `getByLabelText` - Para inputs con labels
3. `getByText` - Para texto visible
4. `getByTestId` - Último recurso

### 4. user-event vs fireEvent

Siempre usa `userEvent` porque simula mejor las interacciones reales:

```typescript
// ✅ CORRECTO - Simula cómo un usuario real escribe
await user.type(emailInput, "test@example.com");
await user.click(submitButton);

// ❌ EVITAR - No simula el comportamiento real
fireEvent.change(emailInput, { target: { value: "test@example.com" } });
```

### 5. waitFor (Esperar cambios asíncronos)

Cuando esperas que algo aparezca después de una acción:

```typescript
await user.click(submitButton);

// Esperar a que aparezca el mensaje de error
await waitFor(() => {
  expect(screen.getByText(/email is required/i)).toBeInTheDocument();
});
```

---

## Tipos de tests en LoginForm.test.tsx

### 1. Test de renderización
```typescript
it("debería renderizar el formulario correctamente", () => {
  render(<LoginForm />);
  expect(screen.getByRole("textbox", { name: /email/i })).toBeInTheDocument();
});
```
**Propósito:** Verificar que todos los elementos se muestran correctamente.

---

### 2. Test de validación
```typescript
it("debería mostrar error cuando el email está vacío", async () => {
  const user = userEvent.setup();
  render(<LoginForm />);

  const submitButton = screen.getByRole("button", { name: /send/i });
  await user.click(submitButton);

  await waitFor(() => {
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
  });
});
```
**Propósito:** Verificar que las validaciones de Zod funcionan correctamente.

---

### 3. Test de interacción de usuario
```typescript
it("debería alternar la visibilidad de la contraseña", async () => {
  const user = userEvent.setup();
  render(<LoginForm />);

  const passwordInput = screen.getByLabelText(/password.*\*/i) as HTMLInputElement;
  const toggleButton = screen.getByRole("button", { name: /show password/i });

  expect(passwordInput.type).toBe("password");
  await user.click(toggleButton);
  expect(passwordInput.type).toBe("text");
});
```
**Propósito:** Verificar que el botón de mostrar/ocultar contraseña funciona.

---

### 4. Test de submit exitoso
```typescript
it("debería llamar login cuando las credenciales son válidas", async () => {
  const user = userEvent.setup();
  render(<LoginForm />);

  const emailInput = screen.getByRole("textbox", { name: /email/i });
  const passwordInput = screen.getByLabelText(/password.*\*/i);
  const submitButton = screen.getByRole("button", { name: /send/i });

  await user.type(emailInput, "test@example.com");
  await user.type(passwordInput, "password123");
  await user.click(submitButton);

  await waitFor(() => {
    expect(mockLogin).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });
  });
});
```
**Propósito:** Verificar que al enviar el formulario se llama a la función de login con los datos correctos.

---

### 5. Test de estados (loading, error)
```typescript
it("debería deshabilitar el formulario cuando está cargando", () => {
  (useLogin as any).mockReturnValue({
    login: mockLogin,
    isLoading: true,
    error: null,
  });

  render(<LoginForm />);

  const emailInput = screen.getByRole("textbox", { name: /email/i }) as HTMLInputElement;
  expect(emailInput.disabled).toBe(true);
});
```
**Propósito:** Verificar que el formulario se deshabilita durante la carga.

---

## Cómo crear nuevos tests

### Paso 1: Crear el archivo de test

Nombra tu archivo igual que el componente pero con `.test.tsx`:
```
LoginForm.tsx → LoginForm.test.tsx
SignUpForm.tsx → SignUpForm.test.tsx
```

### Paso 2: Estructura básica

```typescript
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TuComponente from "./TuComponente";

// Mocks necesarios
vi.mock("../hooks/tuHook", () => ({
  useTuHook: vi.fn(),
}));

describe("TuComponente", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debería hacer algo", () => {
    render(<TuComponente />);
    // Tus verificaciones aquí
  });
});
```

### Paso 3: Escribir tests siguiendo el patrón AAA

1. **Arrange:** Renderiza el componente y obtén los elementos necesarios
2. **Act:** Simula las acciones del usuario
3. **Assert:** Verifica que el resultado es el esperado

---

## Errores comunes y soluciones

### Error: "toBeInTheDocument is not a function"
**Solución:** Ya configurado en `src/test/setup.ts`. Si ves este error, verifica que el archivo exista.

### Error: "Multiple elements found"
**Solución:** Usa selectores más específicos:
```typescript
// ❌ Ambiguo
screen.getByText("Password")

// ✅ Específico
screen.getByLabelText(/password.*\*/i)
screen.getByRole("textbox", { name: /email/i })
```

### Error: "Element not found"
**Solución:** Usa `waitFor` si el elemento aparece después de una acción asíncrona:
```typescript
await user.click(button);

await waitFor(() => {
  expect(screen.getByText("Success")).toBeInTheDocument();
});
```

### Error: Tests muy lentos
**Solución:**
- No uses `setTimeout` o `sleep`, usa `waitFor`
- Mockea las llamadas a API
- Evita renderizar componentes pesados innecesariamente

---

## Mejores prácticas

### ✅ DO (Hacer)

1. **Prueba comportamiento, no implementación**
   ```typescript
   // ✅ Bueno - prueba lo que el usuario ve
   expect(screen.getByText("Welcome")).toBeInTheDocument();

   // ❌ Malo - prueba detalles internos
   expect(component.state.userName).toBe("John");
   ```

2. **Usa roles y labels accesibles**
   ```typescript
   // ✅ Accesible
   screen.getByRole("button", { name: /submit/i })

   // ❌ No accesible
   screen.getByClassName("submit-btn")
   ```

3. **Cada test debe ser independiente**
   - Un test NO debe depender de otro
   - Usa `beforeEach` para resetear el estado

4. **Tests descriptivos**
   ```typescript
   // ✅ Claro
   it("debería mostrar error cuando el email está vacío", ...)

   // ❌ Vago
   it("test email", ...)
   ```

### ❌ DON'T (No hacer)

1. **No pruebes detalles de implementación**
2. **No uses selectores frágiles** (clases CSS, IDs innecesarios)
3. **No copies y pegues tests** sin entenderlos
4. **No hagas tests demasiado largos** - divide en tests más pequeños

---

## Recursos adicionales

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Library Cheatsheet](https://testing-library.com/docs/react-testing-library/cheatsheet)
- [Common Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

## Siguiente paso

Ahora que entiendes los tests del LoginForm, intenta:

1. **Ejecutar los tests:** `pnpm test`
2. **Romper algo:** Cambia el texto de un botón y ve cómo falla el test
3. **Arreglarlo:** Actualiza el test para que coincida
4. **Crear tests para SignUpForm:** Usa LoginForm.test.tsx como plantilla

¡Happy testing! 🧪
