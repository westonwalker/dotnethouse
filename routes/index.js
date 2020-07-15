const express = require('express')
const router = express.Router()
const homeController = require('../controllers/homeController')
const Category = require('../models/Category.js')

router.get('/', homeController.index)

// standard send example
router.get('/sendexample', (req, res) => {
  res.send('Hey It Works!')
})

// json api example
router.get('/jsonexample', (req, res) => {
  const wes = { name: 'TopHat', age: 31 }
  res.json(wes)
})

// url param example
router.get('/paramexample/:name', (req, res) => {
  res.send(req.params.name)
})

// querystring example
router.get('/querystring', (req, res) => {
  const name = req.query.name; // /querystring?name=Wes
  res.send(name)
})

router.get('/ormtest', async (req, res) => {
  const category = await Category.query().findById(1)
  res.json({ category })
})

router.get('/createtest', async (req, res) => {
  const category = await Category.query().insert({
    name: 'Edibles',
  })

  console.log(category instanceof Category); // --> true
  console.log(category)
  res.json({ category })
})

module.exports = router
