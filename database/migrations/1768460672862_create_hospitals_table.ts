import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'hospitals'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary
      table.string('hospital_name').notNullable
      table.string('address').notNullable
      table.string('city').notNullable
      table.string('state').notNullable
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
