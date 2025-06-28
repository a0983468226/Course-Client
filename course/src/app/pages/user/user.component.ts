import { Component, ElementRef, ViewChild } from "@angular/core";
import { AuthService } from "../../service/auth.service";
import { Table } from "primeng/table";
import { ShareModule } from "../../share.module";
import { UserService } from "../../service/user.service";
import { DialogService } from "../../service/dialog.service";
import { UserDailogComponent } from "./user-dailog/user-dailog.component";

@Component({
    selector: 'app-users',
    standalone: true,
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
    imports: [
        ShareModule, UserDailogComponent
    ]
})
export class UserComponent {

    @ViewChild('filter') filter!: ElementRef;
    list: any;
    loading: boolean = true;
    display: boolean = false;
    showDialog = false;
    editData: any = null;

    constructor(private userService: UserService, private auth: AuthService,
        private dialogService: DialogService
    ) { }

    ngOnInit() {

        this.loading = false;
        this.getUserList();
    }

    getUserList() {
        this.userService.findUser().subscribe((data: any) => {
            this.list = data.data.users.map((item: any) => {
                item.lastLoginTime = item.lastLoginTime ? new Date(item.lastLoginTime).toLocaleString() : '尚未登入';
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
            username: item.username,
            name: item.name,
            email: item.email,
            role: item.role,
            status: item.status
        };
        this.showDialog = true;
    }

    async delete(id: string) {
        const ok = await this.dialogService.confirm('確認動作', '你確定要刪除嗎？');
        if (ok) {
            this.userService.deleteUserById(id).subscribe((data: any) => {
                if (data.success) {
                    this.dialogService.info('刪除成功', '使用者已成功刪除');
                    this.getUserList();
                } else {
                    this.dialogService.info('刪除失敗', data.message);
                }

            });
        }
    }

    onSaveUser(event: any) {
        if (this.editData) {
            // 更新使用者
            this.userService.updateUser(event).subscribe((data: any) => {
                if (data.success) {
                    this.dialogService.info('更新成功', '使用者已成功更新');
                    this.getUserList();
                } else {
                    this.dialogService.info('更新失敗', data.message);
                }

            });

        } else {
            // 新增使用者
            this.userService.insertUser(event).subscribe((data: any) => {
                if (data.success) {
                    this.dialogService.info('新增成功', '使用者新增成功');
                    this.getUserList();
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