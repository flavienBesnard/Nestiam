import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MoviesService } from './movies.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Serie } from '../models/serie';

@Injectable({
  providedIn: 'root'
})
export class SerieResolverService implements Resolve<Serie[]> {

    constructor(private serieService: MoviesService) { }
  
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Serie[]> {
      return this.serieService.getSeries()
        .pipe(
          catchError(err => of(err))
          );
    }
}