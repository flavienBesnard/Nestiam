import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { MoviesService } from '../../services/movies.service'; // flavien	

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit {
  favouriteMovies: Movie[];
  movie: any;
  imageUrl: string = "https://image.tmdb.org/t/p/original";
  constructor(private movieService: MoviesService, ) { } // flavien

  ngOnInit() {
    this.favouriteMovies = this.movieService.getFavourite();
  }


  setId() {
    if (this.movie.id) {
      return this.movie.id;
    }
    return this.movie.imdbID;
  }
  onRemove(id) {
    alert('Are you sure you want to want to remove this movie from your list?');
    this.movieService.removeFavourite(id);
    this.favouriteMovies = this.movieService.getFavourite();

  }

  getList() {
    if (this.favouriteMovies.length === 0) {
      return true;
    }
  }

  setImage(movie) {
    if (movie.poster_path) {
      return `${this.imageUrl}${movie.poster_path}`;
    }
    else {
      return movie.Poster;
    }
  }

  setDate(movie) {
    if (movie.release_date) {
      const date = movie.release_date.split("-");
      return date[0];
    }
  }
  getDisplay(index){
    var display = true;
    if( this.favouriteMovies[index].title == null){
      display = false;
    }
    else {
      display = true;
    }
    console.log("display =" + display);
    return display;
  }
}
