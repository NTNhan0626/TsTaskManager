import { Task } from "../models/Task";

export interface ITask {
    id: string,
    title: string,
    description: string ,
    projectId: string,
    completed: boolean ,
    dueDate?: string,
    assigneeIds: string[] ,
    parentTaskId: string | null ,
    subTaskIds: string[]
}