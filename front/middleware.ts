import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Rutas accesibles sin token
const PUBLIC_ROUTES = ["/auth"];
// Rutas que requieren token pero no redirigen a / si ya está autenticado
const AUTHENTICATED_ROUTES = ["/onboarding"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  const isPublic = PUBLIC_ROUTES.some((route) => pathname.startsWith(route));
  const isAuthenticated = AUTHENTICATED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  // Sin token en ruta protegida → /auth
  if (!token && !isPublic) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  // Con token en /auth → dashboard (no al onboarding, el usuario ya existe)
  if (token && isPublic) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // /onboarding solo accesible con token (ya cubierto arriba, explícito por claridad)
  if (!token && isAuthenticated) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Aplica a todas las rutas excepto archivos estáticos y assets de Next.js
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
