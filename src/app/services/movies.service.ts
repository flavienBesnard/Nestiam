import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service'; // flavien	

import { MovieDbResponse, SingleMovie, Video, Movie} from '../models/movie';
import { Router } from '@angular/router';
import { Serie, SerieDbResponse, SingleSerie } from '../models/serie';


@Injectable()

export class MoviesService {
  private apiKey = '?api_key=d01149a7f4a54d4c74dd3e40994ea043';
  private apiUrl = 'https://api.themoviedb.org/3';
  private searchUrl = 'https://api.themoviedb.org/3/search';
  STORAGE_KEY = 'local_favourites';// flavien	
  currentFavouriteMovies;// flavien	
  favouriteMovie;// flavien	
  currentFavouriteSeries: any;
  favouriteSerie: any;
  STORAGE_KEY_SERIES = 'local_favourites';

  constructor(private http: HttpClient, private router: Router,@Inject(LOCAL_STORAGE) private storage: StorageService) { // flavien	
   }

  // get movie collection
  getMovies(): Observable<Movie[]> {
    return this.http.get<MovieDbResponse>(`${this.apiUrl}/movie/popular${this.apiKey}`)
      .pipe(
        map(res => {
          return res.results;
        }),
        catchError(this.handleError<Movie[]>('getMovies', [] ))
      );
  }

  // get single movie
  getMovie(id): Observable<SingleMovie> { // flavien	
    return this.http.get<SingleMovie>(`${this.apiUrl}/movie/${id}${this.apiKey}`)
      .pipe(
        catchError(this.handleError<SingleMovie>(`getMovie id=${id}`))
    );
  }
  
  // ADDED - get movies videos
  getVideo(id: number): Observable<Video> {
  return this.http.get<Video>(`${this.apiUrl}/movie/${id}/videos${this.apiKey}`)
    .pipe(
      catchError(this.handleError<Video>(`getMovie id=${id}`))
    );
  }

  // get movies whose name contain search term
  searchMovie(term: string): Observable<Movie[]> {
  if (!term.trim()) {
    return of([]);
  }
  return this.http.get<MovieDbResponse>(`${this.searchUrl}/movie${this.apiKey}&query=${term}`)
      .pipe(
        map(res => {
         return res.results;
        }),
    catchError(this.handleError<Movie[]>('getMovies', []))
  );
  }

  // get serie collection
  getSeries(): Observable<Serie[]> {
    return this.http.get<SerieDbResponse>(`${this.apiUrl}/tv/popular${this.apiKey}`)
      .pipe(
        map(res => {
          return res.results;
        }),
        catchError(this.handleError<Serie[]>('getSeries', [] ))
      );
  }

  // get single serie
  getSerie(id): Observable<SingleSerie> { 	
    return this.http.get<SingleSerie>(`${this.apiUrl}/tv/${id}${this.apiKey}`)
      .pipe(
        catchError(this.handleError<SingleSerie>(`getSerie id=${id}`))
    );
  }
  
  // ADDED - get series videos
  getVideoSerie(id: number): Observable<Video> {
  return this.http.get<Video>(`${this.apiUrl}/tv/${id}/videos${this.apiKey}`)
    .pipe(
      catchError(this.handleError<Video>(`getSerie id=${id}`))
    );
  }
  //search series
  searchSerie(term: string): Observable<Serie[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<SerieDbResponse>(`${this.searchUrl}/tv${this.apiKey}&query=${term}`)
        .pipe(
          map(res => {
           return res.results;
          }),
      catchError(this.handleError<Serie[]>('getSeries', []))
    );
  }
  // handle http error
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      this.router.navigate(['/404'], {skipLocationChange:true});
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  addFavourite(id: string){ // flavien	
    this.currentFavouriteMovies = this.storage.get(this.STORAGE_KEY) || [];
    const film = this.currentFavouriteMovies.find(movie => movie.id === id);
    if (film && film.liked === true) {
      return;
    } else {
      this.getMovie(id).subscribe({
        next: movie => {
          this.favouriteMovie = movie;

          this.currentFavouriteMovies.push(movie);
          this.storage.set(this.STORAGE_KEY, this.currentFavouriteMovies);
          console.log(this.storage.get(this.STORAGE_KEY) || 'LocaL storage is empty');
        }
      });
    }
  }
  
   removeFavourite(id: string) { // flavien	
    this.currentFavouriteMovies = this.storage.get(this.STORAGE_KEY);
    const film = this.currentFavouriteMovies.find(movie => movie.id === id);
    this.currentFavouriteMovies = this.currentFavouriteMovies.filter(movie => movie.id !== id);
    this.storage.set(this.STORAGE_KEY, this.currentFavouriteMovies);
  }
  addFavouriteSerie(id: string){ 
    this.currentFavouriteSeries = this.storage.get(this.STORAGE_KEY_SERIES) || [];
    const serie = this.currentFavouriteSeries.find(serie => serie.id === id);
    if (serie && serie.liked === true) {
      return;
    } else {
      this.getSerie(id).subscribe({
        next: serie => {
          this.favouriteSerie = serie;

          this.currentFavouriteSeries.push(serie);
          this.storage.set(this.STORAGE_KEY_SERIES, this.currentFavouriteSeries);
          console.log(this.storage.get(this.STORAGE_KEY_SERIES) || 'LocaL storage is empty');
        }
      });
    }
  }
  
   removeFavouriteSerie(id: string) {	
    this.currentFavouriteSeries = this.storage.get(this.STORAGE_KEY_SERIES);
    const serie = this.currentFavouriteSeries.find(serie => serie.id === id);
    this.currentFavouriteSeries = this.currentFavouriteSeries.filter(serie => serie.id !== id);
    this.storage.set(this.STORAGE_KEY_SERIES, this.currentFavouriteSeries);
  }

  getFavourite() { // flavien	
    return this.storage.get(this.STORAGE_KEY) || [];
  }
  getFavouriteSerie() {
    return this.storage.get(this.STORAGE_KEY_SERIES) || [];
  }
}
