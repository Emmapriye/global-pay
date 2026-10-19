const dateTimeFormatter = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'UTC',
})

const shortDateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  timeZone: 'UTC',
})

/** Formatting is pinned to UTC so server and client renders always match. */
export function formatDateTime(iso: string): string {
  return `${dateTimeFormatter.format(new Date(iso))} UTC`
}

export function formatShortDate(iso: string): string {
  return shortDateFormatter.format(new Date(iso))
}
