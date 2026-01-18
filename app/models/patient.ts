import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import Doctors from './doctor.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Appointment from './appointment.js'

export default class Patient extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({})
  declare patient_name: string

  @column({})
  declare father_name: string

  @column({})
  declare age: number

  @column({})
  declare doctor_id: number

  @belongsTo(() => Doctors)
  declare doctor: BelongsTo<typeof Doctors>

  @column({})
  declare vaccine_name: string

  @column({})
  declare phone_number: string

  @hasMany(() => Appointment)
  declare Appointment: HasMany<typeof Appointment>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
