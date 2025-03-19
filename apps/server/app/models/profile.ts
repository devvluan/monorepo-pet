import type { HasMany } from '@adonisjs/lucid/types/relations'
import { ProfileOptions } from '@ludispet/entities/dist/profile.js'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import { Sales } from './sales.js'
import { DateTime } from 'luxon'

export class Profile extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'userId', serializeAs: 'userId' })
  declare userId: number

  @column({ columnName: 'timeZone', serializeAs: 'timeZone' })
  declare timeZone: string

  declare options: ProfileOptions

  @column.dateTime({ autoCreate: true, columnName: 'created_at', serializeAs: 'created_at' })
  declare created_at: DateTime
  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    columnName: 'updated_at',
    serializeAs: 'updated_at',
  })
  declare updated_at: DateTime

  @hasMany(() => Sales, {
    foreignKey: 'profileId',
  })
  declare sales: HasMany<typeof Sales>
}
