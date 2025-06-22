import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';
import { AuthService } from '../../service/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, AppFloatingConfigurator]
})
export class LoginComponent {

    username: string = '';

    password: string = '';

    checked: boolean = false;

    captchaImage: string = '';
    captchaCode: string = '';
    captchaId: string = '';

    constructor(private auth: AuthService, private router: Router) { }

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
            this.auth.setLoginData(data.data)
            this.auth.setAccessToken(data.data.accessToken);
            this.router.navigate(['/dashboard']);
        });
    }

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


