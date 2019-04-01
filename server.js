const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()

    server.get('/v/:id', async (req, res) => {
      const actualPage = '/vehicle'

      const resp = await fetch('http://localhost:3000/static/data.json')
      const data = await resp.json()

      const vehicle = JSON.stringify(data.listings[parseInt(req.params.id) - 1])

      const queryParams = {
        id: req.params.id,
        listing: vehicle
      }

      app.render(req, res, actualPage, queryParams)
    })

    server.get('/buy/:id', async (req, res) => {
      const actualPage = '/buy'

      const resp = await fetch('http://localhost:3000/static/data.json')
      const data = await resp.json()

      const vehicle = JSON.stringify(data.listings[parseInt(req.params.id) - 1])

      const queryParams = {
        id: req.params.id,
        listing: vehicle
      }

      app.render(req, res, actualPage, queryParams)
    })

    server.get('/browse/:searchText', (req, res) => {
      const actualPage = '/browse'
      const queryParams = {
        searchText: req.params.searchText
      }

      app.render(req, res, actualPage, queryParams)
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(3000, err => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })