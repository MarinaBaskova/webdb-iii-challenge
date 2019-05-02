// Update with your config settings.

module.exports = {
	development: {
		client: 'sqlite3',
		connection: {
			filename: './data/lambdaschool.sqlite3'
		},
		useNullAsDefault: true,
		pool: { afterCreate: (conn, cb) => conn.run('PRAGMA foreign_keys = ON', cb) }, // foreign key constrain student will not be add to the cohort that doesnt exist
		migrations: {
			directory: './data/migrations'
		},
		seeds: {
			directory: './data/seeds'
		}
	}
};
