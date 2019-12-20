import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminUploadMissingComponent } from './admin-upload-missing/admin-upload-missing.component';
import { AdminListMissingComponent } from './admin-list-missing/admin-list-missing.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'upload-missing', component: AdminUploadMissingComponent },
  { path: 'list-missing', component: AdminListMissingComponent },

  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
