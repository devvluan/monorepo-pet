import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'sales'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('profile_id').unsigned().references('id').inTable('profiles').notNullable()
      table.string('client', 100).notNullable()
      table.string('product', 100).notNullable()
      table.decimal('quantity', 10, 2).notNullable()
      table.decimal('price', 10, 2).notNullable()
      table.enum('forms_payment', ['card', 'debit', 'credit', 'money', 'pix']).notNullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
