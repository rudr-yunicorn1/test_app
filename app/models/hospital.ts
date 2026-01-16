import { BaseModel, column } from '@adonisjs/lucid/orm'

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
}
