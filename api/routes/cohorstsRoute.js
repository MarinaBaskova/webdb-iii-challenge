const express = require('express');
const router = express.Router();
const db = require('../../config/dbConfig');

router.get('/', (req, res) => {
	db('cohorts')
		.then((cohorts) => {
			res.status(200).json(cohorts);
		})
		.catch((err) => {
			res.status(500).json({ error: 'The cohorts information could not be retrieved.' });
		});
});

router.get('/:id', (req, res) => {
	db('cohorts')
		.where({ id: req.params.id })
		.first()
		.then((cohort) => {
			if (cohort) {
				res.status(200).json(cohort);
			} else {
				res.status(404).json({ error: 'The cohort with the specified ID does not exist.' });
			}
		})
		.catch((err) => {
			res.status(500).json({ error: 'The cohort information could not be retrieved.' });
		});
});

// [GET] /api/cohorts/:id/students
// 1 - returns all students
// 2 - for the cohort with the specified id.
// select * from students where cohort_id = 2

router.get('/:id/students', (req, res) => {
	db('students')
		.where({ cohort_id: req.params.id })
		.then((studentsInCohort) => {
			if (studentsInCohort) {
				res.status(200).json(studentsInCohort);
			} else {
				res.status(404).json({ error: 'There are no students in the specified ID cohort.' });
			}
		})
		.catch((err) => {
			res.status(500).json({ error: 'The information could not be retrieved.' });
		});
});

router.post('/', (req, res) => {
	if (!req.body.name) {
		res.status(400).json({ error: 'Please provide a name for a new cohort' });
	} else {
		db('cohorts')
			.insert(req.body, 'id')
			.then((idOfNewCohort) => {
				res.status(201).json(idOfNewCohort);
			})
			.catch((err) => {
				res.status(500).json({ error: 'There was an error while saving the cohort to the database' });
			});
	}
});

router.put('/:id', (req, res) => {
	db('cohorts')
		.where({ id: req.params.id })
		.update(req.body)
		.then((numOUpdated) => {
			if (numOUpdated > 0) {
				db('cohorts')
					.where({ id: req.params.id })
					.first()
					.then((cohort) => {
						res.status(200).json(cohort);
					})
					.catch((err) => {
						res.status(404).json({ error: 'The cohort with the specified ID does not exist.' });
					});
			} else {
				res.status(404).json({ message: 'It was an error while updating your cohort, please try again' });
			}
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

router.delete('/:id', (req, res) => {
	db('cohorts')
		.where({ id: req.params.id })
		.del()
		.then((numOfDeleted) => {
			if (numOfDeleted > 0) {
				res.status(204).end();
			} else {
				res.status(404).json({ error: 'The cohort with the specified ID does not exist.' });
			}
		})
		.catch((err) => {
			res.status(500).json({ error: 'It was an error while deleting your cohort, please try again' });
		});
});

module.exports = router;
