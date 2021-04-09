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
import nodemailer from 'nodemailer'
import { config } from './config/passport.js'
import { router } from './routes/router.js'
import { connectDB } from './config/mongoose.js'

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

  // Register routes.
  app.use('/', router)

  app.post('/contact', (req, res) => {
    const data = req.body

    const smtpTransport = nodemailer.createTransport({
      service: 'Gmail',
      port: 465,
      auth: {
        user: process.env.ADMINEMAIL,
        pass: process.env.ADMINPASS
      }
    })

    const mailOptions = {
      from: data.email,
      to: process.env.ADMINEMAIL,
      subject: 'Mail from RecipeApp',
      html: `<p>${data.username}</p>
              <p>${data.email}</p>
              <p>${data.message}</p>`
    }

    smtpTransport.sendMail(mailOptions, (error, response) => {
      if (error) {
        res.send(error)
      } else {
        res.send('Success')
      }
      smtpTransport.close()
    })
  })

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
  app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`)
    console.log('Press Ctrl-C to terminate...')
  })
}

main().catch(console.error)
