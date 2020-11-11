import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Movie } from '../models/movie';
import { Observable, Subject } from 'rxjs';
import { MoviesService } from '../services/movies.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Serie } from '../models/serie';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit {
  faSearch = faSearch;
  movies$: Observable<Movie[]>;
  series$: Observable<Serie[]>;
  private searchTerms = new Subject<string>();
  isSerie = false;

  searchForm: FormGroup;
  searchFormSerie: FormGroup;
  
  constructor(private route: Router, private movieService: MoviesService, private formBuilder: FormBuilder) { }

  // push search term to observable stream
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.initSearchForm();
    this.initSearchFormSerie();
  }

  initSearchForm() {
    this.searchForm = this.formBuilder.group({
      
    })
    this.movies$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.movieService.searchMovie(term))
    );
    console.log("donne moi cette putin de route :"+this.route.toString().substring(this.route.toString().indexOf('url')+5,this.route.toString().indexOf('url')+10));
  }

  initSearchFormSerie() {
    this.searchFormSerie = this.formBuilder.group({
      
    })
    this.series$ = this.searchTerms.pipe(
      
      debounceTime(300),

      distinctUntilChanged(),

      switchMap((term: string) => this.movieService.searchSerie(term))
    );
  }
  
  searchMovieOrSerie(){
    var serie= false;
    if(this.route.toString().substring(this.route.toString().indexOf('url')+5,this.route.toString().indexOf('url')+10) == 'serie'){
      serie = true;
    }
    else{
      serie = false
    }
    return serie;
  }
  checkUrl(){
    if(this.route.url.startsWith('/serie')){
      this.isSerie = true;
    }
    else {
      this.isSerie = false;
    }
  }
}
