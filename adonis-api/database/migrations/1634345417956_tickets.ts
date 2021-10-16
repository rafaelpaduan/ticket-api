import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Tickets extends BaseSchema {
  protected tableName = 'tickets'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('created_by').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('responsible').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('description').notNullable()
      table.integer('priority').defaultTo('5')
      table.string('status').defaultTo('NEW')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: false })
      table.timestamp('updated_at', { useTz: false })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
