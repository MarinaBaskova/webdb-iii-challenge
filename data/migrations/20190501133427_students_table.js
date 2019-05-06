exports.up = function(knex, Promise) {
	return knex.schema.createTable('students', (table) => {
		table.increments();
		table.string('name', 50).notNullable();
		//foreign key
		table
			.integer('cohort_id')
			.unsigned()
			.references('id') // column primary key on the primary table Cohorts
			.inTable('cohorts') // table
			.onDelete('CASCADE')
			.onUpdate('CASCADE');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('students');
};
