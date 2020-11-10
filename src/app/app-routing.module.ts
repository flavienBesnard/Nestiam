import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MoviDetailsComponent } from './movi-details/movi-details.component';
import { MovieResolverService } from './services/movie-resolver.service';
import { Err404Component } from './err404/err404.component';
import { FavouriteComponent } from './movi-details/favourite.component';
import { SerieListComponent } from './serie-list/serie-list.component';
import { SerieResolverService } from './services/serie-resolver.service';
import { SerieDetailsComponent } from './serie-details/serie-details.component';
import { FavouriteSerieComponent } from './serie-details/favourite-serie/favourite-serie.component';

const routes: Routes = [
  {path: 'movie', component: MovieListComponent, resolve: {resolvedMovies: MovieResolverService}},
  {path: '404', component: Err404Component},
  {path: 'movie/:id', component: MoviDetailsComponent},
  {path: 'serie', component: SerieListComponent, resolve: {resolvedSeries: SerieResolverService}},
  {path: 'serie/:id', component: SerieDetailsComponent},
  {path: 'movies/favouriteMovie', component: FavouriteComponent},
  {path: 'series/favouriteSerie', component: FavouriteSerieComponent},
  {path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule)},
  {path: '', redirectTo: 'movie', pathMatch: 'full'}
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
