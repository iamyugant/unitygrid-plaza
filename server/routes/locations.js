import express from 'express'
import { getLocations, getLocationById } from '../controllers/locations.js'
import { getEventsByLocation } from '../controllers/events.js'

const router = express.Router()

router.get('/', getLocations)
router.get('/:id', getLocationById)
router.get('/:locationId/events', getEventsByLocation)

export default router
