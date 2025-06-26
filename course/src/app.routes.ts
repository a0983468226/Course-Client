import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { LoginComponent } from './app/pages/login/login.component';
import { AuthGuard } from './app/service/auth.guard';
import { CourseComponent } from './app/pages/course/course.component';
import { UserComponent } from './app/pages/user/user.component';
import { SemestersComponent } from './app/pages/semesters/semesters.component';

export const appRoutes: Routes = [
    {

        path: 'login',
        component: LoginComponent

    },
    {
        path: '',
        component: AppLayout,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'dashboard',
                component: CourseComponent
            },
            {
                path: 'course/list',
                component: CourseComponent
            },
            {
                path: 'users/list',
                component: UserComponent
            },
            {
                path: 'semesters/list',
                component: SemestersComponent
            },
            // 預設轉址
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }
        ]
    },

    { path: '**', redirectTo: '/notfound' }
];
