import {  OnInit, Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { ActivatedRoute } from '@angular/router';
import { Movie, SingleMovie, Video } from '../models/movie';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  templateUrl: './movi-details.component.html',
  styleUrls: ['./movi-details.component.css']
})

export class MoviDetailsComponent implements OnInit {

  favouriteMovies: Movie[];
  movie: SingleMovie;
  imageBaseUrl = 'https://image.tmdb.org/t/p/original';
  video: Video;

  constructor( private sanitizer: DomSanitizer, private movieService: MoviesService, private route: ActivatedRoute) { }

  ngOnInit() {
    const movieId: number = +this.route.snapshot.params.id;
    this.movieService.getMovie(movieId).subscribe(res => this.movie = res);
    this.movieService.getVideo(movieId).subscribe(res => this.video = res);
  }
  
 getUrl(key){
    return 'https://www.youtube.com/watch?v=' + key;
  }
  
  getEmbedUrl(key){
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + key + '?ecver=2')
  }
  
  checkLiked(movie) { // flavien
    this.favouriteMovies = this.movieService.getFavourite();
    const check = this.favouriteMovies.find(mov => mov.id === movie.id);
    if (check) {
      return true;
    } else {
      return false;
    }
  }
  
  
}
