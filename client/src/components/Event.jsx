import React, { useState, useEffect } from 'react'
import { formatDate, formatTime, msUntil, formatRemainingTime } from '../utils/dates'
import '../css/Event.css'

const Event = ({ title, startTime, image, locationName }) => {
    const [remaining, setRemaining] = useState(msUntil(startTime))

    // tick once a second so the countdown stays live
    useEffect(() => {
        setRemaining(msUntil(startTime))
        const timer = setInterval(() => setRemaining(msUntil(startTime)), 1000)
        return () => clearInterval(timer)
    }, [startTime])

    const isPast = remaining < 0

    return (
        <article className={`event-information ${isPast ? 'past-event' : ''}`}>
            <img src={image} alt={title} />

            <div className='event-information-overlay'>
                <div className='text'>
                    <h3>{title}</h3>
                    {locationName && <p><i className='fa-solid fa-location-dot'></i> {locationName}</p>}
                    <p><i className='fa-regular fa-calendar'></i> {formatDate(startTime)} <br /> {formatTime(startTime)}</p>
                    <p className={isPast ? 'negative-time-remaining' : 'time-remaining'}>
                        {formatRemainingTime(remaining)}
                    </p>
                </div>
            </div>
        </article>
    )
}

export default Event
