export class Task {
    constructor(
        public id: string,
        public title: string,
        public description: string = '',
        public projectId:string,
        public completed: boolean = false,
        public dueDate?: string,
        public assigneeIds: string[] = [],
        public parentTaskId:string | null = null,
        public subTasks: Task[] = []
    ) { }

    markComplete(): void {
        this.completed = true;
    }

    addSubTask(subTask: Task): void {
        this.subTasks.push(subTask);
    }
}
