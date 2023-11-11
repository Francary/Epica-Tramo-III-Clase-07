import { Router } from "express";
import {ctrlCreateTask,ctrlDeleteTask,ctrlListTask} from "../controllers/task.controller.js"

const taskRouter = Router()


taskRouter.get("/" , ctrlListTask)
taskRouter.post("/" , ctrlCreateTask)
taskRouter.delete("/:taskId" , ctrlDeleteTask)

export {taskRouter}
