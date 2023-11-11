import {Schema , Types, model} from  "mongoose"


const tasksShema = new Schema({
    text: {
        type: String,
        required: true,
    },
    done: {
        type: Boolean,
        default: false,
    },
    user:{
        type: Types.ObjectId,
        ref: "User",
        required:true,
    },
})

const TaskModel = model("Task",tasksShema)

export {TaskModel}