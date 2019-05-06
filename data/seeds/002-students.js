exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('students').truncate().then(function() {
		// Inserts seed entries
		return knex('students').insert([
			{ name: 'Anna', cohort_id: 1 },
			{ name: 'Andrew', cohort_id: 2 },
			{ name: 'Nicole', cohort_id: 3 }
		]);
	});
};
