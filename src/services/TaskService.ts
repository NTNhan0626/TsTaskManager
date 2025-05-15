import { ITask } from "../interfaces/ITask";
import { Task } from "../models/Task";
import { FileHandle } from "../utils/FileHandle";
import { ProjectService } from "./ProjectService";

export class TaskService {
    private tasks: Task[] = [];
    private fileName = "Task.json";
    private projectService = new ProjectService();
    constructor() {
        const rawTask = FileHandle.readFromFile<Task>(this.fileName);
        this.tasks = rawTask.map(raw => new Task(raw.id, raw.title, raw.description, raw.projectId, raw.completed, raw.dueDate, raw.assigneeIds, raw.parentTaskId, raw.subTaskIds));
    }

    createTask(data: ITask) {
        const task = new Task(
            data.id,
            data.title,
            data.description,
            data.projectId,
            data.completed,
            data.dueDate,
            data.assigneeIds,
            data.parentTaskId,
            []
        );

        this.tasks.push(task);

        if (data.parentTaskId) {
            const parentTask = this.tasks.find(t => t.id === data.parentTaskId);
            if (parentTask) {
                parentTask.addSubTask(task.id); // ✅ chỉ thêm ID con
            }
        }

        FileHandle.writeToFile(this.fileName, this.tasks); // ✅ không còn lỗi circular
    }


    updateTask(id: string, data: Partial<Omit<Task, "id">>) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.title = data.title ? data.title : task.title;
            task.description = data.description ? data.description : task.description;
            task.completed = data.completed ? data.completed : task.completed;
            task.dueDate = data.dueDate ? data.dueDate : task.dueDate;
            task.assigneeIds = data.assigneeIds ? data.assigneeIds : task.assigneeIds;
            task.subTaskIds = data.subTaskIds ? data.subTaskIds : task.subTaskIds;
            task.projectId = data.projectId ? data.projectId : task.projectId;
        }
        FileHandle.writeToFile(this.fileName, this.tasks);
    }
    getAllTask(): Task[] {
        return this.tasks;
    }
    getTaskByProjectId(id: string): Task | undefined {
        return this.tasks.filter(t => t.parentTaskId === "").find(t => t.parentTaskId === id);
    }
}