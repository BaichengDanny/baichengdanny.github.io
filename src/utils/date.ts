/** Formats a YYYY-MM-DD string as e.g. "Sep 15, 2024", independent of the viewer's timezone. */
export function formatDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
