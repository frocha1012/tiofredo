const TIME_ZONE = 'Europe/Lisbon'

type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6

type DayHours = {
  open: number
  close: number
}

// Matches the published schedule: Seg–Sex 08h00–01h00, Sáb 11h30–01h00, Dom 11h00–01h00.
// Close is 01:00 the next day, stored as minutes after midnight.
const HOURS: Record<Weekday, DayHours> = {
  0: { open: 11 * 60, close: 60 },
  1: { open: 8 * 60, close: 60 },
  2: { open: 8 * 60, close: 60 },
  3: { open: 8 * 60, close: 60 },
  4: { open: 8 * 60, close: 60 },
  5: { open: 8 * 60, close: 60 },
  6: { open: 11 * 60 + 30, close: 60 },
}

const WEEKDAYS: Record<string, Weekday> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
}

export type OpeningStatus = {
  open: boolean
  label: string
  nextChange: Date
}

function lisbonParts(date: Date) {
  const formatted = new Intl.DateTimeFormat('en-GB', {
    timeZone: TIME_ZONE,
    weekday: 'short',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date)

  const parts = Object.fromEntries(
    formatted.filter((part) => part.type !== 'literal').map((part) => [part.type, part.value]),
  )

  const hour = Number(parts.hour) % 24

  return {
    weekday: WEEKDAYS[parts.weekday],
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
    minutes: hour * 60 + Number(parts.minute),
    seconds: Number(parts.second),
  }
}

function lisbonOffset(date: Date) {
  const parts = lisbonParts(date)
  const asUtc = Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    Math.floor(parts.minutes / 60),
    parts.minutes % 60,
    parts.seconds,
  )
  return asUtc - date.getTime()
}

function lisbonLocalToDate(year: number, month: number, day: number, minutes: number) {
  const utcGuess = new Date(Date.UTC(year, month - 1, day, Math.floor(minutes / 60), minutes % 60))
  const corrected = new Date(utcGuess.getTime() - lisbonOffset(utcGuess))
  return new Date(utcGuess.getTime() - lisbonOffset(corrected))
}

function addLisbonDays(year: number, month: number, day: number, days: number) {
  const noon = lisbonLocalToDate(year, month, day, 12 * 60)
  const shifted = lisbonParts(new Date(noon.getTime() + days * 24 * 60 * 60 * 1000))
  return { year: shifted.year, month: shifted.month, day: shifted.day }
}

function formatHour(minutes: number) {
  const hour = Math.floor(minutes / 60)
  const minute = minutes % 60
  return `${String(hour).padStart(2, '0')}h${String(minute).padStart(2, '0')}`
}

function isOpenAt(weekday: Weekday, minutes: number) {
  const today = HOURS[weekday]
  if (minutes < today.close) return true
  return minutes >= today.open
}

export function getOpeningStatus(now = new Date()): OpeningStatus {
  const here = lisbonParts(now)
  const today = HOURS[here.weekday]
  const open = isOpenAt(here.weekday, here.minutes)
  const closesAfterMidnight = open && here.minutes >= today.close
  const when = closesAfterMidnight
    ? addLisbonDays(here.year, here.month, here.day, 1)
    : { year: here.year, month: here.month, day: here.day }
  const nextMinutes = open ? today.close : today.open

  return {
    open,
    label: open ? 'Aberto' : `Fechado · abre às ${formatHour(today.open)}`,
    nextChange: lisbonLocalToDate(when.year, when.month, when.day, nextMinutes),
  }
}
