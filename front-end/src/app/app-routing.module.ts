import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ViolatorsComponent } from './violators/violators.component';

const routes: Routes = [
  { path: '', redirectTo: '/violators', pathMatch: 'full' }, 
  {path:'violators', component:ViolatorsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
