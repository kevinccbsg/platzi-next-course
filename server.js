// server.js
const next = require('next')
const app = next({
  dev: process.env.NODE_ENV !== 'production',
})
const { createServer } = require('http')
const routes = require('./routes')

const handler = routes.getRequestHandler(app)
const PORT = process.env.PORT || 3000

// Without express
app.prepare().then(() => {
  createServer(handler).listen(PORT)
})
