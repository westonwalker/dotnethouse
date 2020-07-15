exports.index = (req, res) => {
  const data = { name: 'Wes', age: 31, title: 'Home' }
  res.render('home', data)
}
