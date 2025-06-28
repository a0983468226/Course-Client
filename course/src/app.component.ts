import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogComponent } from './app/share/dialog/dialog.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule, DialogComponent],
    template: `<router-outlet></router-outlet> 
    <app-dialog></app-dialog>`
})
export class AppComponent {}
