import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { Profile } from './profile.js'
import { DateTime } from 'luxon'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, hasMany, hasOne } from '@adonisjs/lucid/orm'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare fullName: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @hasOne(() => Profile, {
    foreignKey: 'userId',
  })
  declare profile: HasOne<typeof Profile>

  @hasMany(() => Profile, {
    foreignKey: 'userId',
  })
  declare profiles: HasMany<typeof Profile>
}
