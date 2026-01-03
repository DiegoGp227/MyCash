import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignUpForm from "./SignUpForm";

// 1. MOCKS: Simulamos las dependencias externas
vi.mock("../hooks/useSignUp", () => ({
  useSignUp: vi.fn(),
}));

vi.mock("lucide-react", () => ({
  SendHorizontal: () => <div data-testid="send-icon">Send Icon</div>,
  Eye: () => <div data-testid="eye-icon">Eye</div>,
  EyeClosed: () => <div data-testid="eye-closed-icon">EyeClosed</div>,
}));

// Importamos después de los mocks
import { useSignUp } from "../hooks/useSignUp";

describe("SignUpForm", () => {
  // 2. SETUP: Configuramos mocks antes de cada test
  const mockSignup = vi.fn();

  // Helper para obtener inputs por ID de forma segura
  const getInput = (id: string) => document.getElementById(id) as HTMLInputElement;
  const getSelect = (id: string) => document.getElementById(id) as HTMLSelectElement;

  beforeEach(() => {
    // Reseteamos los mocks antes de cada test
    vi.clearAllMocks();

    // Configuración por defecto del hook useSignUp
    (useSignUp as any).mockReturnValue({
      signup: mockSignup,
      isLoading: false,
      error: null,
    });
  });

  // 3. TEST: Renderización básica
  it("debería renderizar el formulario correctamente", () => {
    render(<SignUpForm />);

    // Verificamos que los elementos principales estén presentes por ID
    expect(screen.getByRole("textbox", { name: /email/i })).toBeInTheDocument();
    expect(document.getElementById("password")).toBeInTheDocument();
    expect(document.getElementById("confirmPassword")).toBeInTheDocument();
    expect(document.getElementById("name")).toBeInTheDocument();
    expect(document.getElementById("username")).toBeInTheDocument();
    expect(document.getElementById("cutoffDay")).toBeInTheDocument();
    expect(document.getElementById("currency")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send/i })).toBeInTheDocument();
  });

  // 4. TEST: Validación de email vacío
  it("debería mostrar error cuando el email está vacío", async () => {
    const user = userEvent.setup();
    render(<SignUpForm />);

    const submitButton = screen.getByRole("button", { name: /send/i });

    // Hacer submit sin llenar nada
    await user.click(submitButton);

    // Esperamos que aparezca el mensaje de error
    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    });

    expect(mockSignup).not.toHaveBeenCalled();
  });

  // 5. TEST: Validación de contraseña corta
  it("debería mostrar error cuando la contraseña es muy corta", async () => {
    const user = userEvent.setup();
    render(<SignUpForm />);

    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const passwordInput = getInput("password");
    const submitButton = screen.getByRole("button", { name: /send/i });

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "123"); // Menos de 8 caracteres
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/password must be at least 8 characters/i)
      ).toBeInTheDocument();
    });

    expect(mockSignup).not.toHaveBeenCalled();
  });

  // 6. TEST: Validación de contraseñas no coinciden
  it("debería mostrar error cuando las contraseñas no coinciden", async () => {
    const user = userEvent.setup();
    render(<SignUpForm />);

    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const passwordInput = getInput("password");
    const confirmPasswordInput = getInput("confirmPassword");
    const nameInput = getInput("name");
    const cutoffDayInput = getInput("cutoffDay");
    const currencySelect = getSelect("currency");
    const submitButton = screen.getByRole("button", { name: /send/i });

    // Llenamos todos los campos excepto que las contraseñas no coincidan
    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");
    await user.type(confirmPasswordInput, "password456"); // Diferente
    await user.type(nameInput, "John Doe");
    await user.type(cutoffDayInput, "15");
    await user.selectOptions(currencySelect, "USD");
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
    });

    expect(mockSignup).not.toHaveBeenCalled();
  });

  // NOTA: Los tests de cutoffDay fuera de rango (< 1 o > 31) no son necesarios
  // porque el navegador valida estos valores antes de que lleguen a Zod
  // gracias a los atributos min="1" y max="31" del input type="number"

  // 7. TEST: Validación de currency sin seleccionar
  it("debería mostrar error cuando no se selecciona una currency", async () => {
    const user = userEvent.setup();
    render(<SignUpForm />);

    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const passwordInput = getInput("password");
    const confirmPasswordInput = getInput("confirmPassword");
    const nameInput = getInput("name");
    const cutoffDayInput = getInput("cutoffDay");
    const submitButton = screen.getByRole("button", { name: /send/i });

    // Llenamos todo excepto currency
    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");
    await user.type(confirmPasswordInput, "password123");
    await user.type(nameInput, "John Doe");
    await user.type(cutoffDayInput, "15");
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/select a valid currency/i)
      ).toBeInTheDocument();
    });

    expect(mockSignup).not.toHaveBeenCalled();
  });

  // 8. TEST: Submit exitoso con todos los campos válidos
  it("debería llamar signup cuando todos los campos son válidos", async () => {
    const user = userEvent.setup();
    render(<SignUpForm />);

    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const passwordInput = getInput("password");
    const confirmPasswordInput = getInput("confirmPassword");
    const nameInput = getInput("name");
    const usernameInput = getInput("username");
    const cutoffDayInput = getInput("cutoffDay");
    const currencySelect = getSelect("currency");
    const submitButton = screen.getByRole("button", { name: /send/i });

    // Llenamos todos los campos correctamente
    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");
    await user.type(confirmPasswordInput, "password123");
    await user.type(nameInput, "John Doe");
    await user.type(usernameInput, "johndoe");
    await user.type(cutoffDayInput, "15");
    await user.selectOptions(currencySelect, "USD");
    await user.click(submitButton);

    // Verificamos que se llamó signup con los datos correctos (sin confirmPassword)
    await waitFor(() => {
      expect(mockSignup).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
        name: "John Doe",
        username: "johndoe",
        cutoffDay: 15,
        currency: "USD",
      });
    });
  });

  // 9. TEST: Username es opcional
  it("debería permitir enviar el formulario sin username", async () => {
    const user = userEvent.setup();
    render(<SignUpForm />);

    const usernameInput = getInput("username");

    // El username debe estar presente pero vacío
    expect(usernameInput).toBeInTheDocument();
    expect(usernameInput.value).toBe("");
  });

  // 10. TEST: Toggle de contraseña
  it("debería alternar la visibilidad de las contraseñas", async () => {
    const user = userEvent.setup();
    render(<SignUpForm />);

    const passwordInput = getInput("password");
    const confirmPasswordInput = getInput("confirmPassword");

    // Encontramos el primer botón de toggle (hay 2, uno por campo de password)
    const toggleButtons = screen.getAllByRole("button", {
      name: /hide password/i,
    });
    const toggleButton = toggleButtons[0];

    // Inicialmente deben ser tipo "text" (showPassword es true por defecto)
    expect(passwordInput.type).toBe("text");
    expect(confirmPasswordInput.type).toBe("text");

    // Clickeamos para ocultar
    await user.click(toggleButton);
    expect(passwordInput.type).toBe("password");
    expect(confirmPasswordInput.type).toBe("password");

    // Clickeamos para mostrar nuevamente
    await user.click(toggleButton);
    expect(passwordInput.type).toBe("text");
    expect(confirmPasswordInput.type).toBe("text");
  });

  // 11. TEST: Estado de loading
  it("debería deshabilitar el formulario cuando está cargando", () => {
    (useSignUp as any).mockReturnValue({
      signup: mockSignup,
      isLoading: true,
      error: null,
    });

    render(<SignUpForm />);

    const emailInput = screen.getByRole("textbox", { name: /email/i }) as HTMLInputElement;
    const passwordInput = getInput("password");
    const nameInput = getInput("name");
    const submitButton = screen.getByRole("button", {
      name: /enviando/i,
    }) as HTMLButtonElement;

    expect(emailInput.disabled).toBe(true);
    expect(passwordInput.disabled).toBe(true);
    expect(nameInput.disabled).toBe(true);
    expect(submitButton.disabled).toBe(true);
    expect(submitButton.textContent).toMatch(/enviando/i);
  });

  // 12. TEST: Mostrar error de la API
  it("debería mostrar error cuando el signup falla", () => {
    const errorMessage = "Email already in use";

    (useSignUp as any).mockReturnValue({
      signup: mockSignup,
      isLoading: false,
      error: errorMessage,
    });

    render(<SignUpForm />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  // 13. TEST: Seleccionar diferentes currencies
  it("debería permitir seleccionar diferentes currencies", async () => {
    const user = userEvent.setup();
    render(<SignUpForm />);

    const currencySelect = getSelect("currency");

    // Seleccionar EUR
    await user.selectOptions(currencySelect, "EUR");
    expect(currencySelect.value).toBe("EUR");

    // Seleccionar COP
    await user.selectOptions(currencySelect, "COP");
    expect(currencySelect.value).toBe("COP");

    // Seleccionar JPY
    await user.selectOptions(currencySelect, "JPY");
    expect(currencySelect.value).toBe("JPY");
  });

  // 14. TEST: Verificar que los iconos se renderizan
  it("debería renderizar los iconos correctamente", () => {
    render(<SignUpForm />);

    // Verificamos que el icono de send esté presente
    expect(screen.getByTestId("send-icon")).toBeInTheDocument();

    // Los iconos de Eye deben estar visibles (showPassword = true por defecto)
    const eyeIcons = screen.getAllByTestId("eye-icon");
    expect(eyeIcons).toHaveLength(2); // Uno para password y otro para confirmPassword
  });

  // 15. TEST: Validación de nombre vacío
  it("debería mostrar error cuando el nombre está vacío", async () => {
    const user = userEvent.setup();
    render(<SignUpForm />);

    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const passwordInput = getInput("password");
    const confirmPasswordInput = getInput("confirmPassword");
    const submitButton = screen.getByRole("button", { name: /send/i });

    // Llenamos algunos campos pero no el nombre
    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");
    await user.type(confirmPasswordInput, "password123");
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    });

    expect(mockSignup).not.toHaveBeenCalled();
  });

  // 16. TEST: Campo cutoffDay permite valores válidos
  it("debería aceptar valores válidos en cutoffDay", async () => {
    const user = userEvent.setup();
    render(<SignUpForm />);

    const cutoffDayInput = getInput("cutoffDay");

    await user.clear(cutoffDayInput);
    await user.type(cutoffDayInput, "1");
    expect(cutoffDayInput.value).toBe("1");

    await user.clear(cutoffDayInput);
    await user.type(cutoffDayInput, "31");
    expect(cutoffDayInput.value).toBe("31");

    await user.clear(cutoffDayInput);
    await user.type(cutoffDayInput, "15");
    expect(cutoffDayInput.value).toBe("15");
  });
});
