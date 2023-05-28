const {model, Schema} = require('mongoose');

const sudnetAttendanceSchema = new Schema({
    createdAt : Date,
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    adminAttendance :{
        type : Schema.Types.ObjectId,
        ref : 'AdminAttendance'
    }
});


const SudnetAttendance = model('SudnetAttendance', sudnetAttendanceSchema);


module.exports = SudnetAttendance;