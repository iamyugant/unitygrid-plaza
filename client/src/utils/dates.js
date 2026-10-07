export const formatDate = (iso) =>
    new Date(iso).toLocaleDateString(undefined, { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' })

export const formatTime = (iso) =>
    new Date(iso).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })

// Milliseconds until the event; negative once it has started.
export const msUntil = (iso) => new Date(iso).getTime() - Date.now()

// Turns a millisecond difference into the countdown text shown on an event card.
// `ms` is positive for upcoming events and negative for events that already happened.
export const formatRemainingTime = (ms) => {
    const totalSeconds = Math.floor(Math.abs(ms) / 1000)
    const days = Math.floor(totalSeconds / 86400)
    const hours = Math.floor((totalSeconds % 86400) / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    if (ms < 0) {
        if (days > 0) return `Event passed ${days} day${days === 1 ? '' : 's'} ago`
        if (hours > 0) return `Event passed ${hours} hour${hours === 1 ? '' : 's'} ago`
        if (minutes > 0) return `Event passed ${minutes} minute${minutes === 1 ? '' : 's'} ago`
        return 'Event just started'
    }

    // drop leading zero units so same-day events read "4h 12m 09s"
    const pad = (n) => String(n).padStart(2, '0')
    if (days > 0) return `${days}d ${hours}h ${minutes}m ${pad(seconds)}s`
    if (hours > 0) return `${hours}h ${minutes}m ${pad(seconds)}s`
    return `${minutes}m ${pad(seconds)}s`
}
