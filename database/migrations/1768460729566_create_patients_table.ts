import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'patients'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary
      table.string('patient_name').notNullable
      table.string('father_name').notNullable
      table.integer('age').notNullable
      table
        .integer('doctor_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('doctors')
        .onDelete('CASCADE')
        .index()
      table.string('vaccine_name').notNullable().defaultTo('zero')
      table.string('phone_number', 10).notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
