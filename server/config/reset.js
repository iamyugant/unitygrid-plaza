import { pool } from './database.js'

const locations = [
    { name: 'Echo Lounge & Music Hall', address: '2601 Elm St', city: 'Dallas', state: 'TX', zip: '75226', image: 'https://picsum.photos/seed/echolounge/600/400' },
    { name: 'House of Blues', address: '2200 N Lamar St', city: 'Dallas', state: 'TX', zip: '75202', image: 'https://picsum.photos/seed/houseofblues/600/400' },
    { name: 'The Pavilion', address: '1818 Gaylord Dr', city: 'Irving', state: 'TX', zip: '75063', image: 'https://picsum.photos/seed/pavilion/600/400' },
    { name: 'American Airlines Center', address: '2500 Victory Ave', city: 'Dallas', state: 'TX', zip: '75219', image: 'https://picsum.photos/seed/aac/600/400' }
]

// location index (1-based, matches insert order), title, ISO start time
const events = [
    [1, 'Neon Nights Synthwave Party', '2026-08-14T20:00:00-05:00'],
    [1, 'Indie Open Mic', '2026-10-09T19:00:00-05:00'],
    [1, 'Halloween Bass Bash', '2026-10-31T21:30:00-05:00'],
    [2, 'Blues Legends Revival', '2026-09-05T19:30:00-05:00'],
    [2, 'Gospel Brunch', '2026-10-18T11:00:00-05:00'],
    [2, 'Latin Fusion Fiesta', '2026-11-20T20:00:00-06:00'],
    [3, 'Summer Sunset Jam', '2026-07-04T18:00:00-05:00'],
    [3, 'Pavilion Food Truck Festival', '2026-10-24T12:00:00-05:00'],
    [3, 'Winter Lights Concert', '2026-12-12T19:00:00-06:00'],
    [4, 'Mavs Season Opener Watch Party', '2026-10-22T19:30:00-05:00'],
    [4, 'Stars vs. Rivals', '2026-11-07T18:00:00-06:00'],
    [4, 'New Year Countdown Spectacular', '2026-12-31T21:00:00-06:00']
]

const reset = async () => {
    try {
        await pool.query('DROP TABLE IF EXISTS events; DROP TABLE IF EXISTS locations;')

        await pool.query(`
            CREATE TABLE locations (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                address VARCHAR(255) NOT NULL,
                city VARCHAR(100) NOT NULL,
                state VARCHAR(2) NOT NULL,
                zip VARCHAR(10) NOT NULL,
                image TEXT NOT NULL
            );
            CREATE TABLE events (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                start_time TIMESTAMPTZ NOT NULL,
                image TEXT NOT NULL,
                location_id INTEGER NOT NULL REFERENCES locations(id) ON DELETE CASCADE
            );
        `)

        for (const l of locations) {
            await pool.query(
                'INSERT INTO locations (name, address, city, state, zip, image) VALUES ($1, $2, $3, $4, $5, $6)',
                [l.name, l.address, l.city, l.state, l.zip, l.image]
            )
        }

        for (const [i, [locationId, title, start]] of events.entries()) {
            await pool.query(
                'INSERT INTO events (title, start_time, image, location_id) VALUES ($1, $2, $3, $4)',
                [title, start, `https://picsum.photos/seed/event${i + 1}/600/600`, locationId]
            )
        }

        console.log('database reset and seeded')
    } catch (error) {
        console.error('reset failed:', error)
    } finally {
        await pool.end()
    }
}

reset()
