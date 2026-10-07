import React, { useState, useEffect } from 'react'
import Event from '../components/Event'
import LocationsAPI from '../services/LocationsAPI'
import EventsAPI from '../services/EventsAPI'
import '../css/LocationEvents.css'

const Events = () => {
    const [events, setEvents] = useState([])
    const [locations, setLocations] = useState([])
    const [filter, setFilter] = useState('all')

    useEffect(() => {
        (async () => {
            try {
                const [eventsData, locationsData] = await Promise.all([
                    EventsAPI.getAllEvents(),
                    LocationsAPI.getAllLocations()
                ])
                setEvents(eventsData)
                setLocations(locationsData)
            } catch (error) {
                console.error(error)
            }
        })()
    }, [])

    const nameFor = (id) => locations.find((l) => l.id === id)?.name
    const visible = filter === 'all' ? events : events.filter((e) => e.location_id === Number(filter))

    return (
        <div className='location-events'>
            <header className='events-page-header'>
                <h2>All Events</h2>
                <select value={filter} onChange={(e) => setFilter(e.target.value)} aria-label='Filter by location'>
                    <option value='all'>All locations</option>
                    {locations.map((l) => <option key={l.id} value={l.id}>{l.name}</option>)}
                </select>
            </header>

            <main>
                {
                    visible.length > 0 ? visible.map((event) =>
                        <Event
                            key={event.id}
                            title={event.title}
                            startTime={event.start_time}
                            image={event.image}
                            locationName={nameFor(event.location_id)}
                        />
                    ) : <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> {'No events found!'}</h2>
                }
            </main>
        </div>
    )
}

export default Events
