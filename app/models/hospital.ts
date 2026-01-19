import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Doctor from './doctor.js'
import Appointment from './appointment.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Hospital extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({})
  declare hospital_name: string

  @column({})
  declare address: string

  @column({})
  declare city: string

  @column({})
  declare state: string

  @hasMany(() => Doctor)
  declare doctors: HasMany<typeof Doctor>

  @hasMany(() => Appointment)
  declare appointments: HasMany<typeof Appointment>
}
