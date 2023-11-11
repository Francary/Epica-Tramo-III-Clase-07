import { json } from "express"
import{TaskModel} from "../models/task.model.js"
import { UserModel } from "../models/user.model.js"

const ctrlCreateTask = async (req , res) =>{
    try {
//Este metodo es mas corto pero no se puede modificar alguna propiedad del usuario antes de crearlo
        // conts newUser = await TaskModel.create()

//Este metodo es mas largo pero podemos modificar alguna propiedad del usuario antes de crearlo     
        const user = await UserModel.findById(req.body.user);

        if(!user) return res.sendStatus(404);

        const newTask = new TaskModel(req.body);

        await newTask.save()

        // Opcion 1 para agregar el id de la tarea al usuario
        // await user.updateOne({$push: { tasks: newTask._id }})

        // Opcion 2 para agregar el id de la tarea al usuario
        user.tasks.push(newTask._id);
        await user.save()
        res.status(200).json(newTask)

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

const ctrlDeleteTask = async (req, res)=>{
    try {
        const {taskId} = req.params;
        const task = await TaskModel.findById(taskId);
        if (!task) return res.sendStatus(404)
        const user = await UserModel.findById(task.user)
        await task.deleteOne();
        await user.updateOne({$pull : { tasks: task._id}})
        res.sendStatus(200)
    } catch (error) {
        console.error(error);
        res.sendStatus(500);      
    }
}

const ctrlListTask = async (req, res) =>{
    try {
        const tasks = await TaskModel.find()
        .populate(
            "user",
            [
                "name",
                "email"
            ]
            )

        res.status(200).json(tasks)
    } catch (error) {
        console.error(error);
        res.sendStatus(500);             
    }
}

export {
    ctrlCreateTask,
    ctrlDeleteTask,
    ctrlListTask,
}