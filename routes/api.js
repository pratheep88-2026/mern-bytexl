const express = require('express');

const router = express.Router();

const Todo = require('../models/todo');
const Event = require('../models/event');


// =========================
// TODO APIs
// =========================

router.get('/todos', (req, res, next) => {

    Todo.find({}, 'action')
        .then((data) => res.json(data))
        .catch(next);

});

router.post('/todos', (req, res, next) => {

    if (req.body.action) {

        Todo.create(req.body)
            .then((data) => res.json(data))
            .catch(next);

    } else {

        res.json({
            error: 'The input field is empty',
        });

    }

});

router.delete('/todos/:id', (req, res, next) => {

    Todo.findOneAndDelete({ _id: req.params.id })
        .then((data) => res.json(data))
        .catch(next);

});


// =========================
// EVENT APIs
// =========================

// GET all events
router.get('/events', (req, res, next) => {

    Event.find()
        .sort({ date: 1 })
        .then((data) => res.json(data))
        .catch(next);

});


// GET single event
router.get('/events/:id', (req, res, next) => {

    Event.findById(req.params.id)
        .then((data) => {

            if (!data) {
                return res.status(404).json({
                    error: 'Event not found'
                });
            }

            res.json(data);

        })
        .catch(next);

});


// CREATE event
router.post('/events', (req, res, next) => {

    const {
        title,
        description,
        date,
        venue,
        maxParticipants,
        status
    } = req.body;


    if (
        !title ||
        !description ||
        !date ||
        !venue ||
        !maxParticipants
    ) {

        return res.status(400).json({
            error: 'Please fill all required fields'
        });

    }


    Event.create({
        title,
        description,
        date,
        venue,
        maxParticipants,
        status: status || 'Upcoming'
    })
        .then((data) => res.status(201).json(data))
        .catch(next);

});


// UPDATE event
router.put('/events/:id', (req, res, next) => {

    Event.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    )
        .then((data) => {

            if (!data) {
                return res.status(404).json({
                    error: 'Event not found'
                });
            }

            res.json(data);

        })
        .catch(next);

});


// DELETE event
router.delete('/events/:id', (req, res, next) => {

    Event.findByIdAndDelete(req.params.id)
        .then((data) => {

            if (!data) {
                return res.status(404).json({
                    error: 'Event not found'
                });
            }

            res.json(data);

        })
        .catch(next);

});


module.exports = router;