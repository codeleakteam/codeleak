const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const PORT = process.env.PORT || 3000

const app = next({ dev })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()

    server.get('/profile/:id/:username', (req, res) => {
      const actualPage = '/profile'
      const queryParams = { id: req.params.id, username: req.params.username }
      app.render(req, res, actualPage, queryParams)
    })

    server.get('/question/:id/:slug', (req, res) => {
      const actualPage = '/question'
      const queryParams = { id: req.params.id, slug: req.params.slug }
      app.render(req, res, actualPage, queryParams)
    })

    server.get('/question/:id/:slug/answer', (req, res) => {
      const actualPage = '/add_answer'
      const queryParams = { id: req.params.id, slug: req.params.slug }
      app.render(req, res, actualPage, queryParams)
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(3000, err => {
      if (err) throw err
    })
  })
  .catch(ex => {
    process.exit(1)
  })
