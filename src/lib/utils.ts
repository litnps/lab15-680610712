export { cn } from "cn"

export function formatThaiDateTime(isoString?: string): string {
  if (!isoString) return "-";
  return new Date(isoString).toLocaleString("th-TH-u-ca-buddhist", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}
