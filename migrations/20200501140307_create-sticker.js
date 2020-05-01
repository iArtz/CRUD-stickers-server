
exports.up = function(knex) {
    return knex.schema.createTable('sticker', (table) => {
        table.increments('Id');
        table.text('Title');
        table.text('Description');
        table.float('Rating');
        table.text('URL');
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('sticker');
};
