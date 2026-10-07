const getAllEvents = async () => {
    const response = await fetch('/api/events')
    if (!response.ok) throw new Error('Failed to load events')
    return response.json()
}

const getEventById = async (id) => {
    const response = await fetch(`/api/events/${id}`)
    if (!response.ok) throw new Error('Failed to load event')
    return response.json()
}

const getEventsByLocation = async (locationId) => {
    const response = await fetch(`/api/locations/${locationId}/events`)
    if (!response.ok) throw new Error('Failed to load events for location')
    return response.json()
}

export default { getAllEvents, getEventById, getEventsByLocation }
