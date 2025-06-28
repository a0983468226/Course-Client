import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ShareModule } from "../../../share.module";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { InputTextModule } from "primeng/inputtext";
import { DatePickerModule } from 'primeng/datepicker';

@Component({
    selector: 'app-semester-dialog',
    standalone: true,
    templateUrl: './semester-dailog.component.html',
    styleUrls: ['./semester-dailog.component.scss'],
    imports: [
        CommonModule,
        FormsModule,
        DialogModule,
        InputTextModule,
        ButtonModule,
        DatePickerModule,
    ]
})
export class SemestersDailogComponent {


    @Input() title: string = '新增學期';
    @Input() set data(value: any | null) {
        if (value) {
            this.form = { ...value };
        } else {
            this.form = {
                id: null,
                name: '',
                startAt: null,
                endAt: null
            };
        }
    }

    @Input() visible: boolean = false;
    @Output() visibleChange = new EventEmitter<boolean>();
    @Output() save = new EventEmitter<any>();

    form = {
        id: null,
        name: '',
        startAt: null,
        endAt: null
    };

    onSave() {
        this.save.emit(this.form);
        this.visibleChange.emit(false);
    }

    onCancel() {
        this.visibleChange.emit(false);
    }
}