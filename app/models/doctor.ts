import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import Hospitals from './hospital.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Patient from './patient.js'
import Appointment from './appointment.js'

export default class Doctor extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({})
  declare doctor_name: string

  @column({})
  declare hospital_id: number

  @belongsTo(() => Hospitals)
  declare hospital: BelongsTo<typeof Hospitals>

  @column({})
  declare specialization: string

  @hasMany(() => Patient)
  declare patients: HasMany<typeof Patient>

  @hasMany(() => Appointment)
  declare appointments: HasMany<typeof Appointment>
}
