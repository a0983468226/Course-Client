import { Component, ElementRef, ViewChild } from "@angular/core";
import { AuthService } from "../../service/auth.service";
import { Table } from "primeng/table";
import { ShareModule } from "../../share.module";
import { SemestersService } from "../../service/semesters.service";

@Component({
    selector: 'app-semesters',
    standalone: true,
    templateUrl: './semesters.component.html',
    styleUrls: ['./semesters.component.scss'],
    imports: [
        ShareModule
    ]
})
export class SemestersComponent {

    @ViewChild('filter') filter!: ElementRef;
    list: any;
    loading: boolean = true;
    display: boolean = false;

    addStartAt: Date | null = null;
    addEndAt: Date | null = null;

    constructor(private semestersService: SemestersService, private auth: AuthService) { }

    ngOnInit() {

        this.loading = false;
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

    }
    delete(id: String) {

    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    add() {
        this.display = true;
        console.log("Add new semester");
    }

    close() {
        this.display = false;
    }
}