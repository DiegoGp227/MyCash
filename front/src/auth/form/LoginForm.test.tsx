import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "./LoginForm";

// 1. MOCKS: Simulamos las dependencias externas
vi.mock("../hooks/useLogin", () => ({
  useLogin: vi.fn(),
}));

vi.mock("lucide-react", () => ({
  SendHorizontal: () => <div data-testid="send-icon">Send Icon</div>,
  Eye: () => <div data-testid="eye-icon">Eye</div>,
  EyeClosed: () => <div data-testid="eye-closed-icon">EyeClosed</div>,
}));

// Importamos después de los mocks
import { useLogin } from "../hooks/useLogin";

describe("LoginForm", () => {
  // 2. SETUP: Configuramos mocks antes de cada test
  const mockLogin = vi.fn();

  beforeEach(() => {
    // Reseteamos los mocks antes de cada test
    vi.clearAllMocks();

    // Configuración por defecto del hook useLogin
    (useLogin as any).mockReturnValue({
      login: mockLogin,
      isLoading: false,
      error: null,
    });
  });

  // 3. TEST: Renderización básica
  it("debería renderizar el formulario correctamente", () => {
    render(<LoginForm />);

    // Verificamos que los elementos principales estén presentes
    expect(screen.getByRole("textbox", { name: /email/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/password.*\*/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send/i })).toBeInTheDocument();
  });

  // 4. TEST: Validación de email vacío
  it("debería mostrar error cuando el email está vacío", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const passwordInput = screen.getByLabelText(/password.*\*/i);
    const submitButton = screen.getByRole("button", { name: /send/i });

    // Llenamos solo el password pero no el email
    await user.type(passwordInput, "password123");
    await user.click(submitButton);

    // Esperamos que aparezca el mensaje de error
    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    });

    // Verificamos que NO se llamó la función login
    expect(mockLogin).not.toHaveBeenCalled();
  });

  // 5. TEST: Validación de contraseña corta
  it("debería mostrar error cuando la contraseña es muy corta", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const passwordInput = screen.getByLabelText(/password.*\*/i);
    const submitButton = screen.getByRole("button", { name: /send/i });

    // Rellenamos con email válido pero contraseña corta
    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "123"); // Menos de 8 caracteres
    await user.click(submitButton);

    // Esperamos el error de contraseña
    await waitFor(() => {
      expect(
        screen.getByText(/password must be at least 8 characters/i)
      ).toBeInTheDocument();
    });

    expect(mockLogin).not.toHaveBeenCalled();
  });

  // 6. TEST: Submit exitoso con credenciales válidas
  it("debería llamar login cuando las credenciales son válidas", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const passwordInput = screen.getByLabelText(/password.*\*/i);
    const submitButton = screen.getByRole("button", { name: /send/i });

    // Rellenamos con credenciales válidas
    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");
    await user.click(submitButton);

    // Verificamos que se llamó login con los datos correctos
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
    });
  });

  // 7. TEST: Mostrar/ocultar contraseña
  it("debería alternar la visibilidad de la contraseña", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const passwordInput = screen.getByLabelText(/password.*\*/i) as HTMLInputElement;
    const toggleButton = screen.getByRole("button", {
      name: /show password/i,
    });

    // Inicialmente debe ser tipo "password"
    expect(passwordInput.type).toBe("password");

    // Clickeamos para mostrar
    await user.click(toggleButton);
    expect(passwordInput.type).toBe("text");

    // Clickeamos para ocultar nuevamente
    await user.click(toggleButton);
    expect(passwordInput.type).toBe("password");
  });

  // 8. TEST: Estado de loading
  it("debería deshabilitar el formulario cuando está cargando", () => {
    // Configuramos el mock para simular loading
    (useLogin as any).mockReturnValue({
      login: mockLogin,
      isLoading: true,
      error: null,
    });

    render(<LoginForm />);

    const emailInput = screen.getByRole("textbox", { name: /email/i }) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(/password.*\*/i) as HTMLInputElement;
    const submitButton = screen.getByRole("button", {
      name: /loading/i,
    }) as HTMLButtonElement;

    // Verificamos que los campos estén deshabilitados
    expect(emailInput.disabled).toBe(true);
    expect(passwordInput.disabled).toBe(true);
    expect(submitButton.disabled).toBe(true);
    expect(submitButton.textContent).toMatch(/loading/i);
  });

  // 9. TEST: Mostrar error de la API
  it("debería mostrar error cuando el login falla", () => {
    const errorMessage = "Invalid credentials";

    // Configuramos el mock para simular un error
    (useLogin as any).mockReturnValue({
      login: mockLogin,
      isLoading: false,
      error: errorMessage,
    });

    render(<LoginForm />);

    // Verificamos que se muestre el mensaje de error
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  // 10. TEST: Campo email permite escribir
  it("debería permitir escribir en el campo de email", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const emailInput = screen.getByRole("textbox", { name: /email/i }) as HTMLInputElement;

    await user.type(emailInput, "usuario@test.com");

    expect(emailInput.value).toBe("usuario@test.com");
  });

  // 11. TEST: Campo password permite escribir
  it("debería permitir escribir en el campo de password", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const passwordInput = screen.getByLabelText(/password.*\*/i) as HTMLInputElement;

    await user.type(passwordInput, "miContraseña123");

    expect(passwordInput.value).toBe("miContraseña123");
  });

  // 12. TEST: Verificar que los iconos se renderizan
  it("debería renderizar los iconos correctamente", () => {
    render(<LoginForm />);

    // Verificamos que el icono de send esté presente
    expect(screen.getByTestId("send-icon")).toBeInTheDocument();

    // El icono de EyeClosed debe estar visible inicialmente
    expect(screen.getByTestId("eye-closed-icon")).toBeInTheDocument();
  });
});
