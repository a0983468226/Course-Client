import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ShareModule } from "../../../share.module";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { InputTextModule } from "primeng/inputtext";
import { DatePickerModule } from 'primeng/datepicker';
import { RadioButtonModule } from "primeng/radiobutton";
import { UserService } from "../../../service/user.service";
import { SelectModule } from "primeng/select";
import { AuthService } from "../../../service/auth.service";
import { DialogService } from "../../../service/dialog.service";
import { SemestersService } from "../../../service/semesters.service";

@Component({
    selector: 'app-course-dialog',
    standalone: true,
    templateUrl: './course-dailog.component.html',
    styleUrls: ['./course-dailog.component.scss'],
    imports: [
        CommonModule,
        FormsModule,
        DialogModule,
        InputTextModule,
        ButtonModule,
        DatePickerModule,
        RadioButtonModule,
        SelectModule,
    ]
})
export class CourseDailogComponent implements OnInit {


    @Input() title: string = '新增課程';
    @Input() set data(value: any | null) {
        if (value) {
            this.form = { ...value };
        } else {
            this.form = {
                id: null,
                capacity: null,
                description: null,
                code: null,
                credit: null,
                email: null,
                endAt: null,
                location: null,
                name: null,
                schedule: null,
                semesterId: null,
                semestersName: null,
                startAt: null,
                studyNumber: null,
                teacherId: null,
                teacherName: null
            };
        }
    }


    @Input() visible: boolean = false;
    @Output() visibleChange = new EventEmitter<boolean>();
    @Output() save = new EventEmitter<any>();

    form = {
        id: null,
        capacity: null,
        description: null,
        code: null,
        credit: null,
        email: null,
        endAt: null,
        location: null,
        name: null,
        schedule: null,
        semesterId: null,
        semestersName: null,
        startAt: null,
        studyNumber: null,
        teacherId: null,
        teacherName: null

    };

    teachers: any[] = [];
    semestersList: any[] = [];


    constructor(private userService: UserService, private semestersService: SemestersService, private auth: AuthService,
        private dialogService: DialogService) { }

    ngOnInit(): void {

        if (this.auth.getLoginData().role === 'ADMIN') {
            this.getTeachers();

        }
        this.getSemestersService();
    }


    getTeachers() {
        this.userService.findUser().subscribe((data: any) => {
            if (data.success) {
                this.teachers = data.data.users.filter((item: any) => item.role === 'teacher' && item.status === 1);
                console.log(this.teachers)
            } else {
                console.error('Error fetching teachers:', data.message);
                this.teachers = [];
            }
        });
    }

    getSemestersService() {
        this.semestersService.getSemesters().subscribe((data: any) => {
            this.semestersList = data.data.semesters.map((item: any) => {
                item.startAt = item.startAt ? new Date(item.startAt).toLocaleDateString() : '';
                item.endAt = item.endAt ? new Date(item.endAt).toLocaleDateString() : '';
                return item;
            });
        });
    }



    onSave() {
        this.save.emit(this.form);
        this.visibleChange.emit(false);
    }

    onCancel() {
        this.visibleChange.emit(false);
    }
}