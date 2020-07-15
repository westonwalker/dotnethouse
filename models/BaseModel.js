const { Model } = require('objection')
const db = require("../db.js")
Model.knex(db)

class BaseModel extends Model {
  $beforeInsert() {
    this.created_date = new Date().toISOString().slice(0, 19).replace('T', ' ')
  }
  $beforeUpdate() {
    this.modified_date = new Date().toISOString().slice(0, 19).replace('T', ' ')
  }
}

module.exports = BaseModel
