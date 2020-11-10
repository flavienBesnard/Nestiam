import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Movie } from '../models/movie';
import { Observable, Subject } from 'rxjs';
import { MoviesService } from '../services/movies.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit {
  faSearch = faSearch;
  movies$: Observable<Movie[]>;
  private searchTerms = new Subject<string>();

  searchForm: FormGroup;
  
  constructor(private movieService: MoviesService, private formBuilder: FormBuilder) { }

  // push search term to observable stream
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.initSearchForm();
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
  }

  onSubmitSearchForm() {
    console.log(this.searchForm.value);
  }

}
