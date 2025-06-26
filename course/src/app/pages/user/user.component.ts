import { Component, ElementRef, ViewChild } from "@angular/core";
import { AuthService } from "../../service/auth.service";
import { Table } from "primeng/table";
import { ShareModule } from "../../share.module";
import { UserService } from "../../service/user.service";

@Component({
    selector: 'app-users',
    standalone: true,
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
    imports: [
        ShareModule
    ]
})
export class UserComponent {

    @ViewChild('filter') filter!: ElementRef;
    list: any;
    loading: boolean = true;
    display: boolean = false;

    constructor(private userService: UserService, private auth: AuthService) { }

    ngOnInit() {

        this.loading = false;
        this.userService.findUser().subscribe((data: any) => {
            this.list = data.data.users.map((item: any) => {
                item?.status == 1 ? item.status = '啟用' : item.status = '停用';
                item?.role == 'ADMIN' ? item.role = '管理員' :
                    item.role === 'teacher' ? item.role = '教師' : item.role = '學生';
                item.lastLoginTime = item.lastLoginTime ? new Date(item.lastLoginTime).toLocaleString() : '尚未登入';
                return item;
            });
        });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    edit(item: any) {

    }
    delete(id: String) {

    }
    add() {
        this.display = true;
        console.log("Add new semester");
    }

}