# TsTaskManager
# xây dựng data
xây dựng 3 modules gồm project, task, employee
project là dự án chứa các task và employee
task là công việc nếu nó là công việc gốc thì không có công việc cha, còn các công việc còn lại sẽ có công việc cha và danh sách các công việc con có trong nó và có employee trong công việc.
employee là nhân viên trong công ty.
dữ liệu được lấy từ file json và sẽ lưu dữ liệu mới trong quá trình làm vào json.
# xây dựng chức năng
employe thì có các chức năng cơ bản thêm, cập nhật, lấy danh sách và tìm theo id.
project cũng có các chức năng cơ bản tạo, cập nhật, lấy hết và lấy theo id, lúc thêm thì sẽ thêm các nhân viên vào dự án còn task thì trống khi tạo task sẽ lựa chọn task cho dự án nào lúc này mới thêm task cho dự án.
task cũng có các chức năng cơ bản, khi tạo thì sẽ chỉ định task đó của dự án nào, lựa chọn nhân viên vào task, nếu nó là task gốc thì bỏ qua id task cha, nếu nó là task rẽ nhánh từ task khác thì sẽ nhập id task cha vào.
các chức năng đều nằm trong các hàm trong service 
