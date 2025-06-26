import { Component, ElementRef, ViewChild } from "@angular/core";
import { AuthService } from "../../service/auth.service";
import { CourseService } from "../../service/course.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { IconFieldModule } from "primeng/iconfield";
import { InputIconModule } from "primeng/inputicon";
import { InputTextModule } from "primeng/inputtext";
import { MultiSelectModule } from "primeng/multiselect";
import { ProgressBarModule } from "primeng/progressbar";
import { RatingModule } from "primeng/rating";
import { RippleModule } from "primeng/ripple";
import { SelectModule } from "primeng/select";
import { SliderModule } from "primeng/slider";
import { Table, TableModule } from "primeng/table";
import { TagModule } from "primeng/tag";
import { ToastModule } from "primeng/toast";
import { ToggleButtonModule } from "primeng/togglebutton";
import { ShareModule } from "../../share.module";

@Component({
    selector: 'app-course',
    standalone: true,
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.scss'],
    imports: [
       ShareModule
    ]
})
export class CourseComponent {

    @ViewChild('filter') filter!: ElementRef;
    list: any;
    loading: boolean = true;

    constructor(private courseService: CourseService, private auth: AuthService) { }

    ngOnInit() {

        this.loading = false;
        this.courseService.getCoursesList().subscribe((data: any) => {
            this.list = data.data.courses;
        });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }
}