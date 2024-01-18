import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import Router from './Router'

const app = new Hono()
Router(app)

const port = 3000
console.log(`Server is running on port ${port}`)
serve({ fetch: app.fetch, port })
