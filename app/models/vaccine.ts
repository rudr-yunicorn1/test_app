import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Vaccine extends BaseModel {
  public static connection = 'pg'
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare expiry: Date

  @column()
  declare doctor_name: string

  @column()
  declare does_required: number

  @column()
  declare is_active: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
