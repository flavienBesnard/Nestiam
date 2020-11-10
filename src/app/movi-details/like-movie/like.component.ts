import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from '../../services/movies.service'; // flavien	
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})


export class LikeComponent implements OnInit {
  faHeart = faHeart;
  solidHeart = solidHeart;
  liked: boolean = false;
  @Input() movieId: string;
  @Input() movieLiked: boolean;
  favourites;
  movie;
  constructor(private movieService: MoviesService) {
   }

  ngOnInit() {
    this.favourites = this.movieService.getFavourite();
    }

  logClick() {
    this.liked = !this.liked;
    if (this.liked === true) {
      this.movieService.addFavourite(this.movieId);
    } else {
      this.movieService.removeFavourite(this.movieId);
    }
  }

  woLike() {
    if (this.movieLiked === false) {
      return false;
    } else if (this.liked === true || this.movieLiked === true) {
      return true;
    }
  }
}
