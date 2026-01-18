import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Hospital from './hospital.js'
import Doctor from './doctor.js'
import Patient from './patient.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Appointment extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({})
  declare doctor_id: number

  @column({})
  declare patient_id: number

  @column({})
  declare hospital_id: number

  @belongsTo(() => Doctor)
  declare doctor: BelongsTo<typeof Doctor>

  @belongsTo(() => Patient)
  declare patient: BelongsTo<typeof Patient>

  @belongsTo(() => Hospital)
  declare hospital: BelongsTo<typeof Hospital>

  @column({})
  declare status_id: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
