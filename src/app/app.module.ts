import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { CarouselModule } from 'ngx-owl-carousel-o';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { CarouselHolderComponent } from './movie-list/carousel-holder.component';
import { MoviesService } from './services/movies.service';
import { AppRoutingModule } from './app-routing.module';
import { MoviDetailsComponent } from './movi-details/movi-details.component';
import { MovieSearchComponent } from './movie-search/movie-search.component';
import { AddHeaderInterceptor } from './http-interceptors/add-header.interceptor';
import { LogResponseInterceptor } from './http-interceptors/log-response.interceptor';
import { CacheInterceptor } from './http-interceptors/cache.interceptor';
import { Err404Component } from './err404/err404.component';
import { LikeComponent } from './movi-details/like.component'; // flavien	
import { FavouriteComponent } from './movi-details/favourite.component';
import { SerieListComponent } from './serie-list/serie-list.component';
import { SerieDetailsComponent } from './serie-details/serie-details.component';
import { CarouselHolderComponentSerie } from './serie-list/carousel-holder/carousel-holder.component';
import { FavouriteSerieComponent } from './serie-details/favourite-serie/favourite-serie.component';
import { LikeSerieComponent } from './serie-details/like-serie/like-serie.component';

// FIREBASE
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireFunctionsModule } from '@angular/fire/functions';

import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from 'src/app/services/authentication.guard';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SigninComponent } from 'src/app/authentication/signin/signin.component';
import { SignupComponent } from 'src/app/authentication/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MovieListComponent,
    CarouselHolderComponent,
    CarouselHolderComponentSerie,
    MoviDetailsComponent,
    MovieSearchComponent,
    Err404Component,
	  LikeComponent, // flavien	
    FavouriteComponent, 
    SigninComponent, 
    SignupComponent,		
    SerieListComponent, 
    SerieDetailsComponent, 
    FavouriteSerieComponent, 
    LikeSerieComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CarouselModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    RouterModule.forRoot([]),
    // FIREBASE
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireMessagingModule,
    AngularFireDatabaseModule,
    AngularFireFunctionsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    MoviesService,
    { provide: HTTP_INTERCEPTORS, useClass: AddHeaderInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LogResponseInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
    AuthGuard,
    AuthenticationService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
