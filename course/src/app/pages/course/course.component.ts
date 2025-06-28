import { Component, ElementRef, ViewChild } from "@angular/core";
import { AuthService } from "../../service/auth.service";
import { CourseService } from "../../service/course.service";
import { Table } from "primeng/table";
import { ShareModule } from "../../share.module";
import { DialogService } from "../../service/dialog.service";
import { CourseDailogComponent } from "./course-dailog/course-dailog.component";

@Component({
    selector: 'app-course',
    standalone: true,
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.scss'],
    imports: [
        ShareModule, CourseDailogComponent
    ]
})
export class CourseComponent {

    @ViewChild('filter') filter!: ElementRef;
    list: any;
    loading: boolean = true;
    display: boolean = false;
    showDialog = false;
    editData: any = null;

    constructor(private courseService: CourseService, private auth: AuthService,
        private dialogService: DialogService
    ) { }

    ngOnInit() {
        this.loading = false;
        this.getCourseList();
    }

    getCourseList() {
        this.courseService.getCoursesList().subscribe((data: any) => {
            this.list = data.data.courses;
        });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }


    edit(item: any) {
        this.editData = {
            id: item.id,
            capacity: item.capacity,
            description: item.description,
            code: item.code,
            credit: item.credit,
            email: item.email,
            endAt: item.endAt ? new Date(item.endAt) : null,
            location: item.location,
            name: item.name,
            schedule: item.schedule,
            semesterId: item.semesterId,
            semestersName: item.semestersName,
            startAt: item.startAt ? new Date(item.startAt) : null,
            studyNumber: item.studyNumber,
            teacherId: item.teacherId,
            teacherName: item.teacherName
        };
        this.showDialog = true;
    }

    async delete(id: string) {
        const ok = await this.dialogService.confirm('確認動作', '你確定要刪除嗎？');
        if (ok) {
            this.courseService.deleteCourses(id).subscribe((data: any) => {
                if (data.success) {
                    this.dialogService.info('刪除成功', '課程已成功刪除');
                    this.getCourseList();
                } else {
                    this.dialogService.info('刪除失敗', data.message);
                }

            });
        }
    }

    onSaveCourse(event: any) {
        if (this.editData) {
            // 更新課程
            this.courseService.updateCoursesByAdmin(event).subscribe((data: any) => {
                if (data.success) {
                    this.dialogService.info('更新成功', '課程已成功更新');
                    this.getCourseList();
                } else {
                    this.dialogService.info('更新失敗', data.message);
                }

            });

        } else {
            // 新增課程
            this.courseService.insertCourses(event).subscribe((data: any) => {
                if (data.success) {
                    this.dialogService.info('新增成功', '課程新增成功');
                    this.getCourseList();
                } else {
                    this.dialogService.info('新增失敗', data.message);
                }
            });
        }
        this.showDialog = false;
    }

    openAddDialog() {
        this.editData = null;
        this.showDialog = true;
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    add() {
        this.editData = null; // 清除編輯資料
        this.showDialog = true;
    }

}