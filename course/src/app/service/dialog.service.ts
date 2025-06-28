// shared/dialog/dialog.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

type DialogType = 'confirm' | 'info' | 'error' | 'warning';

@Injectable({
    providedIn: 'root'
})
export class DialogService {
    private dialogSubject = new Subject<{
        title: string;
        message: string;
        type: DialogType;
        resolve: (result: boolean) => void;
    }>();

    dialog$ = this.dialogSubject.asObservable();

    openDialog(type: DialogType, title: string, message: string): Promise<boolean> {
        return new Promise((resolve) => {
            this.dialogSubject.next({ title, message, type, resolve });
        });
    }

    confirm(title: string, message: string): Promise<boolean> {
        return this.openDialog('confirm', title, message);
    }

    info(title: string, message: string): Promise<boolean> {
        return this.openDialog('info', title, message);
    }

    error(title: string, message: string): Promise<boolean> {
        return this.openDialog('error', title, message);
    }

    warning(title: string, message: string): Promise<boolean> {
        return this.openDialog('warning', title, message);
    }
}
