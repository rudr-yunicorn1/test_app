import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'appointments'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('appointment_id').primary
      table
        .integer('doctor_id')
        .unsigned()
        .notNullable()
        .references('doctor_id')
        .inTable('doctors')
        .onDelete('CASCADE')
        .index()
      table
        .integer('patient_id')
        .unsigned()
        .notNullable()
        .references('patient_id')
        .inTable('patients')
        .onDelete('CASCADE')
        .index()
      table
        .integer('hospital_id')
        .unsigned()
        .notNullable()
        .references('hospital_id')
        .inTable('hospitals')
        .onDelete('CASCADE')
        .index()
      table.boolean('status_id').notNullable().defaultTo(false)

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
