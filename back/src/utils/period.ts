const MONTH_NAMES = [
  "Ene", "Feb", "Mar", "Abr", "May", "Jun",
  "Jul", "Ago", "Sep", "Oct", "Nov", "Dic",
];

export interface Period {
  start: Date;  // inclusive
  end: Date;    // exclusive
  label: string;
}

/**
 * Calcula el período de corte actual del usuario.
 *
 * Si hoy >= cutoffDay → el período va desde cutoffDay de este mes
 *                        hasta cutoffDay del mes siguiente (exclusive).
 * Si hoy <  cutoffDay → el período va desde cutoffDay del mes pasado
 *                        hasta cutoffDay de este mes (exclusive).
 *
 * Ejemplo con cutoffDay=15:
 *   - Hoy 20 Abr → período: 15 Abr – 15 May
 *   - Hoy 10 Abr → período: 15 Mar – 15 Abr
 */
export function getCurrentPeriod(cutoffDay: number, now: Date = new Date()): Period {
  const day = now.getDate();
  const month = now.getMonth();
  const year = now.getFullYear();

  const start =
    day >= cutoffDay
      ? new Date(year, month, cutoffDay)
      : new Date(year, month - 1, cutoffDay);

  const end =
    day >= cutoffDay
      ? new Date(year, month + 1, cutoffDay)
      : new Date(year, month, cutoffDay);

  return { start, end, label: MONTH_NAMES[start.getMonth()] };
}

/**
 * Devuelve los últimos `count` períodos de corte, del más antiguo al más reciente.
 * El último elemento siempre es el período actual.
 */
export function getLastNPeriods(
  cutoffDay: number,
  count: number,
  now: Date = new Date(),
): Period[] {
  const { start: currentStart } = getCurrentPeriod(cutoffDay, now);

  return Array.from({ length: count }, (_, i) => {
    const offset = count - 1 - i; // count-1 … 0
    const start = new Date(
      currentStart.getFullYear(),
      currentStart.getMonth() - offset,
      cutoffDay,
    );
    const end = new Date(
      currentStart.getFullYear(),
      currentStart.getMonth() - offset + 1,
      cutoffDay,
    );
    return { start, end, label: MONTH_NAMES[((start.getMonth() % 12) + 12) % 12] };
  });
}
