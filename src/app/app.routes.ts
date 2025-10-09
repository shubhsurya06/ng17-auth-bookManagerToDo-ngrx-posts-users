import { Routes } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard';
import { AdminComponent } from './admin/admin.component';
import { roleGuard } from './role.guard';
import { EditorComponent } from './editor/editor.component';
import { CounterComponent } from './counter/counter.component';
import { UserComponent } from './user/user.component';
import { PostsComponent } from './posts/posts.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, title: 'Login' },
    { path: 'counter', component: CounterComponent, title: 'Counter' },
    { path: 'user', component: UserComponent, title: 'User data using NgRx' },
    { path: 'posts', component: PostsComponent, title: 'Posts using NgRx' },
    { path: 'books', component: BooksComponent, title: 'Book Manager', canActivate: [authGuard] },
    { path: 'admin', component: AdminComponent, title: 'Admin Panel', canActivate: [roleGuard], data: {role: 'admin'} },
    { path: 'editor', component: EditorComponent, title: 'Editor Panel', canActivate: [roleGuard], data: {role: 'moderator'} },
];
