import { EmPloyee } from "../models/Employee";
import { FileHandle } from "../utils/FileHandle";

export class EmployeeService {
    private employees: EmPloyee[] = [];
    private fileName = "Employee.json";

    constructor() {
        const rawEmployee = FileHandle.readFromFile<EmPloyee>(this.fileName);
        this.employees = rawEmployee.map(raw => new EmPloyee(raw.id, raw.name, raw.role));
    }

    addEmployee(data: EmPloyee): void {
        const exists = this.employees.some(emp => emp.id === data.id);
        if (exists) {
            throw new Error("Employee with this ID already exists.");
        }

        const employee = new EmPloyee(data.id, data.name, data.role);
        this.employees.push(employee);
        this.saveToFile();
    }
    updateEmployee(id: string, updateData: Partial<EmPloyee>): void {
        const emp = this.employees.find(emp => emp.id === id);
        if (!emp) {
            throw new Error("Employee not found.");
        }

        if (updateData.name !== undefined) emp.name = updateData.name;
        if (updateData.role !== undefined) emp.role = updateData.role;

        this.saveToFile();
    }

    
    getEmployeeById(id: string): EmPloyee | undefined {
        return this.employees.find(emp => emp.id === id);
    }

    
    getAllEmployees(): EmPloyee[] {
        return this.employees;
    }

    private saveToFile(): void {
        FileHandle.writeToFile(this.fileName, this.employees);
    }
}
