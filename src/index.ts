
import readlineSync from 'readline-sync';

import { EmployeeService } from "./services/EmployeeService";
import { ProjectService } from "./services/ProjectService";
import { TaskService } from "./services/TaskService";

// Khởi tạo service
const empService = new EmployeeService();
const projectService = new ProjectService();
const taskService = new TaskService();

function mainMenu() {
    while (true) {
        console.log("\n=== QUẢN LÝ HỆ THỐNG ===");
        console.log("1. Quản lý nhân viên");
        console.log("2. Quản lý dự án");
        console.log("3. Quản lý công việc");
        console.log("0. Thoát");

        const choice = readlineSync.question("Chọn: ");

        switch (choice) {
            case "1":
                manageEmployee();
                break;
            case "2":
                manageProject();
                break;
            case "3":
                manageTask();
                break;
            case "0":
                console.log("Tạm biệt!");
                return;
            default:
                console.log("Lựa chọn không hợp lệ!");
        }
    }
}

// Quản lý nhân viên
function manageEmployee() {
    while (true) {
        console.log("\n--- QUẢN LÝ NHÂN VIÊN ---");
        console.log("1. Thêm nhân viên");
        console.log("2. Cập nhật nhân viên");
        console.log("3. Xem danh sách nhân viên");
        console.log("4. Tìm nhân viên theo ID");
        console.log("0. Quay lại");

        const choice = readlineSync.question("Chọn: ");
        switch (choice) {
            case "1":
                const id = readlineSync.question("ID: ");
                const name = readlineSync.question("Tên: ");
                const role = readlineSync.question("Chức vụ: ");
                empService.addEmployee({ id, name, role });
                console.log("✅ Đã thêm nhân viên");
                break;
            case "2":
                const uid = readlineSync.question("Nhập ID nhân viên cần cập nhật: ");
                const newName = readlineSync.question("Tên mới (bỏ trống nếu giữ nguyên): ");
                const newRole = readlineSync.question("Chức vụ mới (bỏ trống nếu giữ nguyên): ");
                empService.updateEmployee(uid, {
                    name: newName || undefined,
                    role: newRole || undefined,
                });
                console.log("✅ Đã cập nhật");
                break;
            case "3":
                console.table(empService.getAllEmployees());
                break;
            case "4":
                const findId = readlineSync.question("Nhập ID: ");
                console.log(empService.getEmployeeById(findId));
                break;
            case "0":
                return;
            default:
                console.log("Lựa chọn không hợp lệ");
        }
    }
}

// Quản lý dự án
function manageProject() {
    while (true) {
        console.log("\n--- QUẢN LÝ DỰ ÁN ---");
        console.log("1. Tạo dự án");
        console.log("2. Xem tất cả dự án");
        console.log("3. Tìm dự án theo ID");
        console.log("4. Cập nhật dự án");

        console.log("0. Quay lại");

        const choice = readlineSync.question("Chọn: ");
        switch (choice) {
            case "1":
                const id = readlineSync.question("ID: ");
                const name = readlineSync.question("Tên: ");
                const desc = readlineSync.question("Mô tả: ");

                // Hiện danh sách nhân viên hiện có
                console.log("📋 Danh sách nhân viên:");
                empService.getAllEmployees().forEach(emp => {
                    console.log(`- ${emp.id}: ${emp.name}`);
                });

                const empRaw = readlineSync.question("Nhập ID nhân viên tham gia (phân cách bằng dấu phẩy): ");
                const employeeIds = empRaw.split(",").map(id => id.trim()).filter(Boolean);

                projectService.createProject({
                    id,
                    name,
                    description: desc,
                    tasks: [],
                    employee: employeeIds
                });

                console.log("✅ Đã tạo dự án và gán nhân viên");
                break;

            case "2":
                console.table(projectService.getAllProject());
                break;
            case "3":
                const pid = readlineSync.question("Nhập ID dự án: ");
                console.log(projectService.getProjectById(pid));
                break;
            case "4":
                const updateId = readlineSync.question("Nhập ID dự án cần cập nhật: ");

                const current = projectService.getProjectById(updateId);
                if (!current) {
                    console.log("❌ Không tìm thấy dự án.");
                    break;
                }

                console.log("📋 Thông tin hiện tại:");
                console.log(current);

                const newName = readlineSync.question("Tên mới (bỏ trống nếu giữ nguyên): ");
                const newDesc = readlineSync.question("Mô tả mới (bỏ trống nếu giữ nguyên): ");
                // Gợi ý danh sách nhân viên hiện tại
                console.log("📋 Danh sách nhân viên:");
                empService.getAllEmployees().forEach(emp => {
                    console.log(`- ${emp.id}: ${emp.name}`);
                });
                const newEmpRaw = readlineSync.question("Nhập ID nhân viên mới cho dự án (phân cách dấu phẩy, bỏ trống nếu giữ nguyên): ");
                const newEmployee = newEmpRaw
                    ? newEmpRaw.split(",").map(e => e.trim()).filter(Boolean)
                    : undefined;

                const updated = projectService.updateProject(updateId, {
                    name: newName || undefined,
                    description: newDesc || undefined,
                    employee: newEmployee,
                });

                if (updated) {
                    console.log("✅ Đã cập nhật dự án");
                } else {
                    console.log("❌ Cập nhật thất bại");
                }
                break;
            case "0":
                return;
            default:
                console.log("Lựa chọn không hợp lệ");
        }
    }
}

// Quản lý công việc
function manageTask() {
    while (true) {
        console.log("\n--- QUẢN LÝ CÔNG VIỆC ---");
        console.log("1. Tạo task");
        console.log("2. Cập nhật task");
        console.log("3. Xem tất cả task");
        console.log("4. Tìm task theo ID");
        console.log("0. Quay lại");

        const choice = readlineSync.question("Chọn: ");
        switch (choice) {
            case "1":
                const id = readlineSync.question("ID: ");
                const title = readlineSync.question("Tiêu đề: ");
                const description = readlineSync.question("Mô tả: ");
                const projectId = readlineSync.question("Thuộc dự án (ID): ");
                const parentTaskId = readlineSync.question("Nhập id task cha nếu đây là task gốc bỏ trống: ");
                // Hiện danh sách nhân viên
                console.log("📋 Danh sách nhân viên:");
                empService.getAllEmployees().forEach(emp => {
                    console.log(`- ${emp.id}: ${emp.name}`);
                });

                const assigneeRaw = readlineSync.question("Nhập ID nhân viên thực hiện task (phân cách bằng dấu phẩy): ");
                const assigneeIds = assigneeRaw.split(",").map(id => id.trim()).filter(Boolean);

                taskService.createTask({
                    id,
                    title,
                    description,
                    projectId,
                    completed: false,
                    dueDate: "",
                    assigneeIds,
                    parentTaskId,
                    subTaskIds:[]
                });

                console.log("✅ Đã tạo task và gán nhân viên");
                break;

            case "2":
                const tid = readlineSync.question("ID task cần sửa: ");
                const newTitle = readlineSync.question("Tiêu đề mới: ");
                const newDesc = readlineSync.question("Mô tả mới: ");
                taskService.updateTask(tid, {
                    title: newTitle || undefined,
                    description: newDesc || undefined,
                });
                console.log("✅ Đã cập nhật task");
                break;
            case "3":
                console.log(taskService.getAllTask());
                break;
            case "4":
                const findTid = readlineSync.question("ID: ");
                console.log(taskService.getTaskByProjectId(findTid));
                break;
            case "0":
                return;
            default:
                console.log("Lựa chọn không hợp lệ");
        }
    }
}


mainMenu();
