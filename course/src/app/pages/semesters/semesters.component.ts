import { Component, ElementRef, ViewChild } from "@angular/core";
import { AuthService } from "../../service/auth.service";
import { Table } from "primeng/table";
import { ShareModule } from "../../share.module";
import { SemestersService } from "../../service/semesters.service";
import { DialogService } from "../../service/dialog.service";
import { SemestersDailogComponent } from "./semester-dailog/semester-dailog.component";

@Component({
    selector: 'app-semesters',
    standalone: true,
    templateUrl: './semesters.component.html',
    styleUrls: ['./semesters.component.scss'],
    imports: [
        ShareModule, SemestersDailogComponent
    ]
})
export class SemestersComponent {

    @ViewChild('filter') filter!: ElementRef;
    list: any;
    loading: boolean = true;
    display: boolean = false;
    showDialog = false;
    editData: any = null;

    addStartAt: Date | null = null;
    addEndAt: Date | null = null;

    constructor(private semestersService: SemestersService, private auth: AuthService,
        private dialogService: DialogService
    ) { }

    ngOnInit() {
        this.loading = false;
        this.getSemesters();
    }

    getSemesters() {
        this.semestersService.getSemesters().subscribe((data: any) => {
            this.list = data.data.semesters.map((item: any) => {
                item.startAt = item.startAt ? new Date(item.startAt).toLocaleDateString() : '';
                item.endAt = item.endAt ? new Date(item.endAt).toLocaleDateString() : '';
                return item;
            });
        });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    edit(item: any) {
        this.editData = {
            id: item.id,
            name: item.name,
            startAt: item.startAt ? new Date(item.startAt) : null,
            endAt: item.endAt ? new Date(item.endAt) : null
        };
        this.showDialog = true;
    }

    async delete(id: string) {
        const ok = await this.dialogService.confirm('確認動作', '你確定要刪除嗎？');
        if (ok) {
            this.semestersService.deleteSemesters(id).subscribe((data: any) => {
                if (data.success) {
                    this.dialogService.info('刪除成功', '學期已成功刪除');
                    this.getSemesters();
                } else {
                    this.dialogService.info('刪除失敗', data.message);
                }

            });
        }
    }

    onSaveSemester(event: any) {
        if (this.editData) {
            // 更新現有學期
            this.semestersService.updateSemesters(event).subscribe((data: any) => {
                if (data.success) {
                    this.dialogService.info('更新成功', '學期已成功更新');
                    this.getSemesters();
                } else {
                    this.dialogService.info('更新失敗', data.message);
                }

            });

        } else {
            // 新增學期
            this.semestersService.insertSemesters(event).subscribe((data: any) => {
                if (data.success) {
                    this.dialogService.info('新增成功', '學期新增成功');
                    this.getSemesters();
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