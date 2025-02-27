import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './sign-up/sign-up.component';
import { ListShowComponent } from './list-show/list-show.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'list-show', component: ListShowComponent }
    // { path: '', redirectTo: '/login', pathMatch: 'full' }
];
