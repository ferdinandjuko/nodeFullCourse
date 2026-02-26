import mongoose from 'mongoose';

const Schema = mangoose.Schema;

const employeeSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    }
});

export default mongoose.model('Employee', employeeSchema);