import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'sales'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('client', 100).notNullable()
      table.string('product', 100).notNullable()
      table.decimal('quantity', 10, 2).notNullable()
      table.decimal('price', 10, 2).notNullable()
      table.enum('form_payment', ['Cartão', 'Dinheiro', 'Pix']).notNullable()
      table.timestamps(true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
