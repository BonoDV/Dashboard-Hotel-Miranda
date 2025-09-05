/**
 * Utilidades para manejar fechas en inputs datetime-local
 * Soluciona problemas de zona horaria y formato
 */

/**
 * Convierte una fecha a formato local para input datetime-local
 * @param date - La fecha a convertir
 * @returns String en formato YYYY-MM-DDTHH:mm para input datetime-local
 */
export function formatDateForInput(date: Date | null): string {
  if (!date) return "";
  const pad = (n: number) => n.toString().padStart(2, "0");
  return (
    date.getFullYear() +
    "-" +
    pad(date.getMonth() + 1) +
    "-" +
    pad(date.getDate()) +
    "T" +
    pad(date.getHours()) +
    ":" +
    pad(date.getMinutes())
  );
}

/**
 * Convierte un valor de input datetime-local a Date
 * @param value - El valor del input (formato YYYY-MM-DDTHH:mm)
 * @returns Date object o null si el valor está vacío
 */
export const parseInputDate = (value: string): Date | null => {
  if (!value) return null;

  // Crear fecha directamente desde el valor del input
  // Esto preserva la zona horaria local
  return new Date(value);
};

/**
 * Obtiene la fecha actual en formato local para input datetime-local
 * @returns String en formato YYYY-MM-DDTHH:mm
 */
export const getCurrentDateForInput = (): string => {
  return formatDateForInput(new Date());
};

/**
 * Formatea una fecha para mostrarla en el formato 'DD/MM/YYYY HH:MM'
 * Soporta fechas como objetos Date o strings en formato ISO
 * @param date - La fecha a formatear
 * @returns String en formato 'DD/MM/YYYY HH:MM'
 */
export function formatDateTimeDisplay(
  date: Date | string | null | undefined
): string {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => n.toString().padStart(2, "0");
  const day = pad(d.getDate());
  const month = pad(d.getMonth() + 1);
  const year = d.getFullYear();
  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}
