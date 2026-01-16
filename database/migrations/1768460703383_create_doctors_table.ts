import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'doctors'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('doctor_id').primary
      table.string('doctor_name').notNullable
      table
        .integer('hospital_id')
        .unsigned()
        .notNullable()
        .references('hospital_id')
        .inTable('hospitals')
        .onDelete('CASCADE')
        .index()
      table.string('specialization').notNullable
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
