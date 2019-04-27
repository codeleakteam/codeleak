const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const PORT = 80

app
  .prepare()
  .then(() => {
    const server = express()

    server.get('/profile/:id', (req, res) => {
      const actualPage = '/profile'
      const queryParams = { title: req.params.id }
      app.render(req, res, actualPage, queryParams)
    })

    server.get('/question/:id', (req, res) => {
      const actualPage = '/question'
      const queryParams = { title: req.params.id }
      app.render(req, res, actualPage, queryParams)
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(3000, err => {
      if (err) throw err
      console.log(`ready on port: 3000`)
    })
  })
  .catch(ex => {
    console.log(ex.stack)
    process.exit(1)
  })
