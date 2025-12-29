import { z } from "zod";

// Email válido
const emailSchema = z
  .string()
  .email("Debe ser un correo electrónico válido");

// Password con mínimo 8 caracteres
const passwordSchema = z
  .string()
  .min(8, "La contraseña debe tener al menos 8 caracteres");

// 🔹 Login: solo email + password
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

// 🔹 Signup: email + password + confirmPassword
export const signupSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().nonempty("Debes confirmar tu contraseña"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

// 🔹 Tipos
export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
