/**
 * The starting point of the application.
 *
 * @author Thanh Tran
 * @version 1.0.0
 */

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import logger from 'morgan'
import passport from 'passport'
import path  from 'path'
import { config } from './src/config/passport.js'
import { router } from './src/routes/router.js'
import { connectDB } from './src/config/mongoose.js'

/**
 * The main function of the application.
 */
const main = async () => {
  await connectDB()

  const app = express()

  // Set various HTTP headers to make the application little more secure (https://www.npmjs.com/package/helmet).
  app.use(helmet())

  app.use(cors())

  // Set up a morgan logger using the dev format for log entries.
  app.use(logger('dev'))

  // Parse requests of the content type application/json.
  app.use(express.json({ limit: '10mb', extended: true }))

  // passport middleware
  app.use(passport.initialize())
  // passport config
  config(passport)

  if (process.env.NODE_ENV === 'production') {
    // Serve static files.
    app.use(express.static('client/dist'))

   app.get('*', (req, res) => {
   res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
   })
  }

  // Register routes.
  app.use('/', router)

  // Error handler.
  app.use(function (err, req, res, next) {
    err.status = err.status || 500

    if (req.app.get('env') !== 'development') {
      res
        .status(err.status)
        .json({
          status: err.status,
          message: err.message
        })
      return
    }

    // Development only!
    // Only providing detailed error in development.
    return res
      .status(err.status)
      .json({
        status: err.status,
        message: err.message,
        innerException: err.innerException,
        stack: err.stack
      })
  })

  // Starts the HTTP server listening for connections.
  app.listen(process.env.PORT || 8080, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`)
    console.log('Press Ctrl-C to terminate...')
  })
}

main().catch(console.error)
