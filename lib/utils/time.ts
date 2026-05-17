const TIME_FORMATTER = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  timeZone: "UTC"
});

export function formatDisplayTime(value: string | number | Date) {
  return TIME_FORMATTER.format(new Date(value));
}
