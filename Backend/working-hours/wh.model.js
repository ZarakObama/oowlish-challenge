const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    workDay: { type: Date, required: true },
    arrivingHour: { type: String, required: true },
    exithour: { type: String, required: true },
    lunchbreak: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
 
});

module.exports = mongoose.model('WorkingHours', schema);