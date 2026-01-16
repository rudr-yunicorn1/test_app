import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Hospitals from './hospital.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Doctor extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({})
  declare doctor_name: string

  @column({})
  declare hospital_id: number

  @belongsTo(() => Hospitals, {
    foreignKey: 'hospital_id',
  })
  declare hospital: BelongsTo<typeof Hospitals>

  @column({})
  declare specialization: string
}
