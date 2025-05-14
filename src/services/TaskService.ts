import { Task } from "../models/Task";
import { FileHandle } from "../utils/FileHandle";

export class TaskService {
    private tasks: Task[] = [];
    private fileName = "Task.json";
    constructor() {
        const rawTask = FileHandle.readFromFile<Task>(this.fileName);
        this.tasks = rawTask.map(raw => new Task(raw.id, raw.title, raw.description,raw.projectId, raw.completed, raw.dueDate, raw.assigneeIds, raw.parentTaskId, raw.subTasks));
    }

    createTask(data: Task) {
        const task = new Task(data.id, data.title, data.description,data.projectId, data.completed, data.dueDate, data.assigneeIds, data.parentTaskId, data.subTasks);
        this.tasks.push(task);
        FileHandle.writeToFile(this.fileName,this.tasks);
    }

    updateTask(id:string,data:Partial<Omit<Task,"id">>){
        const task = this.tasks.find(t => t.id === id);
        if(task){
            task.title = data.title?data.title:task.title;
            task.description = data.description?data.description:task.description;
            task.completed =data.completed?data.completed:task.completed;
            task.dueDate =data.dueDate?data.dueDate:task.dueDate;
            task.assigneeIds=data.assigneeIds?data.assigneeIds:task.assigneeIds;
            task.subTasks =data.subTasks?data.subTasks:task.subTasks;
            task.projectId =data.projectId?data.projectId:task.projectId;
        }
        FileHandle.writeToFile(this.fileName,this.tasks);
    }
    getAllTask():Task[]{
        return this.tasks.filter(t=>t.parentTaskId === null);
    }
    getTaskByProjectId(id:string):Task | undefined{
        return this.tasks.filter(t=>t.parentTaskId === null).find(t => t.parentTaskId === id);
    }
}