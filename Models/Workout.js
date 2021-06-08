const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    }, 
    exercises: [
        {
            type: {
                type: String,
                trim: true,
                required: "what type of workout?"
            },
            name: {
                type: String,
                trim: true,
                required: "A name is required"
            },
            weight: {
                type: Number
            },
            sets: {
                type: Number,
                required: "how many sets?"
            },
            reps: {
                type: Number,
                required: "how many reps?"
            },
            duration: {
                type: Number,
                required: "What is the duration of this workout?"
            },
            distance: {
                type: Number,
                required: "What is the distance of this workout?"
            },    
        }
    ]   
},
{
    toJSON: {
        virtuals: true
    }
}
);

workoutSchema.virtual("totalDuration").get(function () {
    let totalDuration = 0;
    this.exercises.forEach((element) => {
        console.log(this);
      totalDuration += element.duration;
    });
    return totalDuration;
  });

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
