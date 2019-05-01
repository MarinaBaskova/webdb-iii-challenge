const express = require('express');
const router = express.Router();
const db = require('../../config/dbConfig');

router.get('/', (req, res) => {
	db('students')
		.then((students) => {
			res.status(200).json(students);
		})
		.catch((err) => {
			res.status(500).json({ error: 'The students information could not be retrieved.' });
		});
});

router.get('/:id', (req, res) => {
	db('students')
		.where({ id: req.params.id })
		.first()
		.then((student) => {
			if (student) {
				res.status(200).json(student);
			} else {
				res.status(404).json({ error: 'The student with the specified ID does not exist.' });
			}
		})
		.catch((err) => {
			res.status(500).json({ error: 'The student information could not be retrieved.' });
		});
});

router.post('/', (req, res) => {
	if (!req.body.name) {
		res.status(400).json({ error: 'Please provide a name for a new student' });
	} else {
		db('students')
			.insert(req.body, 'id')
			.then((idOfNewStudent) => {
				res.status(201).json(idOfNewStudent);
			})
			.catch((err) => {
				res.status(500).json({ error: 'There was an error while saving the student to the database' });
			});
	}
});

router.put('/:id', (req, res) => {
	db('students')
		.where({ id: req.params.id })
		.update(req.body)
		.then((numOUpdated) => {
			if (numOUpdated > 0) {
				db('students')
					.where({ id: req.params.id })
					.first()
					.then((student) => {
						res.status(200).json(student);
					})
					.catch((err) => {
						res.status(404).json({ error: 'The student with the specified ID does not exist.' });
					});
			} else {
				res.status(404).json({ message: 'It was an error while updating your student, please try again' });
			}
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

router.delete('/:id', (req, res) => {
	db('students')
		.where({ id: req.params.id })
		.del()
		.then((numOfDeleted) => {
			if (numOfDeleted > 0) {
				res.status(204).end();
			} else {
				res.status(404).json({ error: 'The student with the specified ID does not exist.' });
			}
		})
		.catch((err) => {
			res.status(500).json({ error: 'It was an error while deleting your student, please try again' });
		});
});

module.exports = router;
