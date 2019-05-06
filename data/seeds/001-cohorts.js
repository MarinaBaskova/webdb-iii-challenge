exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('cohorts').truncate().then(function() {
		// Inserts seed entries
		return knex('cohorts').insert([ { name: 'WEB18' }, { name: 'iOS3' }, { name: 'DS4' } ]);
	});
};
