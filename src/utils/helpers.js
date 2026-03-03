import { format } from "date-fns";

export function formatDate(date) {
  return format(new Date(date), "yyyy-MM-dd HH:mm:ss");
}
