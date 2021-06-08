const db = require("../Models");
const router = require("express").Router();

//get workouts
router.get("/api/workouts", (req, res) => {
    db.Workout.find({})
    .then(dbWorkout => {
        dbWorkout.forEach(workout=> {
            let total = 0;
            workout.exercises.forEach(e => {
                total += e.duration;
            });
            workout.totalDuration = total;
        });
        res.json(dbWorkout);
    })
    .catch(err => {
        res.json(err);
    });
});


//get workout range
router.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.json(err);
    });
});

//create exercise
router.post("/api/workouts", ({body}, res) => {
    db.Workout.create(body)
    .then((dbWorkout) => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.json(err);
    });
});

//add exercise
router.put("/api/workouts/:id", async(req, res) => {
    db.Workout.findOneAndUpdate(
        { _id: req.params.id },
        {
            $push: { exercises: req.body },
            $inc: { totalDuration: req.body.duration }
        },
        { new: true }
    )
    .then((dbWorkout) => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.json(err);
    });
});

module.exports = router;