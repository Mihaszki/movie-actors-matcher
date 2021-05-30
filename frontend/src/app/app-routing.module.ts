import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { ActorFormComponent } from './actor-form/actor-form.component';

const routes: Routes = [
  { path: 'search', component: ActorFormComponent },
  { path: 'movies/:id', component: MoviesComponent },
  { path: '',   redirectTo: '/search', pathMatch: 'full' },
  { path: '**', redirectTo: '/search', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
