const express = require('express')
const session = require('express-session')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const passport = require('passport')
const helpers = require('./helpers')
const routes = require('./routes/index')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// serves up static files from the public folder. Anything in public/ will just be served up as the file it is
app.use(express.static(path.join(__dirname, 'public')))

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// populates req.cookies with any cookies that came along with the request
app.use(cookieParser())

// Passport JS is what we use to handle our logins
app.use(passport.initialize())
app.use(passport.session())

// pass variables to our templates + all requests
app.use((req, res, next) => {
  res.locals.h = helpers
  //res.locals.flashes = req.flash()
  res.locals.user = req.user || null
  res.locals.currentPath = req.path
  next()
})

app.use('/', routes)

// done! we export it so we can start the site in start.js
module.exports = app
