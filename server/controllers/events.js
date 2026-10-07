import { pool } from '../config/database.js'

export const getEvents = async (_, res) => {
    try {
        const results = await pool.query('SELECT * FROM events ORDER BY start_time ASC')
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

export const getEventById = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM events WHERE id = $1', [req.params.id])
        if (results.rows.length === 0) return res.status(404).json({ error: 'event not found' })
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

export const getEventsByLocation = async (req, res) => {
    try {
        const results = await pool.query(
            'SELECT * FROM events WHERE location_id = $1 ORDER BY start_time ASC',
            [req.params.locationId]
        )
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}
