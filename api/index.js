import { version } from '../../package.json'
import { Router } from 'express'
import apartmentRoutes from './routes/apartment.routes'

export default ({ config, db }) => {
	let api = Router()

	//expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version })
	})

	api.use('/', apartmentRoutes)

	return api
}