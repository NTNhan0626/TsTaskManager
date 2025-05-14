import { Project } from "../models/Project";
import { FileHandle } from "../utils/FileHandle";
import Fuse from "fuse.js";


export class ProjectService {
    private projects: Project[] = [];
    constructor() {
        const rawProject = FileHandle.readFromFile<Project>("Project.json");
        this.projects = rawProject.map(raw => new Project(raw.id, raw.name, raw.description, raw.tasks, raw.employee))
    }
    createProject(data: Project) {
        const project = new Project(data.id, data.name, data.description, data.tasks, data.employee);
        this.projects.push(project);
        FileHandle.writeToFile("Project.json", this.projects);
    }
    getAllProject() {
        type projectInfor = Omit<Project, "tasks">;
        return this.projects.map(project => {
            const { tasks, ...rest } = project;
            const infor: projectInfor = rest;
            return infor;
        });
    }
    getProjectById(id: string) {
        const project = this.projects.find(pj => pj.id === id);
        if (!project) return false; 
    
        const { tasks, ...rest } = project;
        return rest;
    }

    getProjectsByName(name:string) : Project[]{
        const fuse = new Fuse(this.projects,{
            keys:['name'],
            threshold : 0.3
        })
        const result = fuse.search(name);
        
        return result.map(rs => rs.item);
    }
    
    updateProject(id: string, data: Partial<Omit<Project, "id">>) {
        const project = this.projects.find(pj => pj.id === id);
        if (project) {
            project.name = data.name ? data.name : project.name;
            project.description = data.description ? data.description : project.description;
            project.tasks = data.tasks ? data.tasks : project.tasks;
            project.employee = data.employee ? data.employee : project.employee;
        }else{
            return false;
        }
        return true;
    }
}