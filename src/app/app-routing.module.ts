import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MoviDetailsComponent } from './movi-details/movi-details.component';
import { MovieResolverService } from './services/movie-resolver.service';
import { Err404Component } from './err404/err404.component';
import { FavouriteComponent } from './movi-details/favourite.component';
import { AuthGuard } from 'src/app/services/authentication.guard';
import { SigninComponent } from './authentication/signin/signin.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { SerieListComponent } from './serie-list/serie-list.component';
import { SerieResolverService } from './services/serie-resolver.service';

const routes: Routes = [
  {path: 'home', component: MovieListComponent, resolve: {resolvedMovies: MovieResolverService}, canActivate: [AuthGuard]},
  {path: '404', component: Err404Component},
  {path: 'home/:id', component: MoviDetailsComponent},
  {path: 'serie', component: SerieListComponent, resolve: {resolvedSeries: SerieResolverService}, canActivate: [AuthGuard]},
  {path: 'movies/favourite', component: FavouriteComponent, canActivate: [AuthGuard]},
  {path: 'signup', component: SignupComponent},
  {path: 'signin', component: SigninComponent},
  {path: '', redirectTo: 'signin', pathMatch: 'full'}
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
