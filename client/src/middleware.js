import { authMiddleware } from './middlewares/auth';

export function middleware(req, ev) {
  return authMiddleware(req, ev);
}

// Configurar las rutas protegidas
export const config = {
  matcher: ['/dashboard/:path*', '/api/protected/:path*'],
};