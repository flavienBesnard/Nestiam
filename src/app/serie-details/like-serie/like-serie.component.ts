import { Component, OnInit, Input } from '@angular/core';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { SingleSerie } from 'src/app/models/serie';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-like-serie',
  templateUrl: './like-serie.component.html',
  styleUrls: ['./like-serie.component.css']
})
export class LikeSerieComponent implements OnInit {
  faHeart = faHeart;
  solidHeart = solidHeart;
  liked: boolean = false;
  @Input() serieId: string;
  @Input() serieLiked: boolean;
  favourites;
  serie : SingleSerie;
  constructor(private movieService: MoviesService) {
   }

  ngOnInit() {
    this.favourites = this.movieService.getFavouriteSerie();
    }

  logClick() {
    this.liked = !this.liked;
    if (this.liked === true) {
      this.movieService.addFavouriteSerie(this.serieId);
    } else {
      this.movieService.removeFavouriteSerie(this.serieId);
    }
  }

  woLike() {
    if (this.serieLiked === false) {
      return false;
    } else if (this.liked === true || this.serieLiked === true) {
      return true;
    }
  }
}
