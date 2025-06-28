import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';
import { AuthService } from '../../service/auth.service';
import { ShareModule } from '../../share.module';
import { DialogService } from '../../service/dialog.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [AppFloatingConfigurator, ShareModule]
})
export class LoginComponent {

    username: string = '';

    password: string = '';

    checked: boolean = false;

    captchaImage: string = '';
    captchaCode: string = '';
    captchaId: string = '';

    constructor(private auth: AuthService, private router: Router,
        private dialogService: DialogService
    ) { }

    ngOnInit() {
        this.getCaptcha();
    }

    login() {
        this.auth.login({
            username: this.username,
            password: this.password,
            captchaCode: this.captchaCode,
            captchaId: this.captchaId
        }
        ).subscribe((data: any) => {
            if (data.success) {
                this.auth.setLoginData(data.data)
                this.auth.setAccessToken(data.data.accessToken);
                this.router.navigate(['/dashboard']);
            } else {
                this.dialogService.error('登入失敗', data.message);
                this.getCaptcha();
            }
        })

    };


    getCaptcha() {
        this.auth.captcha().subscribe((data: any) => {
            this.captchaImage = data.data.image;
            this.captchaId = data.data.id;
        });
    }

    refreshCaptcha() {
        this.getCaptcha();
    }


}
