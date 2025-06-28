// shared/dialog/dialog.component.ts
import { Component } from '@angular/core';
import { ShareModule } from '../../share.module';
import { DialogService } from '../../service/dialog.service';

@Component({
    selector: 'app-dialog',
    standalone: true,
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
    imports: [
        ShareModule
    ]
})
export class DialogComponent {
    visible = false;
    title = '';
    message = '';
    type: 'confirm' | 'info' | 'error' | 'warning' = 'info';
    resolveFn!: (result: boolean) => void;

    constructor(private dialogService: DialogService) {

        this.dialogService.dialog$.subscribe((config: any) => {
            this.title = config.title;
            this.message = config.message;
            this.type = config.type;
            this.resolveFn = config.resolve;
            this.visible = true;
        });
    }

    confirm() {
        this.visible = false;
        this.resolveFn(true);
    }

    cancel() {
        this.visible = false;
        this.resolveFn(false);
    }

    get buttonClass() {
        switch (this.type) {
            case 'error': return 'p-button-danger';
            case 'warning': return 'p-button-warning';
            case 'info': return 'p-button-info';
            default: return '';
        }
    }
}
