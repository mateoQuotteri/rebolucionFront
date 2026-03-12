import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "jwt";

/**
 * Verifica si un token JWT está expirado comparando el claim `exp` con la hora actual.
 * Si el token no tiene `exp`, se considera inválido.
 */
export function isTokenExpired(token) {
  try {
    const decoded = jwtDecode(token);
    if (!decoded.exp) return true; // Sin exp → no confiable
    return Date.now() / 1000 > decoded.exp;
  } catch {
    return true;
  }
}

/**
 * Obtiene el token del almacenamiento. Valida expiración automáticamente.
 * Si el token está expirado o es inválido, lo elimina y retorna null.
 */
export function getToken() {
  // sessionStorage primero (sesión activa del browser)
  let token = sessionStorage.getItem(TOKEN_KEY);

  // Fallback a localStorage para tokens guardados de sesiones anteriores
  // (permite migración transparente sin forzar re-login inmediato)
  if (!token) {
    token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      if (isTokenExpired(token)) {
        clearAuth();
        return null;
      }
      // Migrar a sessionStorage y eliminar de localStorage
      sessionStorage.setItem(TOKEN_KEY, token);
      localStorage.removeItem(TOKEN_KEY);
    }
  }

  if (!token) return null;

  if (isTokenExpired(token)) {
    clearAuth();
    return null;
  }

  return token;
}

/**
 * Guarda el token en sessionStorage (se limpia al cerrar el browser/tab).
 */
export function setToken(token) {
  sessionStorage.setItem(TOKEN_KEY, token);
  // Asegurarse de que no quede en localStorage
  localStorage.removeItem(TOKEN_KEY);
}

/**
 * Elimina todos los datos de autenticación del almacenamiento.
 */
export function clearAuth() {
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem("user");
  sessionStorage.removeItem("isLoggedIn");
  // Limpiar también localStorage por si hay tokens viejos
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("isLoggedIn");
}
