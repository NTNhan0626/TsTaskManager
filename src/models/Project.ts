import { Task } from "./Task";

export class Project{
    constructor(
        public id : string,
        public name :string,
        public description :string,
        public tasks : Task []=[],
        public employee :string []=[],

    ){}
}